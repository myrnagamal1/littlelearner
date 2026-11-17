const DATA = {
      en: {
        locale: 'en-US', dir: 'ltr', brand: 'Little Learner', hello: 'A little practice every day',
        nameTitle: 'What is your name?', nameText: 'A grown-up can type it here so Leo can cheer for you.', nameLabel: 'Your name', namePlaceholder: 'Type your name', nameButton: 'Let’s practice', helloName: name => `Hello, ${name}!`, praiseName: (phrase, name) => name ? `${phrase.replace(/!$/, '')}, ${name}!` : phrase, changeName: 'Change child’s name',
        encouragements: ['Nice effort!', 'You did it!', 'Thanks for trying!', 'Keep it up!', 'Lovely practice!', 'High five!', 'You’re getting braver!', 'Let’s keep going!'],
        title: 'Ready, set, shine!', subtitle: 'Listen, say it out loud, and collect a star for every activity.',
        progress: 'My practice stars', interviewTitle: 'Practice the interview', interviewText: 'Five friendly questions, just like school.', interviewButton: 'Let’s try',
        parentLink: 'For grown-ups', parentTitle: 'For grown-ups',
        parentIntro: 'Five calm minutes is plenty. The first five words in each lesson are the school-interview set; everything after that is optional.',
        tips: ['Practice only one activity at a time.', 'Stop after the School 5—the extra words are just for fun.', 'Celebrate effort, even when a word is not perfect.'],
        reset: 'Reset all practice stars', resetDone: 'Progress reset', back: 'Back', listen: 'Listen', next: 'Next', finish: 'Finish', say: 'Now say it with me!',
        doneTitle: 'You did it!', doneText: 'That was wonderful practice. You earned a star!', home: 'Back to activities',
        question: 'Question', showAnswer: 'Show a little help', hideAnswer: 'Hide the help', iAnswered: 'I answered!',
        answerHint: 'Take your time and answer out loud.', mascotAlt: 'Leo the friendly lion interviewer', treatPrompt: 'Say one answer, then feed Leo a treat!', treatCount: n => `Leo ate ${n} of 5 treats`, feedTreat: n => `Feed Leo treat ${n}`, yum: 'Yum!', lessonTreatPrompt: 'Say it, then feed Leo!', lessonFeed: 'Feed Leo the cookie', lessonFed: 'Leo ate it!', allDone: 'Interview complete!', allDoneText: 'You answered every question. High five!', again: 'Practice again',
        alphabetPlay: 'Say A to Z', alphabetStop: 'Stop', alphabetTap: 'Tap any letter to hear it', alphabetNow: 'Now', schoolSet: 'School 5', bonusSet: 'Extra word',
        voiceSpeed: 'Voice speed', voiceSlow: 'Slow', voiceNormal: 'Normal', songTitle: 'Sing the real alphabet song', songText: 'A slow, clear YouTube song for singing along.', songPlay: 'Play the alphabet song', songCredit: 'Video by Super Simple Songs on YouTube',
        schoolFiveTitle: 'School 5 complete!', schoolFiveText: 'That is everything needed for this interview question.', learnMore: 'Explore more', stopHere: 'Finish for today',
        activities: {
          alphabet: { icon: '🔤', title: 'Alphabet song', sub: 'Say the letters from A to Z', prompt: 'Listen and say each letter', letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') },
          sea: { icon: '🐠', title: 'Sea animals', sub: '5 for school + 11 more', prompt: 'Who lives in the sea?', items: [['🐠','Fish'],['🐋','Whale'],['🐙','Octopus'],['🐬','Dolphin'],['🐢','Sea turtle'],['🦈','Shark'],['🦀','Crab'],['🐴','Seahorse'],['🪼','Jellyfish'],['⭐','Starfish'],['🦭','Seal'],['🦞','Lobster'],['🦑','Squid'],['🦐','Shrimp'],['🐡','Pufferfish'],['🐧','Penguin']] },
          land: { icon: '🦁', title: 'Land animals', sub: '5 for school + 21 more', prompt: 'Who lives on land?', items: [['🦁','Lion'],['🐘','Elephant'],['🦒','Giraffe'],['🐇','Rabbit'],['🐒','Monkey'],['🦓','Zebra'],['🐯','Tiger'],['🐻','Bear'],['🐴','Horse'],['🐶','Dog'],['🐊','Crocodile'],['🦩','Flamingo'],['🦛','Hippo'],['🦏','Rhino'],['🐫','Camel'],['🐼','Panda'],['🦘','Kangaroo'],['🐄','Cow'],['🐑','Sheep'],['🐐','Goat'],['🦊','Fox'],['🐨','Koala'],['🐭','Mouse'],['🐱','Cat'],['🐷','Pig'],['🐔','Chicken']] },
          colors: { icon: '🎨', title: 'Colors', sub: '5 for school + 11 more', prompt: 'What color is this?', items: [['●','Red','#ef4444'],['●','Blue','#2563eb'],['●','Yellow','#facc15'],['●','Green','#22c55e'],['●','Purple','#9333ea'],['●','Orange','#f97316'],['●','Pink','#ec4899'],['●','Brown','#92400e'],['●','Black','#171717'],['●','White','#f8fafc'],['●','Gray','#94a3b8'],['●','Light blue','#7dd3fc'],['●','Dark blue','#172554'],['●','Gold','#d4a017'],['●','Silver','#cbd5e1'],['●','Beige','#d6c6a5']] },
          shapes: { icon: '⭐', title: 'Shapes', sub: '5 for school + 11 more', prompt: 'What shape is this?', items: [['●','Circle'],['■','Square'],['▲','Triangle'],['★','Star'],['♥','Heart'],['⬭','Oval'],['▭','Rectangle'],['◆','Diamond'],['☾','Crescent'],['⬡','Hexagon'],['⬟','Pentagon'],['✚','Plus'],['✕','Cross'],['➜','Arrow'],['◒','Semicircle'],['⏢','Trapezoid']] }
        },
        interviews: [
          { q: 'Can you sing the alphabet song?', answers: ['A', 'B', 'C', '…', 'Z'], speak: 'Can you sing the alphabet song?' },
          { q: 'Tell us five animals that live in the sea.', answers: ['Fish','Whale','Octopus','Dolphin','Sea turtle'] },
          { q: 'Tell us five animals that live on land.', answers: ['Lion','Elephant','Giraffe','Rabbit','Monkey'] },
          { q: 'Tell us five colors.', answers: ['Red','Blue','Yellow','Green','Purple'] },
          { q: 'Tell us five shapes.', answers: ['Circle','Square','Triangle','Star','Heart'] }
        ]
      },
      ar: {
        locale: 'ar-SA', dir: 'rtl', brand: 'المتعلّم الصغير', hello: 'تدريب صغير كل يوم',
        nameTitle: 'ما اسمك؟', nameText: 'يمكن لأحد الكبار كتابة اسمك هنا حتى يشجّعك ليو.', nameLabel: 'اسمك', namePlaceholder: 'اكتب الاسم', nameButton: 'هيا نتدرّب', helloName: name => `مرحباً يا ${name}!`, praiseName: (phrase, name) => name ? `${phrase.replace(/!$/, '')} يا ${name}!` : phrase, changeName: 'تغيير اسم الطفل',
        encouragements: ['محاولة جميلة!', 'لقد فعلتها!', 'شكراً على المحاولة!', 'واصل التدريب!', 'تدريب رائع!', 'هيا نرفع أيدينا!', 'أنت تزداد شجاعة!', 'هيا نكمل!'],
        title: 'جاهزون؟ هيا نتألق!', subtitle: 'استمع، قل الإجابة بصوت عالٍ، واجمع نجمة بعد كل نشاط.',
        progress: 'نجوم التدريب', interviewTitle: 'نتدرّب على المقابلة', interviewText: 'خمسة أسئلة لطيفة تشبه أسئلة المدرسة.', interviewButton: 'هيا نبدأ',
        parentLink: 'للأهل', parentTitle: 'للأهل',
        parentIntro: 'خمس دقائق هادئة تكفي. الكلمات الخمس الأولى في كل درس هي مجموعة مقابلة المدرسة، وما بعدها اختياري.',
        tips: ['تدرّبوا على نشاط واحد كل مرة.', 'يمكن التوقف بعد مجموعة المدرسة؛ الكلمات الإضافية للمتعة فقط.', 'احتفلوا بالمحاولة حتى لو لم تكن الكلمة مثالية.'],
        reset: 'إعادة ضبط كل النجوم', resetDone: 'تمت إعادة ضبط التقدم', back: 'رجوع', listen: 'استمع', next: 'التالي', finish: 'إنهاء', say: 'والآن قلها معي!',
        doneTitle: 'أحسنت!', doneText: 'كان تدريباً رائعاً. لقد حصلت على نجمة!', home: 'العودة إلى الأنشطة',
        question: 'السؤال', showAnswer: 'أظهر مساعدة صغيرة', hideAnswer: 'إخفاء المساعدة', iAnswered: 'لقد أجبت!',
        answerHint: 'خذ وقتك وأجب بصوت عالٍ.', mascotAlt: 'ليو الأسد الودود الذي يجري المقابلة', treatPrompt: 'قل إجابة واحدة، ثم أطعم ليو قطعة لذيذة!', treatCount: n => `أكل ليو ${n} من ٥ قطع`, feedTreat: n => `أطعم ليو القطعة رقم ${n}`, yum: 'لذيذ!', lessonTreatPrompt: 'قل الكلمة، ثم أطعم ليو!', lessonFeed: 'أطعم ليو قطعة البسكويت', lessonFed: 'أكلها ليو!', allDone: 'انتهت المقابلة!', allDoneText: 'لقد أجبت عن كل الأسئلة. أحسنت!', again: 'تدرّب مرة أخرى',
        alphabetPlay: 'قل الحروف', alphabetStop: 'إيقاف', alphabetTap: 'اضغط على أي حرف لسماعه', alphabetNow: 'الآن', schoolSet: '٥ للمدرسة', bonusSet: 'كلمة إضافية',
        voiceSpeed: 'سرعة الصوت', voiceSlow: 'بطيء', voiceNormal: 'عادي', songTitle: 'غنِّ أنشودة الحروف الإنجليزية', songText: 'أنشودة واضحة وبطيئة من يوتيوب للغناء معها.', songPlay: 'تشغيل أنشودة الحروف', songCredit: 'فيديو من Super Simple Songs على يوتيوب',
        schoolFiveTitle: 'أتممت كلمات المدرسة!', schoolFiveText: 'هذا كل ما يحتاجه سؤال المقابلة.', learnMore: 'اكتشف المزيد', stopHere: 'إنهاء اليوم',
        activities: {
          alphabet: { icon: 'أ ب', title: 'أنشودة الحروف', sub: 'قل الحروف من الألف إلى الياء', prompt: 'استمع وقل كل حرف', letters: ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','هـ','و','ي'] },
          sea: { icon: '🐠', title: 'حيوانات البحر', sub: '٥ للمدرسة + ١١ أخرى', prompt: 'من يعيش في البحر؟', items: [['🐠','سمكة'],['🐋','حوت'],['🐙','أخطبوط'],['🐬','دلفين'],['🐢','سلحفاة بحرية'],['🦈','قرش'],['🦀','سلطعون'],['🐴','فرس البحر'],['🪼','قنديل البحر'],['⭐','نجم البحر'],['🦭','فقمة'],['🦞','جراد البحر'],['🦑','حبار'],['🦐','روبيان'],['🐡','سمكة منتفخة'],['🐧','بطريق']] },
          land: { icon: '🦁', title: 'حيوانات البر', sub: '٥ للمدرسة + ٢١ أخرى', prompt: 'من يعيش على البر؟', items: [['🦁','أسد'],['🐘','فيل'],['🦒','زرافة'],['🐇','أرنب'],['🐒','قرد'],['🦓','حمار وحشي'],['🐯','نمر'],['🐻','دب'],['🐴','حصان'],['🐶','كلب'],['🐊','تمساح'],['🦩','نحام'],['🦛','فرس النهر'],['🦏','وحيد القرن'],['🐫','جمل'],['🐼','باندا'],['🦘','كنغر'],['🐄','بقرة'],['🐑','خروف'],['🐐','ماعز'],['🦊','ثعلب'],['🐨','كوالا'],['🐭','فأر'],['🐱','قطة'],['🐷','خنزير'],['🐔','دجاجة']] },
          colors: { icon: '🎨', title: 'الألوان', sub: '٥ للمدرسة + ١١ أخرى', prompt: 'ما هذا اللون؟', items: [['●','أحمر','#ef4444'],['●','أزرق','#2563eb'],['●','أصفر','#facc15'],['●','أخضر','#22c55e'],['●','بنفسجي','#9333ea'],['●','برتقالي','#f97316'],['●','وردي','#ec4899'],['●','بني','#92400e'],['●','أسود','#171717'],['●','أبيض','#f8fafc'],['●','رمادي','#94a3b8'],['●','أزرق فاتح','#7dd3fc'],['●','أزرق داكن','#172554'],['●','ذهبي','#d4a017'],['●','فضي','#cbd5e1'],['●','بيج','#d6c6a5']] },
          shapes: { icon: '⭐', title: 'الأشكال', sub: '٥ للمدرسة + ١١ أخرى', prompt: 'ما هذا الشكل؟', items: [['●','دائرة'],['■','مربع'],['▲','مثلث'],['★','نجمة'],['♥','قلب'],['⬭','بيضاوي'],['▭','مستطيل'],['◆','معين'],['☾','هلال'],['⬡','سداسي'],['⬟','خماسي'],['✚','علامة زائد'],['✕','علامة ضرب'],['➜','سهم'],['◒','نصف دائرة'],['⏢','شبه منحرف']] }
        },
        interviews: [
          { q: 'هل يمكنك أن تقول أنشودة الحروف؟', answers: ['ا','ب','ت','…','ي'] },
          { q: 'اذكر خمسة حيوانات تعيش في البحر.', answers: ['سمكة','حوت','أخطبوط','دلفين','سلحفاة بحرية'] },
          { q: 'اذكر خمسة حيوانات تعيش على البر.', answers: ['أسد','فيل','زرافة','أرنب','قرد'] },
          { q: 'اذكر خمسة ألوان.', answers: ['أحمر','أزرق','أصفر','أخضر','بنفسجي'] },
          { q: 'اذكر خمسة أشكال.', answers: ['دائرة','مربع','مثلث','نجمة','قلب'] }
        ]
      },
      de: {
        locale: 'de-DE', dir: 'ltr', brand: 'Kleine Entdecker', hello: 'Jeden Tag ein bisschen üben',
        nameTitle: 'Wie heißt du?', nameText: 'Ein Erwachsener kann deinen Namen eingeben, damit Leo dich anfeuern kann.', nameLabel: 'Dein Name', namePlaceholder: 'Name eingeben', nameButton: 'Los geht’s', helloName: name => `Hallo, ${name}!`, praiseName: (phrase, name) => name ? `${phrase.replace(/!$/, '')}, ${name}!` : phrase, changeName: 'Name des Kindes ändern',
        encouragements: ['Toll geübt!', 'Du hast es geschafft!', 'Danke fürs Ausprobieren!', 'Weiter so!', 'Das war eine schöne Übung!', 'Gib mir fünf!', 'Du wirst immer mutiger!', 'Lass uns weitermachen!'],
        title: 'Bereit? Los geht’s!', subtitle: 'Hör zu, sprich laut mit und sammle für jede Übung einen Stern.',
        progress: 'Meine Übungssterne', interviewTitle: 'Übe das Schulgespräch', interviewText: 'Fünf freundliche Fragen wie in der Schule.', interviewButton: 'Los geht’s',
        parentLink: 'Für Eltern', parentTitle: 'Für Eltern',
        parentIntro: 'Fünf ruhige Minuten reichen aus. Die ersten fünf Wörter jeder Lektion sind für das Schulgespräch; alles Weitere ist freiwillig.',
        tips: ['Übt immer nur eine Aufgabe.', 'Nach den Schul-5 darf Schluss sein; die Extra-Wörter sind nur zum Spaß.', 'Lobt den Versuch, auch wenn ein Wort noch nicht perfekt klingt.'],
        reset: 'Alle Übungssterne zurücksetzen', resetDone: 'Fortschritt zurückgesetzt', back: 'Zurück', listen: 'Anhören', next: 'Weiter', finish: 'Fertig', say: 'Jetzt sprich mit!',
        doneTitle: 'Geschafft!', doneText: 'Das war eine tolle Übung. Du hast einen Stern verdient!', home: 'Zurück zu den Übungen',
        question: 'Frage', showAnswer: 'Kleine Hilfe zeigen', hideAnswer: 'Hilfe ausblenden', iAnswered: 'Ich habe geantwortet!',
        answerHint: 'Lass dir Zeit und antworte laut.', mascotAlt: 'Leo, der freundliche Löwen-Interviewer', treatPrompt: 'Sag eine Antwort und füttere Leo dann!', treatCount: n => `Leo hat ${n} von 5 Leckerlis gegessen`, feedTreat: n => `Leo Leckerli ${n} geben`, yum: 'Lecker!', lessonTreatPrompt: 'Sag das Wort und füttere Leo!', lessonFeed: 'Leo den Keks geben', lessonFed: 'Leo hat ihn gegessen!', allDone: 'Gespräch geschafft!', allDoneText: 'Du hast alle Fragen beantwortet. Gib mir fünf!', again: 'Noch einmal üben',
        alphabetPlay: 'A bis Z sagen', alphabetStop: 'Stopp', alphabetTap: 'Tippe auf einen Buchstaben', alphabetNow: 'Jetzt', schoolSet: 'Schul-5', bonusSet: 'Extra-Wort',
        voiceSpeed: 'Sprechtempo', voiceSlow: 'Langsam', voiceNormal: 'Normal', songTitle: 'Das echte englische Alphabetlied', songText: 'Ein langsames, deutliches YouTube-Lied zum Mitsingen.', songPlay: 'Alphabetlied abspielen', songCredit: 'Video von Super Simple Songs auf YouTube',
        schoolFiveTitle: 'Schul-5 geschafft!', schoolFiveText: 'Das ist alles, was du für diese Frage brauchst.', learnMore: 'Mehr entdecken', stopHere: 'Für heute fertig',
        activities: {
          alphabet: { icon: '🔤', title: 'Alphabet', sub: 'Sag die Buchstaben von A bis Z', prompt: 'Hör zu und sprich jeden Buchstaben', letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') },
          sea: { icon: '🐠', title: 'Meerestiere', sub: '5 für die Schule + 11 weitere', prompt: 'Wer lebt im Meer?', items: [['🐠','Fisch'],['🐋','Wal'],['🐙','Oktopus'],['🐬','Delfin'],['🐢','Meeresschildkröte'],['🦈','Hai'],['🦀','Krabbe'],['🐴','Seepferdchen'],['🪼','Qualle'],['⭐','Seestern'],['🦭','Robbe'],['🦞','Hummer'],['🦑','Tintenfisch'],['🦐','Garnele'],['🐡','Kugelfisch'],['🐧','Pinguin']] },
          land: { icon: '🦁', title: 'Landtiere', sub: '5 für die Schule + 21 weitere', prompt: 'Wer lebt an Land?', items: [['🦁','Löwe'],['🐘','Elefant'],['🦒','Giraffe'],['🐇','Kaninchen'],['🐒','Affe'],['🦓','Zebra'],['🐯','Tiger'],['🐻','Bär'],['🐴','Pferd'],['🐶','Hund'],['🐊','Krokodil'],['🦩','Flamingo'],['🦛','Nilpferd'],['🦏','Nashorn'],['🐫','Kamel'],['🐼','Panda'],['🦘','Känguru'],['🐄','Kuh'],['🐑','Schaf'],['🐐','Ziege'],['🦊','Fuchs'],['🐨','Koala'],['🐭','Maus'],['🐱','Katze'],['🐷','Schwein'],['🐔','Huhn']] },
          colors: { icon: '🎨', title: 'Farben', sub: '5 für die Schule + 11 weitere', prompt: 'Welche Farbe ist das?', items: [['●','Rot','#ef4444'],['●','Blau','#2563eb'],['●','Gelb','#facc15'],['●','Grün','#22c55e'],['●','Lila','#9333ea'],['●','Orange','#f97316'],['●','Rosa','#ec4899'],['●','Braun','#92400e'],['●','Schwarz','#171717'],['●','Weiß','#f8fafc'],['●','Grau','#94a3b8'],['●','Hellblau','#7dd3fc'],['●','Dunkelblau','#172554'],['●','Gold','#d4a017'],['●','Silber','#cbd5e1'],['●','Beige','#d6c6a5']] },
          shapes: { icon: '⭐', title: 'Formen', sub: '5 für die Schule + 11 weitere', prompt: 'Welche Form ist das?', items: [['●','Kreis'],['■','Quadrat'],['▲','Dreieck'],['★','Stern'],['♥','Herz'],['⬭','Oval'],['▭','Rechteck'],['◆','Raute'],['☾','Halbmond'],['⬡','Sechseck'],['⬟','Fünfeck'],['✚','Plus'],['✕','Kreuz'],['➜','Pfeil'],['◒','Halbkreis'],['⏢','Trapez']] }
        },
        interviews: [
          { q: 'Kannst du das Alphabet aufsagen?', answers: ['A', 'B', 'C', '…', 'Z'] },
          { q: 'Nenne fünf Tiere, die im Meer leben.', answers: ['Fisch','Wal','Oktopus','Delfin','Meeresschildkröte'] },
          { q: 'Nenne fünf Tiere, die an Land leben.', answers: ['Löwe','Elefant','Giraffe','Kaninchen','Affe'] },
          { q: 'Nenne fünf Farben.', answers: ['Rot','Blau','Gelb','Grün','Lila'] },
          { q: 'Nenne fünf Formen.', answers: ['Kreis','Quadrat','Dreieck','Stern','Herz'] }
        ]
      }
    };

DATA.fr = {
  locale: 'fr-FR', dir: 'ltr', brand: 'Petit explorateur', hello: 'Un peu de pratique chaque jour',
  nameTitle: 'Comment t’appelles-tu ?', nameText: 'Un adulte peut écrire ton prénom pour que Léo t’encourage.', nameLabel: 'Ton prénom', namePlaceholder: 'Écris ton prénom', nameButton: 'On s’entraîne !',
  helloName: name => `Bonjour, ${name} !`, praiseName: (phrase, name) => name ? `${phrase.replace(/s*!$/, '')}, ${name} !` : phrase, changeName: 'Changer le prénom',
  encouragements: ['Belle tentative !', 'Merci de t’entraîner !', 'Merci d’avoir essayé !', 'Continue comme ça !', 'C’est agréable de s’entraîner !', 'Continue à découvrir !', 'Tu prends confiance !', 'On continue !'],
  title: 'Prêt à découvrir ?', subtitle: 'Écoute, répète à voix haute et gagne une étoile à chaque activité.',
  progress: 'Mes étoiles', interviewTitle: 'On prépare l’entretien', interviewText: 'Cinq questions amicales, comme à l’école.', interviewButton: 'On essaie !',
  parentLink: 'Pour les parents', parentTitle: 'Pour les parents',
  parentIntro: 'Cinq minutes au calme suffisent. Les cinq premiers mots de chaque activité préparent à l’entretien. Les autres sont facultatifs.',
  tips: ['Faites une seule activité à la fois.', 'Vous pouvez arrêter après les cinq mots pour l’école.', 'Encouragez les efforts, même si un mot n’est pas encore parfait.'],
  reset: 'Effacer toutes les étoiles', resetDone: 'Les étoiles ont été effacées', back: 'Retour', listen: 'Écouter', next: 'Suivant', finish: 'Terminer', say: 'À toi de le dire !',
  doneTitle: 'Tu as réussi !', doneText: 'Tu as bien participé. Tu as gagné une étoile !', home: 'Retour aux activités',
  question: 'Question', showAnswer: 'Un petit indice', hideAnswer: 'Masquer l’indice', iAnswered: 'J’ai répondu !',
  answerHint: 'Prends ton temps et réponds à voix haute.', mascotAlt: 'Léo, le lion qui pose les questions', treatPrompt: 'Dis une réponse, puis donne un biscuit à Léo !',
  treatCount: n => `Léo a mangé ${n} biscuits sur 5`, feedTreat: n => `Donner le biscuit ${n} à Léo`, yum: 'Miam !', lessonTreatPrompt: 'Dis le mot, puis nourris Léo !', lessonFeed: 'Donner le biscuit à Léo', lessonFed: 'Léo l’a mangé !',
  allDone: 'Entretien terminé !', allDoneText: 'Tu as répondu à toutes les questions. Tape m’en cinq !', again: 'On recommence !',
  alphabetPlay: 'Dire l’alphabet', alphabetStop: 'Arrêter', alphabetTap: 'Touche une lettre pour l’écouter', alphabetNow: 'Maintenant', schoolSet: '5 pour l’école', bonusSet: 'Un mot en plus',
  voiceSpeed: 'Vitesse de la voix', voiceSlow: 'Lente', voiceNormal: 'Normale', songTitle: 'L’alphabet en français', songText: 'Écoute les lettres en français, puis chante-les avec un adulte.', songPlay: 'Écouter l’alphabet français', songCredit: '',
  schoolFiveTitle: 'Les cinq mots sont prêts !', schoolFiveText: 'Tu as pratiqué tous les mots pour cette question.', learnMore: 'Découvrir plus', stopHere: 'Terminer pour aujourd’hui',
  activities: {
    alphabet: { icon: '🔤', title: 'L’alphabet', sub: 'Les lettres de A à Z', prompt: 'Écoute et répète chaque lettre', letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') }
  },
  interviews: [
    { q: 'Peux-tu chanter la chanson de l’alphabet ?', answers: ['A','B','C','…','Z'] },
    { q: 'Nomme cinq animaux qui vivent dans la mer.', answers: ['Poisson','Baleine','Pieuvre','Dauphin','Tortue de mer'] },
    { q: 'Nomme cinq animaux qui vivent sur la terre.', answers: ['Lion','Éléphant','Girafe','Lapin','Singe'] },
    { q: 'Nomme cinq couleurs.', answers: ['Rouge','Bleu','Jaune','Vert','Violet'] },
    { q: 'Nomme cinq formes.', answers: ['Cercle','Carré','Triangle','Étoile','Cœur'] }
  ]
};

const FRENCH_LESSONS = {
  sea: {title:'Les animaux de la mer', sub:'5 pour l’école + 11 autres', prompt:'Qui vit dans la mer ?', words:['Poisson','Baleine','Pieuvre','Dauphin','Tortue de mer','Requin','Crabe','Hippocampe','Méduse','Étoile de mer','Phoque','Homard','Calmar','Crevette','Poisson-globe','Manchot']},
  land: {title:'Les animaux terrestres', sub:'5 pour l’école + 21 autres', prompt:'Qui vit sur la terre ?', words:['Lion','Éléphant','Girafe','Lapin','Singe','Zèbre','Tigre','Ours','Cheval','Chien','Crocodile','Flamant rose','Hippopotame','Rhinocéros','Chameau','Panda','Kangourou','Vache','Mouton','Chèvre','Renard','Koala','Souris','Chat','Cochon','Poule']},
  colors: {title:'Les couleurs', sub:'5 pour l’école + 11 autres', prompt:'Quelle est cette couleur ?', words:['Rouge','Bleu','Jaune','Vert','Violet','Orange','Rose','Marron','Noir','Blanc','Gris','Bleu clair','Bleu foncé','Doré','Argenté','Beige']},
  shapes: {title:'Les formes', sub:'5 pour l’école + 11 autres', prompt:'Quelle est cette forme ?', words:['Cercle','Carré','Triangle','Étoile','Cœur','Ovale','Rectangle','Losange','Croissant','Hexagone','Pentagone','Signe plus','Croix','Flèche','Demi-cercle','Trapèze']}
};
for (const [kind, lesson] of Object.entries(FRENCH_LESSONS)) {
  DATA.fr.activities[kind] = {...DATA.en.activities[kind], ...lesson, items: DATA.en.activities[kind].items.map((item, index) => [item[0], lesson.words[index], ...item.slice(2)])};
}

const INTERVIEW_VARIANTS = {
  en: [
    ['Can you sing the alphabet for me?', 'Let’s hear your alphabet song.'],
    ['Which five animals live in the sea?', 'Can you name five sea animals?'],
    ['Which five animals live on land?', 'Can you name five land animals?'],
    ['Can you tell me five colors?', 'Which five colors do you know?'],
    ['Can you tell me five shapes?', 'Which five shapes do you know?']
  ],
  ar: [
    ['هل تغني لي أنشودة الحروف؟', 'هيا نسمع أنشودة الحروف منك.'],
    ['ما خمسة الحيوانات التي تعيش في البحر؟', 'هل تسمي لي خمسة حيوانات بحرية؟'],
    ['ما خمسة الحيوانات التي تعيش على البر؟', 'هل تسمي لي خمسة حيوانات برية؟'],
    ['هل تذكر لي خمسة ألوان؟', 'ما الألوان الخمسة التي تعرفها؟'],
    ['هل تذكر لي خمسة أشكال؟', 'ما الأشكال الخمسة التي تعرفها؟']
  ],
  de: [
    ['Kannst du mir das Alphabet sagen?', 'Lass uns dein Alphabet hören.'],
    ['Welche fünf Tiere leben im Meer?', 'Kennst du fünf Meerestiere?'],
    ['Welche fünf Tiere leben an Land?', 'Kennst du fünf Landtiere?'],
    ['Kannst du mir fünf Farben nennen?', 'Welche fünf Farben kennst du?'],
    ['Kannst du mir fünf Formen nennen?', 'Welche fünf Formen kennst du?']
  ],
  fr: [
    ['Peux-tu me chanter l’alphabet ?', 'On écoute ta chanson de l’alphabet.'],
    ['Quels sont les cinq animaux qui vivent dans la mer ?', 'Peux-tu me dire cinq animaux de la mer ?'],
    ['Quels sont les cinq animaux qui vivent sur la terre ?', 'Peux-tu me dire cinq animaux terrestres ?'],
    ['Peux-tu me dire cinq couleurs ?', 'Quelles sont les cinq couleurs que tu connais ?'],
    ['Peux-tu me dire cinq formes ?', 'Quelles sont les cinq formes que tu connais ?']
  ]
};

const PRACTICE_COPY = {
  en: {
    languageLabel:'Choose language', completedLabel:'Completed', progressLabel:n=>`${n} of 5 completed`,
    recordTitle:'Hear your answer', recordHint:'Record, listen, and try again.', recordStart:'Record my answer', recordStop:'Stop recording', recordListen:'Hear my answer', recordPause:'Stop listening', recordRetry:'Try again',
    recordIdle:'Ready when you are.', recordRequest:'Waiting for microphone access…', recordActive:'Recording… Tap Stop when you’re done.', recordSaving:'Getting your answer ready…', recordReady:'Your answer is ready to hear.', recordPlaying:'Listening to your answer…', recordPrivacy:'Only on this device. Nothing is uploaded.',
    recordUnavailable:'Recording needs a supported browser on HTTPS or localhost. You can still answer out loud.', recordDenied:'Allow microphone access in your browser, then try again.', recordNoMic:'No microphone found. Connect one and try again.', recordBusy:'The microphone is busy. Close the other recording app and try again.', recordError:'We couldn’t record that. Try again.', recordEmpty:'We didn’t capture any sound. Try again.', recordPlaybackError:'That recording couldn’t play. Try recording again.', recordLimited:'Your recording stopped after one minute. You can listen or try again.',
    treatReplies:['Yum! Thanks for the treat.', 'Another answer practiced!', 'Let’s keep exploring.'], questionCheers:['You finished that question! High five!', 'One more question done! Wonderful practice!'],
    applauseLabel:'A round of applause!', completionSpeech:'You answered all five questions! What wonderful practice. High five!', lessonSpeech:'You finished your activity and earned a star! Wonderful practice!', schoolSpeech:'You practiced all five school words! High five!'
  },
  ar: {
    languageLabel:'اختر اللغة', completedLabel:'مكتمل', progressLabel:n=>`اكتمل ${n} من ٥ أنشطة`,
    recordTitle:'اسمع إجابتك', recordHint:'سجّل، واستمع، ثم جرّب مرة أخرى.', recordStart:'سجّل إجابتي', recordStop:'أوقف التسجيل', recordListen:'اسمع إجابتي', recordPause:'أوقف الاستماع', recordRetry:'جرّب مرة أخرى',
    recordIdle:'ابدأ عندما تكون مستعداً.', recordRequest:'ننتظر السماح باستخدام الميكروفون…', recordActive:'نسجّل… اضغط إيقاف عندما تنتهي.', recordSaving:'نجهّز إجابتك…', recordReady:'إجابتك جاهزة للاستماع.', recordPlaying:'نستمع إلى إجابتك…', recordPrivacy:'على هذا الجهاز فقط. لا يُرفع أي تسجيل.',
    recordUnavailable:'يحتاج التسجيل إلى متصفح يدعمه واتصال HTTPS أو localhost. يمكنك الإجابة بصوت عالٍ.', recordDenied:'اسمح باستخدام الميكروفون في المتصفح ثم حاول مجدداً.', recordNoMic:'لم نجد ميكروفوناً. وصّل ميكروفوناً وحاول مجدداً.', recordBusy:'الميكروفون مستخدم الآن. أغلق تطبيق التسجيل الآخر وحاول مجدداً.', recordError:'لم نتمكن من التسجيل. حاول مجدداً.', recordEmpty:'لم نسجّل أي صوت. حاول مجدداً.', recordPlaybackError:'تعذر تشغيل التسجيل. سجّل مرة أخرى.', recordLimited:'توقف التسجيل بعد دقيقة. استمع إليه أو جرّب مرة أخرى.',
    treatReplies:['لذيذ! شكراً على البسكويت.', 'تدرّبنا على إجابة أخرى!', 'هيا نواصل الاكتشاف.'], questionCheers:['أنهيت هذا السؤال! هيا نرفع أيدينا!', 'أنهيت سؤالاً آخر! تدريب رائع!'],
    applauseLabel:'تصفيق لك!', completionSpeech:'أجبت عن الأسئلة الخمسة! كان تدريباً رائعاً. هيا نحتفل!', lessonSpeech:'أنهيت النشاط وحصلت على نجمة! تدريب رائع!', schoolSpeech:'تدرّبت على كلمات المدرسة الخمس! هيا نحتفل!'
  },
  de: {
    languageLabel:'Sprache wählen', completedLabel:'Abgeschlossen', progressLabel:n=>`${n} von 5 abgeschlossen`,
    recordTitle:'Hör deine Antwort', recordHint:'Nimm auf, hör zu und probiere es noch einmal.', recordStart:'Antwort aufnehmen', recordStop:'Aufnahme stoppen', recordListen:'Antwort anhören', recordPause:'Wiedergabe stoppen', recordRetry:'Noch einmal versuchen',
    recordIdle:'Bereit, wenn du es bist.', recordRequest:'Wir warten auf den Mikrofonzugriff…', recordActive:'Aufnahme läuft… Tippe auf Stopp, wenn du fertig bist.', recordSaving:'Deine Antwort wird vorbereitet…', recordReady:'Deine Antwort ist bereit.', recordPlaying:'Du hörst deine Antwort…', recordPrivacy:'Nur auf diesem Gerät. Es wird nichts hochgeladen.',
    recordUnavailable:'Aufnahmen brauchen einen unterstützten Browser mit HTTPS oder localhost. Du kannst trotzdem laut antworten.', recordDenied:'Erlaube den Mikrofonzugriff im Browser und versuche es erneut.', recordNoMic:'Kein Mikrofon gefunden. Schließe eines an und versuche es erneut.', recordBusy:'Das Mikrofon ist gerade belegt. Schließe die andere Aufnahme-App und versuche es erneut.', recordError:'Die Aufnahme hat nicht geklappt. Versuche es erneut.', recordEmpty:'Wir haben keinen Ton aufgenommen. Versuche es erneut.', recordPlaybackError:'Die Aufnahme lässt sich nicht abspielen. Nimm sie noch einmal auf.', recordLimited:'Die Aufnahme wurde nach einer Minute beendet. Hör sie an oder versuche es erneut.',
    treatReplies:['Lecker! Danke für den Keks.', 'Noch eine Antwort geübt!', 'Lass uns weiter entdecken.'], questionCheers:['Du hast diese Frage geschafft! Gib mir fünf!', 'Noch eine Frage geschafft! Toll geübt!'],
    applauseLabel:'Ein Applaus für dich!', completionSpeech:'Du hast alle fünf Fragen beantwortet! Das war eine tolle Übung. Gib mir fünf!', lessonSpeech:'Du hast die Übung geschafft und einen Stern verdient! Toll geübt!', schoolSpeech:'Du hast alle fünf Schulwörter geübt! Gib mir fünf!'
  },
  fr: {
    languageLabel:'Choisir la langue', completedLabel:'Terminé', progressLabel:n=>`${n} activités sur 5 terminées`,
    recordTitle:'Écoute ta réponse', recordHint:'Enregistre, écoute et essaie encore.', recordStart:'Enregistrer ma réponse', recordStop:'Arrêter l’enregistrement', recordListen:'Écouter ma réponse', recordPause:'Arrêter l’écoute', recordRetry:'Essayer encore',
    recordIdle:'Quand tu es prêt.', recordRequest:'En attente de l’accès au micro…', recordActive:'On enregistre… Appuie sur Arrêter quand tu as fini.', recordSaving:'On prépare ta réponse…', recordReady:'Ta réponse est prête à être écoutée.', recordPlaying:'Tu écoutes ta réponse…', recordPrivacy:'Uniquement sur cet appareil. Aucun envoi.',
    recordUnavailable:'L’enregistrement nécessite un navigateur compatible sur HTTPS ou localhost. Tu peux toujours répondre à voix haute.', recordDenied:'Autorise le micro dans ton navigateur, puis réessaie.', recordNoMic:'Aucun micro trouvé. Branche un micro et réessaie.', recordBusy:'Le micro est déjà utilisé. Ferme l’autre application et réessaie.', recordError:'L’enregistrement n’a pas fonctionné. Réessaie.', recordEmpty:'Nous n’avons enregistré aucun son. Réessaie.', recordPlaybackError:'La lecture a échoué. Enregistre ta réponse à nouveau.', recordLimited:'L’enregistrement s’est arrêté après une minute. Écoute-le ou essaie encore.',
    treatReplies:['Miam ! Merci pour le biscuit.', 'Une autre réponse pratiquée !', 'On continue à découvrir.'], questionCheers:['Tu as terminé cette question ! Tape m’en cinq !', 'Encore une question terminée ! Tu as bien participé !'],
    applauseLabel:'On t’applaudit !', completionSpeech:'Tu as répondu aux cinq questions ! Tu as bien participé. Tape m’en cinq !', lessonSpeech:'Tu as terminé l’activité et gagné une étoile ! Tu as bien participé !', schoolSpeech:'Tu as pratiqué les cinq mots pour l’école ! Tape m’en cinq !'
  }
};

const INTERVIEW_KINDS = ['alphabet','sea','land','colors','shapes'];
for (const [lang, copy] of Object.entries(DATA)) {
  Object.assign(copy, PRACTICE_COPY[lang]);
  copy.interviews.forEach((question, index) => {
    question.kind = INTERVIEW_KINDS[index];
    question.variants = [question.q, ...INTERVIEW_VARIANTS[lang][index]];
  });
}
// Keep everyday encouragement gentle; high fives are reserved for milestones.
DATA.en.encouragements[1] = 'Thanks for practicing!';
DATA.en.encouragements[5] = 'Keep exploring!';
DATA.ar.encouragements[1] = 'شكراً على التدريب!';
DATA.ar.encouragements[5] = 'واصل الاكتشاف!';
DATA.de.encouragements[1] = 'Danke fürs Üben!';
DATA.de.encouragements[5] = 'Entdecke weiter!';

const SPEECH_UNAVAILABLE = {en:'Speech is not available on this device', ar:'الصوت غير متاح على هذا الجهاز', de:'Sprachausgabe ist auf diesem Gerät nicht verfügbar', fr:'La voix n’est pas disponible sur cet appareil'};
for (const [lang, copy] of Object.entries(DATA)) copy.speechUnavailable = SPEECH_UNAVAILABLE[lang];

const AUTO_FEED_COPY = {
  en: {autoStart:'Let Leo listen', autoStop:'Stop Leo listening', autoIdle:'Leo can feed himself when he hears a matching answer.', autoStarting:'Turning on the microphone…', autoListening:'Leo is listening. Say one answer at a time.', autoPaused:'Leo will listen again after the audio finishes.', autoDone:'Five answers practiced! Ready for the next question?', autoTry:'Take your time. Try another answer for this question.', autoDuplicate:'That answer already got a treat. Try a different one.', autoAccepted:word=>`${word}! Leo got a treat.`, autoUnavailable:'Automatic feeding needs a browser with speech recognition. You can still tap the cookies.', autoDenied:'Allow microphone access in your browser, then let Leo listen again.', autoNetwork:'Speech recognition needs a connection. Try again when you’re online.', autoLanguage:'Your browser can’t recognize this language. You can still tap the cookies.', autoError:'Leo couldn’t hear you just now. Tap Let Leo listen to try again.', autoPrivacy:'Your browser may process speech online. Recordings made above stay on this device.'},
  ar: {autoStart:'دع ليو يستمع', autoStop:'أوقف استماع ليو', autoIdle:'يأكل ليو عندما يسمع إجابة مناسبة.', autoStarting:'نشغّل الميكروفون…', autoListening:'ليو يستمع. قل إجابة واحدة كل مرة.', autoPaused:'سيستمع ليو بعد انتهاء الصوت.', autoDone:'تدرّبت على خمس إجابات! هل ننتقل للسؤال التالي؟', autoTry:'خذ وقتك. جرّب إجابة أخرى لهذا السؤال.', autoDuplicate:'حصلت هذه الإجابة على قطعة. جرّب إجابة مختلفة.', autoAccepted:word=>`${word}! حصل ليو على قطعة.`, autoUnavailable:'يحتاج الإطعام التلقائي إلى متصفح يتعرف على الكلام. يمكنك الضغط على البسكويت.', autoDenied:'اسمح باستخدام الميكروفون في المتصفح، ثم دع ليو يستمع مجدداً.', autoNetwork:'يحتاج التعرف على الكلام إلى اتصال بالإنترنت. حاول عندما تكون متصلاً.', autoLanguage:'لا يستطيع متصفحك التعرف على هذه اللغة. يمكنك الضغط على البسكويت.', autoError:'لم يسمعك ليو الآن. اضغط لبدء الاستماع مرة أخرى.', autoPrivacy:'قد يعالج المتصفح الكلام عبر الإنترنت. تبقى التسجيلات أعلاه على هذا الجهاز.'},
  de: {autoStart:'Leo zuhören lassen', autoStop:'Leos Zuhören stoppen', autoIdle:'Leo bekommt einen Keks, wenn er eine passende Antwort hört.', autoStarting:'Das Mikrofon wird eingeschaltet…', autoListening:'Leo hört zu. Sag eine Antwort nach der anderen.', autoPaused:'Leo hört nach der Wiedergabe wieder zu.', autoDone:'Fünf Antworten geübt! Bereit für die nächste Frage?', autoTry:'Lass dir Zeit. Probiere eine andere Antwort auf diese Frage.', autoDuplicate:'Diese Antwort hat schon einen Keks bekommen. Probiere eine andere.', autoAccepted:word=>`${word}! Leo hat einen Keks bekommen.`, autoUnavailable:'Automatisches Füttern braucht einen Browser mit Spracherkennung. Du kannst weiter auf die Kekse tippen.', autoDenied:'Erlaube den Mikrofonzugriff im Browser und lass Leo erneut zuhören.', autoNetwork:'Die Spracherkennung braucht eine Verbindung. Versuche es wieder, wenn du online bist.', autoLanguage:'Dein Browser erkennt diese Sprache nicht. Du kannst auf die Kekse tippen.', autoError:'Leo konnte dich gerade nicht hören. Lass ihn erneut zuhören.', autoPrivacy:'Dein Browser verarbeitet Sprache möglicherweise online. Die Aufnahmen oben bleiben auf diesem Gerät.'},
  fr: {autoStart:'Laisser Léo écouter', autoStop:'Arrêter l’écoute de Léo', autoIdle:'Léo reçoit un biscuit quand il entend une réponse qui convient.', autoStarting:'On allume le micro…', autoListening:'Léo écoute. Dis une réponse à la fois.', autoPaused:'Léo écoutera après la lecture du son.', autoDone:'Cinq réponses pratiquées ! Prêt pour la question suivante ?', autoTry:'Prends ton temps. Essaie une autre réponse à cette question.', autoDuplicate:'Cette réponse a déjà reçu un biscuit. Essaie une autre réponse.', autoAccepted:word=>`${word} ! Léo a reçu un biscuit.`, autoUnavailable:'Il faut un navigateur avec reconnaissance vocale pour nourrir Léo automatiquement. Tu peux toujours toucher les biscuits.', autoDenied:'Autorise le micro dans ton navigateur, puis laisse Léo écouter à nouveau.', autoNetwork:'La reconnaissance vocale nécessite une connexion. Réessaie quand tu es connecté.', autoLanguage:'Ton navigateur ne reconnaît pas cette langue. Tu peux toucher les biscuits.', autoError:'Léo ne t’a pas entendu. Laisse-le écouter à nouveau.', autoPrivacy:'Ton navigateur peut traiter la parole en ligne. Les enregistrements ci-dessus restent sur cet appareil.'}
};
for (const [lang, copy] of Object.entries(DATA)) Object.assign(copy, AUTO_FEED_COPY[lang]);

DATA.en.songPlay = 'Watch on YouTube';
DATA.en.songNewTab = 'Opens in a new tab';
DATA.ar.songPlay = 'شاهد على يوتيوب';
DATA.ar.songNewTab = 'يفتح في علامة تبويب جديدة';
DATA.de.songPlay = 'Auf YouTube ansehen';
DATA.de.songNewTab = 'Öffnet in einem neuen Tab';
DATA.fr.songNewTab = 'S’ouvre dans un nouvel onglet';
