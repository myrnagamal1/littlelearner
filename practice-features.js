// Interview sessions, local answer recordings, and milestone applause.
let celebrationAudio = null;
let celebrationTimer;
let celebrationRun = 0;
const lastQuestionCheers = new Map();
let recordingRun = 0;
const answerRecording = {status:'idle', recorder:null, stream:null, chunks:[], url:null, audio:null, timer:null, message:''};

function shuffled(values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function startInterviewSession() {
  resetAutoFeeding(true);
  stopSpeech();
  clearAnswerRecording();
  let history = {};
  try { history = JSON.parse(localStorage.getItem('littleLearnerInterviewHistory') || '{}') || {}; } catch {}
  const previous = history[state.lang] || {};
  const order = shuffled(t().interviews.map((_, index) => index));
  if (JSON.stringify(order) === JSON.stringify(previous.order)) [order[0], order[1]] = [order[1], order[0]];
  const wordings = {};
  state.interviewSession = order.map(index => {
    const base = t().interviews[index];
    const options = base.variants.map((_, variant) => variant).filter(variant => variant !== previous.wordings?.[index]);
    const variant = options[Math.floor(Math.random() * options.length)];
    wordings[index] = variant;
    return {kind:base.kind, q:base.variants[variant], answers:[...base.answers], canonicalIndex:index, variant, path:`audio/${state.lang}/q${index + 1}${variant ? '-v' + (variant + 1) : ''}.m4a?voice=4`};
  });
  history[state.lang] = {order, wordings};
  localStorage.setItem('littleLearnerInterviewHistory', JSON.stringify(history));
  state.screen = 'interview';
  state.interview = 0;
  state.reveal = false;
  state.treatsFed = 0;
  state.interviewFeedback = '';
  state.celebrationMessage = '';
  state.interviewAdvancing = false;
  state.interviewAutoAsk = true;
  render();
}

function stopClapping() {
  celebrationRun += 1;
  clearTimeout(celebrationTimer);
  if (celebrationAudio) {
    celebrationAudio.onplaying = celebrationAudio.onended = celebrationAudio.onerror = null;
    celebrationAudio.pause();
    celebrationAudio.currentTime = 0;
    celebrationAudio = null;
  }
  document.querySelectorAll('.celebrating').forEach(element => element.classList.remove('celebrating'));
}

function playClapping(size = 'question', onEnd) {
  stopClapping();
  const run = celebrationRun;
  const audio = recordedAudioFor(`audio/clap-${size}.mp3`);
  celebrationAudio = audio;
  let finished = false;
  const finish = () => {
    if (finished || run !== celebrationRun) return;
    finished = true;
    stopClapping();
    if (onEnd) onEnd();
  };
  const stage = document.querySelector('.interview-stage, .celebration');
  if (stage) stage.classList.add('celebrating');
  const status = document.getElementById('questionCelebration');
  if (status) status.textContent = t().applauseLabel;
  audio.currentTime = 0;
  audio.playbackRate = 1;
  audio.volume = .8;
  audio.onended = finish;
  audio.onerror = finish;
  audio.onplaying = () => {
    if (run !== celebrationRun) return;
    clearTimeout(celebrationTimer);
    celebrationTimer = setTimeout(finish, (Number.isFinite(audio.duration) ? audio.duration * 1000 : 4000) + 1000);
  };
  celebrationTimer = setTimeout(finish, 4000);
  const started = audio.play();
  if (started) started.catch(finish);
}

function celebrateQuestion(onEnd) {
  prepareForLeoSpeech();
  const previous = lastQuestionCheers.get(state.lang);
  const options = t().questionCheers.map((_, index) => index).filter(index => index !== previous);
  const index = options[Math.floor(Math.random() * options.length)];
  lastQuestionCheers.set(state.lang, index);
  state.celebrationMessage = t().praiseName(t().questionCheers[index], state.childName);
  const status = document.getElementById('questionCelebration');
  if (status) status.textContent = state.celebrationMessage;
  updateRecordingControls();
  playVoiceClip(recordedAudioFor(`audio/${state.lang}/question-cheer${index + 1}.mp3?voice=4`), t().questionCheers[index], {isPraise:true, onEnd:() => playClapping('question', onEnd)});
}

function recordingsAvailable() {
  return Boolean(window.isSecureContext && navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
}

function privacyNoteMarkup(note, id) {
  const label = {en:'Privacy', ar:'الخصوصية', de:'Datenschutz', fr:'Confidentialité'}[state.lang];
  return `<details class='recording-privacy'><summary>${label}</summary><span id='${id}'>${note}</span></details>`;
}

function recordingControlsMarkup() {
  const d = t();
  return `<section class='answer-recorder' aria-labelledby='recordTitle'>
    <div class='recorder-intro'><h3 id='recordTitle'>${d.recordTitle}</h3></div>
    <div class='recording-actions'>
      <button class='record-button' id='recordAnswer' aria-describedby='recordStatus recordingPrivacy'>● ${d.recordStart}</button>
      <button class='listen-button' id='listenAnswer' hidden>▶ ${d.recordListen}</button>
      <button class='text-button' id='retryAnswer' hidden>${d.recordRetry}</button>
    </div>
    <p class='record-status' id='recordStatus' role='status' aria-live='polite'></p>
    ${privacyNoteMarkup(d.recordPrivacy, 'recordingPrivacy')}
  </section>`;
}

function bindRecordingControls() {
  document.getElementById('recordAnswer').addEventListener('click', () => answerRecording.status === 'recording' ? stopAnswerRecording() : startAnswerRecording());
  document.getElementById('listenAnswer').addEventListener('click', () => answerRecording.status === 'playing' ? stopAnswerPlayback() : playAnswerRecording());
  document.getElementById('retryAnswer').addEventListener('click', startAnswerRecording);
  updateRecordingControls();
}

function updateRecordingControls() {
  const button = document.getElementById('recordAnswer');
  if (!button) return;
  const d = t();
  const status = answerRecording.status;
  const supported = recordingsAvailable();
  const busy = status === 'requesting' || status === 'saving' || state.interviewAdvancing;
  const hasAnswer = Boolean(answerRecording.url);
  button.disabled = !supported || busy;
  button.hidden = hasAnswer && status !== 'recording' && status !== 'requesting' && status !== 'saving';
  button.textContent = status === 'recording' ? `■ ${d.recordStop}` : `● ${d.recordStart}`;
  button.classList.toggle('is-recording', status === 'recording');
  const listen = document.getElementById('listenAnswer');
  listen.hidden = !hasAnswer || status === 'recording' || status === 'requesting' || status === 'saving';
  listen.disabled = busy;
  listen.textContent = status === 'playing' ? `■ ${d.recordPause}` : `▶ ${d.recordListen}`;
  const retry = document.getElementById('retryAnswer');
  retry.hidden = listen.hidden;
  retry.disabled = !supported || busy;
  const messages = {idle:d.recordIdle, requesting:d.recordRequest, recording:d.recordActive, saving:d.recordSaving, ready:d.recordReady, playing:d.recordPlaying};
  document.getElementById('recordStatus').textContent = !supported ? d.recordUnavailable : answerRecording.message || messages[status] || d.recordError;
  resumeAutoFeeding();
}

function stopAnswerPlayback() {
  if (answerRecording.audio) {
    answerRecording.audio.onended = answerRecording.audio.onerror = null;
    answerRecording.audio.pause();
    answerRecording.audio.currentTime = 0;
    answerRecording.audio = null;
  }
  if (answerRecording.status === 'playing') answerRecording.status = answerRecording.url ? 'ready' : 'idle';
  updateRecordingControls();
}

function releaseMicrophone() {
  clearTimeout(answerRecording.timer);
  if (answerRecording.stream) answerRecording.stream.getTracks().forEach(track => track.stop());
  answerRecording.stream = null;
}

function clearAnswerRecording() {
  recordingRun += 1;
  stopAnswerPlayback();
  if (answerRecording.recorder) {
    answerRecording.recorder.ondataavailable = answerRecording.recorder.onstop = answerRecording.recorder.onerror = null;
    if (answerRecording.recorder.state !== 'inactive') answerRecording.recorder.stop();
  }
  releaseMicrophone();
  if (answerRecording.url) URL.revokeObjectURL(answerRecording.url);
  Object.assign(answerRecording, {status:'idle', recorder:null, chunks:[], url:null, message:''});
  updateRecordingControls();
}

function prepareForLeoSpeech() {
  pauseAutoFeeding();
  if (answerRecording.status === 'recording') stopAnswerRecording();
  else if (answerRecording.status === 'requesting') clearAnswerRecording();
  stopAnswerPlayback();
}

async function startAnswerRecording() {
  if (state.screen !== 'interview' || state.interviewAdvancing || !recordingsAvailable() || ['requesting','recording','saving'].includes(answerRecording.status)) return;
  stopSpeech();
  stopAnswerPlayback();
  const run = ++recordingRun;
  answerRecording.status = 'requesting';
  answerRecording.message = '';
  updateRecordingControls();
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true, noiseSuppression:true}, video:false});
    if (run !== recordingRun || state.screen !== 'interview') { stream.getTracks().forEach(track => track.stop()); return; }
    const mimeType = ['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
    const recorder = mimeType ? new MediaRecorder(stream, {mimeType}) : new MediaRecorder(stream);
    answerRecording.stream = stream;
    answerRecording.recorder = recorder;
    answerRecording.chunks = [];
    recorder.ondataavailable = event => { if (run === recordingRun && event.data.size) answerRecording.chunks.push(event.data); };
    recorder.onstop = () => {
      if (run !== recordingRun) return;
      releaseMicrophone();
      answerRecording.recorder = null;
      const blob = new Blob(answerRecording.chunks, {type:recorder.mimeType || mimeType || 'audio/webm'});
      answerRecording.chunks = [];
      if (!blob.size) { answerRecording.status='error'; answerRecording.message=t().recordEmpty; updateRecordingControls(); return; }
      if (answerRecording.url) URL.revokeObjectURL(answerRecording.url);
      answerRecording.url = URL.createObjectURL(blob);
      answerRecording.status = 'ready';
      updateRecordingControls();
    };
    recorder.onerror = () => {
      if (run !== recordingRun) return;
      clearAnswerRecording();
      answerRecording.status = 'error';
      answerRecording.message = t().recordError;
      updateRecordingControls();
    };
    recorder.start(250);
    if (answerRecording.url) URL.revokeObjectURL(answerRecording.url);
    answerRecording.url = null;
    answerRecording.status = 'recording';
    answerRecording.timer = setTimeout(() => { answerRecording.message=t().recordLimited; stopAnswerRecording(); }, 60000);
    updateRecordingControls();
  } catch (error) {
    if (stream) stream.getTracks().forEach(track => track.stop());
    if (run !== recordingRun) return;
    releaseMicrophone();
    answerRecording.recorder = null;
    answerRecording.status = 'error';
    answerRecording.message = error.name === 'NotAllowedError' || error.name === 'SecurityError' ? t().recordDenied : error.name === 'NotFoundError' ? t().recordNoMic : error.name === 'NotReadableError' ? t().recordBusy : t().recordError;
    updateRecordingControls();
  }
}

function stopAnswerRecording() {
  if (answerRecording.status !== 'recording') return;
  answerRecording.status = 'saving';
  if (answerRecording.recorder?.state !== 'inactive') answerRecording.recorder.stop();
  releaseMicrophone();
  updateRecordingControls();
}

function playAnswerRecording() {
  if (!answerRecording.url || state.interviewAdvancing || ['recording','requesting','saving'].includes(answerRecording.status)) return;
  stopSpeech();
  stopAnswerPlayback();
  const run = recordingRun;
  const audio = new Audio(answerRecording.url);
  answerRecording.audio = audio;
  answerRecording.status = 'playing';
  answerRecording.message = '';
  const finish = failed => {
    if (run !== recordingRun || answerRecording.audio !== audio) return;
    stopAnswerPlayback();
    if (failed) answerRecording.message = t().recordPlaybackError;
    updateRecordingControls();
  };
  audio.onended = () => finish(false);
  audio.onerror = () => finish(true);
  updateRecordingControls();
  const started = audio.play();
  if (started) started.catch(() => finish(true));
}

function renderInterview() {
  const d = t();
  if (!state.interviewSession.length) return startInterviewSession();
  if (state.interview >= state.interviewSession.length) return renderInterviewDone();
  const q = state.interviewSession[state.interview];
  main.innerHTML = `<section class='screen'>
    <div class='lesson-head'><button class='back' aria-label='${d.back}' id='backHome'>‹</button><h1>${d.interviewTitle}</h1><span class='lesson-count'>${state.interview + 1} / ${state.interviewSession.length}</span></div>
    <div class='interview-stage'>
      <div class='interview-prompt'><div class='interview-scene'><div class='mascot-stage'><img class='mascot-image' id='interviewerMascot' src='assets/lion-idle.webp' alt='${d.mascotAlt}' decoding='async'></div>
        <div class='question-panel'><div class='speech-bubble'><span class='sound-waves' aria-hidden='true'><span></span><span></span><span></span></span><div class='question-number'>${d.question} ${state.interview + 1}</div><h2 class='question'>${q.q}</h2><button class='listen-button' id='listenQuestion'>🔊 ${d.listen}</button></div></div>
      </div>
      <div class='answer-area'>${state.reveal ? `<div class='answer-chips'>${q.answers.map(answer => `<span class='answer-chip'>${answer}</span>`).join('')}</div>` : `<span class='answer-placeholder'>${d.answerHint}</span>`}</div></div>
      ${recordingControlsMarkup()}
      ${q.kind !== 'alphabet' ? `<div class='treat-zone'><p class='treat-prompt'>${d.treatPrompt}</p>${autoFeedingMarkup()}<div class='treat-tray' role='group' aria-label='${d.treatPrompt}'>${Array.from({length:5}, (_, index) => `<button class='treat-button ${index < state.treatsFed ? 'fed' : ''}' ${index < state.treatsFed || state.interviewAdvancing ? 'disabled' : ''} aria-label='${d.feedTreat(index + 1)}'>🍪</button>`).join('')}</div><div class='treat-counter' id='treatCounter' role='status' aria-live='polite'>${state.interviewFeedback ? escapeHTML(state.interviewFeedback) + ' ' : ''}${d.treatCount(state.treatsFed)}</div></div>` : ''}
      <p class='milestone-feedback' id='questionCelebration' role='status' aria-live='polite'>${escapeHTML(state.celebrationMessage)}</p>
      <div class='interview-actions'><button class='listen-button' id='toggleHelp'>${state.reveal ? d.hideAnswer : d.showAnswer}</button><button class='primary-button' id='answered' ${state.interviewAdvancing ? 'disabled' : ''}>${d.iAnswered} ✓</button></div>
    </div>
  </section>`;
  document.getElementById('backHome').addEventListener('click', goHome);
  bindRecordingControls();
  bindAutoFeeding();
  document.getElementById('listenQuestion').addEventListener('click', () => {
    state.interviewAdvancing = false;
    state.celebrationMessage = '';
    document.getElementById('answered').disabled = false;
    document.getElementById('questionCelebration').textContent = '';
    document.querySelectorAll('.treat-button:not(.fed)').forEach(button => button.disabled = false);
    updateRecordingControls();
    askInterviewQuestion(q);
  });
  document.getElementById('toggleHelp').addEventListener('click', () => {state.reveal = !state.reveal; render();});
  document.querySelectorAll('.treat-button:not(:disabled)').forEach(button => button.addEventListener('click', () => feedLion(button)));
  document.getElementById('answered').addEventListener('click', () => {
    if (state.interviewAdvancing) return;
    state.interviewAdvancing = true;
    pauseAutoFeeding();
    document.getElementById('answered').disabled = true;
    document.querySelectorAll('.treat-button').forEach(button => button.disabled = true);
    const advance = () => {
      resetAutoFeeding();
      clearAnswerRecording();
      stopSpeech();
      state.interviewAdvancing = false;
      state.interview += 1;
      state.reveal = false;
      state.treatsFed = 0;
      state.interviewFeedback = '';
      state.celebrationMessage = '';
      state.interviewAutoAsk = true;
      render();
    };
    if (state.interview === state.interviewSession.length - 1) advance();
    else celebrateQuestion(advance);
  });
  if (state.interviewAutoAsk) {state.interviewAutoAsk = false; askInterviewQuestion(q);} else scheduleMascotBlink();
}

function renderInterviewDone() {
  resetAutoFeeding(true);
  const d = t();
  clearAnswerRecording();
  main.innerHTML = `<section class='screen'><div class='learning-stage celebration'><div class='trophy' aria-hidden='true'>🎉</div><h2>${d.allDone}</h2><p>${d.allDoneText}</p><div class='action-row'><button class='listen-button' id='again'>${d.again}</button><button class='primary-button' id='interviewHome'>${d.home}</button></div></div></section>`;
  playVoiceClip(recordedAudioFor(`audio/${state.lang}/complete.mp3?voice=4`), d.completionSpeech, {onEnd:() => playClapping('complete')});
  document.getElementById('again').addEventListener('click', startInterviewSession);
  document.getElementById('interviewHome').addEventListener('click', goHome);
}
