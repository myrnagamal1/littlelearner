// Speech recognition is opt-in. The separate Record button remains local.
const autoFeeding = {enabled:false, recognition:null, status:'idle', matched:new Set(), queue:[], run:0, restartTimer:null, feedTimer:null, message:'', questionKey:''};

function normalizeAnswer(text) {
  return String(text).toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss')
    .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ـ/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(/\s+/).filter(Boolean)
    .map(word => {
      if (state.lang !== 'ar') return word;
      word = word.replace(/^(?:[وفبك]ال|لل)/u, '');
      return word.startsWith('ال') && word.length > 3 ? word.slice(2) : word;
    }).join(' ');
}

const ANSWER_ALIASES = {
  en: {'Sea turtle':['turtle','turtles'], Starfish:['sea star','sea stars'], Fish:['fishes'], Mouse:['mice'], Rhino:['rhinoceros'], Hippo:['hippopotamus'], Gray:['grey'], 'Light blue':['lightblue'], 'Dark blue':['darkblue']},
  ar: {'سمكة':['سمك','أسماك'], 'حوت':['حيتان'], 'أخطبوط':['أخطبوطات'], 'دلفين':['دلافين'], 'سلحفاة بحرية':['سلحفاة','سلاحف بحرية'], 'أسد':['أسود'], 'فيل':['أفيال'], 'زرافة':['زرافات'], 'أرنب':['أرانب'], 'قرد':['قرود'], 'دائرة':['دوائر'], 'مربع':['مربعات'], 'مثلث':['مثلثات'], 'نجمة':['نجوم'], 'قلب':['قلوب']},
  de: {Fisch:['Fische'], Wal:['Wale'], Oktopus:['Oktopusse','Krake','Kraken'], Delfin:['Delfine','Delphin','Delphine'], 'Meeresschildkröte':['Schildkröte','Schildkröten','Meeresschildkröten'], 'Löwe':['Löwen'], Elefant:['Elefanten'], Giraffe:['Giraffen'], Kaninchen:['Kaninchen'], Affe:['Affen'], Kreis:['Kreise'], Quadrat:['Quadrate'], Dreieck:['Dreiecke'], Stern:['Sterne'], Herz:['Herzen']},
  fr: {Cheval:['chevaux'], 'Étoile de mer':['étoiles de mer'], 'Tortue de mer':['tortue','tortues','tortues de mer'], 'Poisson-globe':['poisson globe','poissons globes'], Blanc:['blanche','blanches'], Violet:['violette','violettes'], Vert:['verte','vertes'], 'Doré':['dorée','dorées'], 'Argenté':['argentée','argentées']}
};

function matchingAnswers(transcript, kind) {
  if (!t().activities[kind]?.items) return [];
  const words = normalizeAnswer(transcript).split(' ');
  const candidates = [];
  t().activities[kind].items.forEach((item, index) => {
    const label = item[1];
    const aliases = [label, ...(ANSWER_ALIASES[state.lang]?.[label] || [])];
    if (state.lang === 'en') aliases.push(label + 's', label + 'es');
    if (state.lang === 'fr') aliases.push(label + 's');
    if (state.lang === 'de' && kind === 'colors') aliases.push(...['e','en','es','er'].map(ending => label + ending));
    aliases.forEach(alias => {
      const tokens = normalizeAnswer(alias).split(' ');
      for (let start = 0; start <= words.length - tokens.length; start += 1) {
        const negations = {en:['not','no','never'], ar:['لا','ليس','ليست','مش'], de:['nicht','kein','keine'], fr:['pas','non']};
        if (words.slice(Math.max(0, start - 2), start).some(word => negations[state.lang].includes(word))) continue;
        if (tokens.every((token, offset) => token === words[start + offset] || state.lang === 'ar' && /^[وف]/u.test(words[start + offset]) && token === words[start + offset].slice(1))) candidates.push({index, label, start, length:tokens.length});
      }
    });
  });
  // A compound answer such as light blue earns one treat, rather than two.
  const occupied = new Set();
  const accepted = new Set();
  const matches = [];
  candidates.sort((a, b) => b.length - a.length || a.start - b.start).forEach(candidate => {
    const positions = Array.from({length:candidate.length}, (_, offset) => candidate.start + offset);
    if (positions.some(position => occupied.has(position))) return;
    positions.forEach(position => occupied.add(position));
    if (!accepted.has(candidate.index)) {accepted.add(candidate.index); matches.push(candidate);}
  });
  return matches.sort((a, b) => a.start - b.start);
}

function speechRecognitionConstructor() { return window.SpeechRecognition || window.webkitSpeechRecognition; }
function currentAutoQuestion() { return state.screen === 'interview' ? state.interviewSession[state.interview] : null; }
function canLeoListen() {
  return autoFeeding.enabled && currentAutoQuestion()?.kind !== 'alphabet' && Boolean(currentAutoQuestion())
    && state.treatsFed < 5 && !state.interviewAdvancing && !activeQuestionAudio && !celebrationAudio && !praising
    && !['requesting','recording','saving','playing'].includes(answerRecording.status)
    && !('speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending));
}

function autoFeedingMarkup() {
  return `<div class='auto-feeding'><button class='listen-button' id='letLeoListen' aria-pressed='false' aria-describedby='autoFeedStatus autoFeedPrivacy'>🎤 ${t().autoStart}</button><p class='auto-feed-status' id='autoFeedStatus' role='status' aria-live='polite'></p>${privacyNoteMarkup(t().autoPrivacy, 'autoFeedPrivacy')}</div>`;
}

function updateAutoFeedingControls() {
  const button = document.getElementById('letLeoListen');
  if (!button) return;
  const supported = Boolean(window.isSecureContext && speechRecognitionConstructor());
  button.disabled = !supported || state.interviewAdvancing || ['requesting','recording','saving'].includes(answerRecording.status);
  button.setAttribute('aria-pressed', String(autoFeeding.enabled));
  button.textContent = autoFeeding.enabled ? `■ ${t().autoStop}` : `🎤 ${t().autoStart}`;
  const messages = {idle:t().autoIdle, starting:t().autoStarting, listening:t().autoListening, paused:t().autoPaused, done:t().autoDone};
  document.getElementById('autoFeedStatus').textContent = !supported ? t().autoUnavailable : autoFeeding.message || messages[autoFeeding.status] || t().autoIdle;
}

function pauseAutoFeeding() {
  autoFeeding.run += 1;
  clearTimeout(autoFeeding.restartTimer); autoFeeding.restartTimer = null;
  clearTimeout(autoFeeding.feedTimer); autoFeeding.feedTimer = null;
  autoFeeding.queue = [];
  const recognition = autoFeeding.recognition;
  autoFeeding.recognition = null;
  if (recognition) {
    recognition.onstart = recognition.onresult = recognition.onerror = recognition.onend = null;
    try { recognition.abort(); } catch {}
  }
  autoFeeding.status = autoFeeding.enabled ? 'paused' : 'idle';
  autoFeeding.message = '';
  updateAutoFeedingControls();
}

function resetAutoFeeding(disable = false) {
  if (disable) autoFeeding.enabled = false;
  pauseAutoFeeding();
  autoFeeding.matched.clear(); autoFeeding.questionKey = ''; autoFeeding.message = '';
  updateAutoFeedingControls();
}

function resumeAutoFeeding() {
  updateAutoFeedingControls();
  if (!canLeoListen() || autoFeeding.recognition || autoFeeding.restartTimer) return;
  autoFeeding.restartTimer = setTimeout(() => {autoFeeding.restartTimer=null; beginLeoListening();}, 350);
}

function bindAutoFeeding() {
  const question = currentAutoQuestion();
  const key = question ? `${state.lang}-${state.interview}-${question.path}` : '';
  if (key !== autoFeeding.questionKey) {resetAutoFeeding(); autoFeeding.questionKey=key;}
  const button = document.getElementById('letLeoListen');
  if (button) button.addEventListener('click', () => {
    if (autoFeeding.enabled) {autoFeeding.enabled=false; pauseAutoFeeding(); autoFeeding.message='';}
    else {
      stopSpeech(); stopAnswerPlayback();
      autoFeeding.enabled=true; autoFeeding.message='';
      beginLeoListening();
    }
    updateAutoFeedingControls();
  });
  resumeAutoFeeding();
}

function feedRecognizedAnswers() {
  if (!canLeoListen()) return;
  const answer = autoFeeding.queue.shift();
  if (!answer) return;
  if (!autoFeeding.matched.has(answer.index)) {
    const button = document.querySelector('.treat-button:not(:disabled)');
    if (!button) return;
    autoFeeding.matched.add(answer.index);
    feedLion(button, true);
    autoFeeding.message=t().autoAccepted(answer.label);
    updateAutoFeedingControls();
  }
  if (state.treatsFed >= 5) {pauseAutoFeeding(); autoFeeding.status='done'; autoFeeding.message=t().autoDone; updateAutoFeedingControls();}
  else if (autoFeeding.queue.length) autoFeeding.feedTimer=setTimeout(() => {autoFeeding.feedTimer=null; feedRecognizedAnswers();}, 850);
}

function beginLeoListening() {
  if (!canLeoListen() || autoFeeding.recognition) return;
  const Constructor=speechRecognitionConstructor();
  if (!Constructor) return;
  const run=++autoFeeding.run;
  const recognition=new Constructor();
  autoFeeding.recognition=recognition;
  recognition.lang=t().locale; recognition.continuous=true; recognition.interimResults=false; recognition.maxAlternatives=1;
  autoFeeding.status='starting'; updateAutoFeedingControls();
  recognition.onstart=() => {if (run===autoFeeding.run) {autoFeeding.status='listening'; updateAutoFeedingControls();}};
  recognition.onresult=event => {
    if (run!==autoFeeding.run || !canLeoListen()) return;
    for (let i=event.resultIndex; i<event.results.length; i+=1) {
      const result=event.results[i];
      if (!result.isFinal) continue;
      const best=result[0];
      if (!best || typeof best.transcript !== 'string') continue;
      if (best.confidence > 0 && best.confidence < .5) {autoFeeding.message=t().autoTry; updateAutoFeedingControls(); continue;}
      const matches=matchingAnswers(best.transcript, currentAutoQuestion().kind);
      const fresh=matches.filter(answer => !autoFeeding.matched.has(answer.index) && !autoFeeding.queue.some(queued => queued.index===answer.index));
      autoFeeding.queue.push(...fresh.slice(0, 5-state.treatsFed-autoFeeding.queue.length));
      if (!fresh.length) {autoFeeding.message=matches.length ? t().autoDuplicate : t().autoTry; updateAutoFeedingControls();}
      if (!autoFeeding.feedTimer) feedRecognizedAnswers();
    }
  };
  recognition.onerror=event => {
    if (run!==autoFeeding.run) return;
    if (event.error==='no-speech' || event.error==='aborted') return;
    autoFeeding.enabled=false; pauseAutoFeeding(); autoFeeding.status='error';
    autoFeeding.message=['not-allowed','service-not-allowed'].includes(event.error) ? t().autoDenied : event.error==='network' ? t().autoNetwork : event.error==='language-not-supported' ? t().autoLanguage : t().autoError;
    updateAutoFeedingControls();
  };
  recognition.onend=() => {
    if (run!==autoFeeding.run) return;
    autoFeeding.recognition=null; autoFeeding.status='paused'; resumeAutoFeeding();
  };
  try { recognition.start(); } catch {autoFeeding.enabled=false; pauseAutoFeeding(); autoFeeding.message=t().autoError; updateAutoFeedingControls();}
}
