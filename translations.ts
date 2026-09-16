
import { Language } from './types';

export const NATIVE_LANGUAGE_NAMES: Record<Language, string> = {
  fa: "فارسی",
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
  ar: "العربية",
  tr: "Türkçe",
  pl: "Polski",
  uk: "Українська"
};

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: "Turn",
    subtitle: "Group Word Game",
    newGame: "Start New Game",
    history: "History",
    guide: "Guide",
    setup: "Basic Settings",
    players: "Players",
    rounds: "Rounds",
    duration: "Round Duration",
    seconds: "Seconds",
    back: "Back",
    next: "Next",
    categories_title: "Categories",
    difficulty_title: "Word Difficulty Level",
    difficulty_hint: "Choose single words, compound terms, or proverbs",
    difficultyLevels: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      all: "Mixed (All)"
    },
    difficultyDescs: {
      easy: "Single Words (Glass, Fridge, Lion...)",
      medium: "Compound 2-Word Terms (Traffic Police, Mountain Bike...)",
      hard: "3+ Word Phrases & Proverbs (Birds of a feather...)",
      all: "Balanced mix of easy, medium, and hard words"
    },
    wordsFinished: "Selected words are finished",
    categories: {
      CAT_OBJECTS: "Daily Objects",
      CAT_FOOD: "Food & Drinks",
      CAT_ANIMALS: "Animals",
      CAT_JOBS: "Jobs & Professions",
      CAT_PLACES: "Places",
      CAT_VEHICLES: "Vehicles",
      CAT_FEELINGS: "Feelings & States",
      CAT_SPORTS: "Sports & Games",
      CAT_TECH: "Tech & Digital",
      CAT_ENTERTAINMENT: "Movies & Media",
      CAT_ADJECTIVES: "Adjectives"
    },
    minCategory: "Select at least one category",
    categoryHint: "Select at least one category. Words are chosen randomly.",
    playerNames: "Player Names",
    namesHint: "Teammates sit opposite in a circle. Turns move clockwise.",
    start: "Start Game",
    round: "Round",
    of: "of",
    timeRound: "Round Time",
    nextRound: "Start Next Round",
    roundEnded: "Round {n} has ended",
    passPhone: "Pass phone to the next player",
    paused: "Game Paused",
    resume: "Resume",
    exit: "Exit",
    swap: "Change Word",
    swapReady: "Change word in {n}s",
    eliminated: "Eliminated!",
    teamEliminated: "Your team's time is over. You are eliminated.",
    onlyOneTeam: "Only one team remains!",
    winner: "Winner!",
    winners: "Winners!",
    tie: "It's a Tie!",
    returnMenu: "Return to Menu",
    rules: "General Rules",
    howToPlay: "How to Play",
    noHistory: "No games played yet.",
    quitGame: "Exit Game",
    roundOver: "Over",
    teamNames: { BLUE: "Blue", RED: "Red", GREEN: "Green", YELLOW: "Yellow" },
    helpContent: {
      title: "'Turn' Game Guide",
      sections: [
        {
          id: "intro",
          title: "Introduction",
          body: "'Turn' is a group, gathering, and turn-based game played on a single mobile phone. The goal is to explain words to your teammates and have them guess in the shortest time possible. Besides entertainment, it is excellent for strengthening speaking skills and language learning."
        },
        {
          id: "teams",
          title: "Team Structure",
          body: "The game can be played with 4, 6, or 8 players.\n- Players are always divided into pairs.\n- Partners must sit directly opposite each other.\n- Players sit in a circle.\n- Turns always move clockwise.\n- Each team is represented by a specific color (Blue, Red, Green, Yellow)."
        },
        {
          id: "setup",
          title: "Game Preparation (Setup)",
          body: "Before starting:\n- Select the number of players.\n- Choose word difficulty level (Easy, Medium, Hard, or Mixed).\n- Specify the number of rounds (minimum 3).\n- Choose the duration of each round (minimum 90 seconds).\n- Select your preferred word categories.\n- Enter player names.\nAfter these steps, players are displayed on a circle, and partners are positioned opposite each other."
        },
        {
          id: "difficulty",
          title: "3 Difficulty Levels",
          body: "You can customize the challenge using three distinct difficulty tiers:\n1. 🟢 Easy: Single, everyday words (e.g. Glass, Fridge, Lion, Shoes).\n2. 🟡 Medium: Compound 2-word combinations (e.g. Washing Machine, Pomegranate Juice, Mountain Bike).\n3. 🔴 Hard: 3+ word phrases, proverbs, and idioms (e.g. 'Birds of a feather flock together', 'Don't count your chickens').\n4. 🌈 Mixed: A randomized blend across all tiers."
        },
        {
          id: "start",
          title: "Starting the Game",
          body: "The first player holds the phone and presses 'Start'. A word appears on the screen. The player must explain the word without saying the word itself, its root, translation, or any part of it. The partner sitting opposite can make unlimited guesses."
        },
        {
          id: "turns",
          title: "Changing Turns & Fast Mode",
          body: "As soon as the word is guessed correctly, tap the 'Correct' button or the card.\n\nTwo transition modes are available in Settings:\n1. ⚡ Fast Hot-Potato Mode (Default): The turn and a new word immediately open for the next player without interruption, providing maximum adrenaline and speed.\n2. 📱 Pass-Phone Ready Screen (Optional): A secrecy screen appears prompting you to pass the phone. The word stays hidden until the next player taps 'I am ready!'."
        },
        {
          id: "timers",
          title: "Timers and Timing",
          body: "Each round has a separate timer. Each team also has its own total time bank. A team's time only decreases when it is that team's turn. The faster a word is guessed, the better it is for the team."
        },
        {
          id: "swap",
          title: "Changing Words (Swap)",
          body: "After a word is displayed, a 20-second timer starts. Once this time ends, the 'Change Word' button becomes active. When swapped, a new word is shown and the 20-second timer restarts from the beginning."
        },
        {
          id: "elimination",
          title: "Team Elimination",
          body: "If a team's time reaches zero:\n- The game stops immediately.\n- An elimination message appears.\n- That team's turns are removed from the game.\nIf only one team remains, they are the winners."
        },
        {
          id: "roundEnd",
          title: "End of Round",
          body: "When the round timer runs out:\n- The game stops.\n- A 'Round Ended' message is shown.\n- The word currently being explained is discarded.\n- The 'Start Next Round' button appears.\nWhen the next round starts, the game continues with the same player and team with a new word."
        },
        {
          id: "pause",
          title: "Pausing the Game",
          body: "The game can be paused at any time by pressing the pause button or opening the Guide. When paused, timers stop. Resuming maintains the turn but displays a new word."
        },
        {
          id: "rules",
          title: "Important Game Rules",
          body: "- Saying the word, its root, translation, or part of it is forbidden.\n- Direct gesturing, counting letters, or showing the written word is forbidden.\n- Words do not repeat in a single game unless all words are exhausted.\n- In case of a time tie, multiple teams may be declared winners."
        },
        {
          id: "language",
          title: "Changing Language",
          body: "The game language can be changed on the first screen. Changing the language updates all parts (Guide, messages, words, categories). Language cannot be changed during an active game."
        },
        {
          id: "stats",
          title: "Game Statistics",
          body: "Information for each game is stored locally: Game date, player names, and winning teams. Statistics can be viewed from the first screen."
        }
      ]
    }
  },
  fa: {
    title: "دور",
    subtitle: "بازی گروهی کلمات",
    newGame: "شروع بازی جدید",
    history: "تاریخچه",
    guide: "راهنما",
    setup: "تنظیمات اولیه",
    players: "نفر",
    rounds: "تعداد دورها",
    duration: "زمان هر دور",
    seconds: "ثانیه",
    back: "بازگشت",
    next: "مرحله بعد",
    categories_title: "دسته‌بندی‌ها",
    difficulty_title: "سطح سختی کلمات",
    difficulty_hint: "انتخاب سطح سختی، کلمات ترکیبی یا ضرب‌المثل‌ها",
    difficultyLevels: {
      easy: "آسان",
      medium: "متوسط",
      hard: "سخت",
      all: "ترکیبی (همه)"
    },
    difficultyDescs: {
      easy: "تک‌کلمه‌ای (لیوان، یخچال، شیر، ماشین...)",
      medium: "کلمات ترکیبی ۲ کلمه‌ای (ماشین لباسشویی، آب انار، عینک آفتابی...)",
      hard: "عبارات ۳+ کلمه‌ای و ضرب‌المثل‌ها (جوجه را آخر پاییز می‌شمارند...)",
      all: "ترکیب تصادفی و متنوع از تمام سطوح کلمات"
    },
    wordsFinished: "کلمات انتخابی تمام شد",
    categories: {
      CAT_OBJECTS: "اشیای روزمره",
      CAT_FOOD: "خوراکی‌ها و نوشیدنی‌ها",
      CAT_ANIMALS: "حیوانات",
      CAT_JOBS: "شغل‌ها",
      CAT_PLACES: "مکان‌ها",
      CAT_VEHICLES: "وسایل نقلیه",
      CAT_FEELINGS: "احساسات و حالات",
      CAT_SPORTS: "ورزش‌ها و بازی‌ها",
      CAT_TECH: "تکنولوژی و دیجیتال",
      CAT_ENTERTAINMENT: "فیلم، سریال و سرگرمی",
      CAT_ADJECTIVES: "صفت‌های توصیفی"
    },
    minCategory: "حداقل یک دسته را انتخاب کنید",
    categoryHint: "حداقل یک دسته را انتخاب کنید. کلمات به صورت تصادفی انتخاب می‌شوند.",
    playerNames: "نام بازیکنان",
    namesHint: "یارها روبروی هم می‌نشینند. نوبت‌ها ساعتگرد است.",
    start: "شروع بازی",
    round: "دور",
    of: "از",
    timeRound: "زمان دور",
    nextRound: "شروع دور بعدی",
    roundEnded: "دور {n} به پایان رسید",
    passPhone: "گوشی را به نفر بعدی بدهید",
    paused: "بازی متوقف شد",
    resume: "ادامه بازی",
    exit: "خروج",
    swap: "تعویض کلمه",
    swapReady: "تعویض تا {n} ثانیه",
    eliminated: "حذف تیم!",
    teamEliminated: "زمان تیم شما به پایان رسید. حذف شدید.",
    onlyOneTeam: "فقط یک تیم باقی ماند!",
    winner: "برنده!",
    winners: "برندگان!",
    tie: "مساوی!",
    returnMenu: "بازگشت به منو",
    rules: "قوانین کلی",
    howToPlay: "نحوه بازی",
    noHistory: "هنوز بازی‌ای ثبت نشده.",
    quitGame: "خروج از بازی",
    roundOver: "به پایان رسید",
    teamNames: { BLUE: "آبی", RED: "قرمز", GREEN: "سبز", YELLOW: "زرد" },
    helpContent: {
      title: "راهنمای بازی «دور»",
      sections: [
        {
          id: "intro",
          title: "معرفی بازی",
          body: "«دور» یک بازی گروهی، دورهمی و نوبتی است که روی یک گوشی موبایل انجام می‌شود.\nهدف بازی، توضیح دادن کلمات برای هم‌گروهی خود و حدس زدن آن‌ها در کمترین زمان ممکن است.\nاین بازی علاوه بر سرگرمی، برای تقویت مهارت صحبت‌کردن و یادگیری زبان بسیار مناسب است."
        },
        {
          id: "teams",
          title: "ساختار گروه‌ها",
          body: "بازی می‌تواند با ۴، ۶ یا ۸ بازیکن انجام شود.\n- بازیکنان همیشه به گروه‌های دونفره تقسیم می‌شوند.\n- هر دو هم‌گروهی باید روبه‌روی هم بنشینند.\n- بازیکنان به‌صورت دایره‌ای می‌نشینند.\n- نوبت‌ها همیشه ساعت‌گرد است.\n- هر گروه با یک رنگ مشخص (آبی، قرمز، سبز، زرد) نمایش داده می‌شود."
        },
        {
          id: "setup",
          title: "آماده‌سازی بازی (ستاپ)",
          body: "قبل از شروع بازی:\n- تعداد بازیکنان را انتخاب کنید.\n- سطح سختی کلمات (آسان، متوسط، سخت یا ترکیبی) را انتخاب کنید.\n- تعداد دورهای بازی را مشخص کنید (حداقل ۳ دور).\n- مدت زمان هر دور را انتخاب کنید (حداقل ۹۰ ثانیه).\n- دسته‌بندی‌های کلمات دلخواه را انتخاب کنید.\n- اسم بازیکنان را وارد کنید.\nپس از این مراحل، بازیکنان روی یک دایره نمایش داده می‌شوند و هم‌گروهی‌ها روبه‌روی هم قرار می‌گیرند."
        },
        {
          id: "difficulty",
          title: "۳ سطح سختی کلمات",
          body: "شما می‌توانید سطح چالش بازی را تنظیم کنید:\n۱. 🟢 آسان: کلمات ساده و تک‌کلمه‌ای مانند لیوان، یخچال، شیر، کفش.\n۲. 🟡 متوسط: کلمات ترکیبی دو کلمه‌ای مانند ماشین لباسشویی، آب انار، عینک آفتابی، دوچرخه دنده‌ای.\n۳. 🔴 سخت: عبارات چندکلمه‌ای و ضرب‌المثل‌های اصیل مانند «جوجه را آخر پاییز می‌شمارند»، «با یک گل بهار نمی‌شود» و «کبوتر با کبوتر باز با باز».\n۴. 🌈 ترکیبی (همه): چالش ترکیبی از تمام سطوح کلمات."
        },
        {
          id: "start",
          title: "شروع بازی",
          body: "اولین بازیکن گوشی را در دست می‌گیرد و دکمه «شروع» را می‌زند.\n- یک کلمه روی صفحه نمایش داده می‌شود.\n- بازیکن باید بدون گفتن خود کلمه، ریشه کلمه، ترجمه یا بخشی از آن، کلمه را برای هم‌گروهی خود توضیح دهد.\n- هم‌گروهی مقابل می‌تواند بی‌نهایت حدس بزند."
        },
        {
          id: "turns",
          title: "نحوه تغییر نوبت و حالت‌های بازی",
          body: "به‌محض حدس درست کلمه توسط یارتان، روی دکمه «درسته!» یا خود کارت کلمه ضربه بزنید.\n\nدو حالت انتقال نوبت در بخش تنظیمات در دسترس است:\n۱. ⚡ حالت سریع و پرهیجان (پیش‌فرض): نوبت و کلمه جدید بلافاصله برای نفر بعد باز می‌شود و بدون کوچک‌ترین وقفه، هیجان بمب ساعتی را تجربه می‌کنید.\n۲. 📱 حالت تحویل گوشی (اختیاری): صفحه‌ای برای تحویل گوشی ظاهر می‌شود و کلمه جدید تا زمان زدن دکمه «من آماده‌ام!» توسط نفر بعدی مخفی می‌ماند."
        },
        {
          id: "timers",
          title: "تایمرها و زمان‌بندی",
          body: "هر دور یک تایمر جداگانه دارد.\n- هر گروه نیز یک زمان کل مخصوص به خود دارد.\n- زمان گروه فقط زمانی کم می‌شود که نوبت آن گروه باشد.\n- هرچه کلمه سریع‌تر حدس زده شود، به نفع گروه است."
        },
        {
          id: "swap",
          title: "تعویض کلمه",
          body: "بعد از نمایش هر کلمه، یک تایمر ۲۰ ثانیه‌ای شروع می‌شود. پس از پایان این زمان، دکمه «تعویض کلمه» فعال می‌شود.\nبا تعویض کلمه:\n- کلمه جدید نمایش داده می‌شود.\n- تایمر ۲۰ ثانیه دوباره از ابتدا شروع می‌شود."
        },
        {
          id: "elimination",
          title: "حذف گروه",
          body: "اگر زمان یک گروه به صفر برسد:\n- بازی بلافاصله متوقف می‌شود.\n- پیام حذف گروه نمایش داده می‌شود.\n- نوبت‌های آن گروه از بازی حذف می‌شود.\nاگر فقط یک گروه در بازی باقی بماند، همان گروه برنده بازی است."
        },
        {
          id: "roundEnd",
          title: "پایان دور",
          body: "با تمام شدن زمان هر دور:\n- بازی متوقف می‌شود.\n- پیام «پایان دور» نمایش داده می‌شود.\n- کلمه در حال توضیح حذف می‌شود.\n- دکمه «شروع دور بعدی» ظاهر می‌شود.\nبا شروع دور بعدی:\n- بازی از همان بازیکن و همان گروه ادامه پیدا می‌کند.\n- کلمه جدید نمایش داده می‌شود."
        },
        {
          id: "pause",
          title: "توقف بازی",
          body: "در هر زمان می‌توان بازی را متوقف کرد:\n- با زدن دکمه توقف\n- یا باز کردن صفحه راهنما\nهنگام توقف:\n- تایمرها متوقف می‌شوند.\nبا ادامه بازی:\n- نوبت تغییر نمی‌کند\n- اما کلمه جدید نمایش داده می‌شود"
        },
        {
          id: "rules",
          title: "قوانین مهم بازی",
          body: "- گفتن خود کلمه، ریشه آن، ترجمه یا بخشی از کلمه ممنوع است.\n- استفاده از اشاره مستقیم، شمردن حروف یا نمایش نوشتاری کلمه ممنوع است.\n- کلمات در یک بازی تکرار نمی‌شوند مگر اینکه تمام کلمات تمام شده باشند.\n- در صورت تساوی زمانی، ممکن است چند گروه برنده اعلام شوند."
        },
        {
          id: "language",
          title: "تغییر زبان",
          body: "زبان بازی را می‌توان در صفحه اول تغییر داد. با تغییر زبان: تمام بخش‌های بازی (راهنما، پیام‌ها، کلمات، دسته‌بندی‌ها) به زبان جدید نمایش داده می‌شوند. در حین بازی امکان تغییر زبان وجود ندارد."
        },
        {
          id: "stats",
          title: "آمار بازی",
          body: "اطلاعات هر بازی به‌صورت محلی ذخیره می‌شود: تاریخ بازی، اسم بازیکنان و گروه‌های برنده. آمار بازی‌ها از صفحه اول قابل مشاهده است."
        }
      ]
    }
  },
  nl: {
    title: "Beurt",
    subtitle: "Groepswoordspel",
    newGame: "Nieuw Spel",
    history: "Geschiedenis",
    guide: "Gids",
    setup: "Instellingen",
    players: "Spelers",
    rounds: "Rondes",
    duration: "Rondeduur",
    seconds: "Seconden",
    back: "Terug",
    next: "Volgende",
    categories_title: "Categorieën",
    difficulty_title: "Moeilijkheidsgraad",
    difficulty_hint: "Kies enkele woorden, samenstellingen of spreekwoorden",
    difficultyLevels: {
      easy: "Makkelijk",
      medium: "Gemiddeld",
      hard: "Moeilijk",
      all: "Gemengd (Alles)"
    },
    difficultyDescs: {
      easy: "Enkele woorden (Glas, Koelkast, Leeuw...)",
      medium: "Samengestelde 2-woord termen (Verkeerspolitie, Mountainbike...)",
      hard: "3+ Woorden en spreekwoorden (Wie een kuil graaft...)",
      all: "Gevarieerde mix van alle moeilijkheidsgraden"
    },
    wordsFinished: "Geselecteerde woorden zijn op",
    categories: {
      CAT_OBJECTS: "Dagelijkse Objecten",
      CAT_FOOD: "Eten & Drinken",
      CAT_ANIMALS: "Dieren",
      CAT_JOBS: "Beroepen",
      CAT_PLACES: "Plaatsen",
      CAT_VEHICLES: "Voertuigen",
      CAT_FEELINGS: "Gevoelens",
      CAT_SPORTS: "Sport & Spel",
      CAT_TECH: "Technologie",
      CAT_ENTERTAINMENT: "Media & Entertainment",
      CAT_ADJECTIVES: "Bijvoeglijke Naamwoorden"
    },
    minCategory: "Kies minstens één categorie",
    categoryHint: "Kies minstens één categorie. Woorden worden willekeurig gekozen.",
    playerNames: "Spelernamen",
    namesHint: "Teamgenoten zitten tegenover elkaar in een cirkel.",
    start: "Start Spel",
    round: "Ronde",
    of: "van",
    timeRound: "Rondetijd",
    nextRound: "Volgende Ronde",
    roundEnded: "Ronde {n} is voorbij",
    passPhone: "Geef telefoon door",
    paused: "Gepauzeerd",
    resume: "Begrepen",
    exit: "Stoppen",
    swap: "Wissel Woord",
    swapReady: "Wissel in {n}s",
    eliminated: "Geëlimineerd!",
    teamEliminated: "Tijd op. Jullie team is uitgeschakeld.",
    onlyOneTeam: "Nog maar één team over!",
    winner: "Winnaar!",
    winners: "Winnaars!",
    tie: "Gelijkspel!",
    returnMenu: "Hoofdmenu",
    rules: "Algemene Regels",
    howToPlay: "Hoe te spelen",
    noHistory: "Nog geen historie.",
    quitGame: "Spel Verlaten",
    roundOver: "Afgelopen",
    teamNames: { BLUE: "Blauw", RED: "Rood", GREEN: "Groen", YELLOW: "Geel" },
    helpContent: {
      title: "Spelgids 'Beurt'",
      sections: [
        {
          id: "intro",
          title: "Introductie",
          body: "'Beurt' is een groepsspel dat gespeeld wordt op één mobiele telefoon. Het doel is om woorden uit te leggen aan je teamgenoten en ze zo snel mogelijk te laten raden. Het versterkt ook spreekvaardigheid en taalleren."
        },
        {
          id: "teams",
          title: "Teamstructuur",
          body: "Het spel kan gespeeld worden met 4, 6 of 8 spelers.\n- Spelers zijn altijd verdeeld in duo's.\n- Partners zitten recht tegenover elkaar.\n- Spelers zitten in een cirkel.\n- Beurten gaan met de klok mee.\n- Elk team heeft een kleur (Blauw, Rood, Groen, Geel)."
        },
        {
          id: "setup",
          title: "Voorbereiding (Setup)",
          body: "Kies spelersaantal, rondes (min. 3), duur (min. 90s), categorieën en voer namen in. Partners worden automatisch tegenover elkaar geplaatst."
        },
        {
          id: "start",
          title: "Starten",
          body: "De eerste speler drukt op 'Start'. Leg het woord uit zonder het woord zelf, de stam of een vertaling te noemen. Je partner mag onbeperkt raden."
        },
        {
          id: "turns",
          title: "Wissel van Beurt",
          body: "Zodra het woord geraden is:\n- Tik op het scherm.\n- Geef de telefoon naar rechts.\n- Een nieuw woord verschijnt.\n- Het is de beurt aan de volgende speler."
        },
        {
          id: "timers",
          title: "Timers en Tijd",
          body: "Elke ronde heeft een timer. Elk team heeft ook een eigen tijdtegoed dat alleen afloopt tijdens hun beurt. Snelheid is cruciaal."
        },
        {
          id: "swap",
          title: "Woord Wisselen (Swap)",
          body: "Na 20 seconden wordt de 'Wissel Woord' knop actief. Dit toont een nieuw woord en herstart de 20 seconden wachttijd."
        },
        {
          id: "elimination",
          title: "Eliminatie",
          body: "Als de tijd van een team op is, stopt het spel direct. Het team wordt geëlimineerd. Het laatst overgebleven team wint."
        },
        {
          id: "roundEnd",
          title: "Einde Ronde",
          body: "Als de rondetimer op is, stopt het spel. Druk op 'Volgende Ronde' om verder te gaan met dezelfde speler en een nieuw woord."
        },
        {
          id: "pause",
          title: "Pauzeren",
          body: "Pauzeer via de knop of de Gids. Timers stoppen. Bij hervatten krijg je een nieuw woord, maar de beurt blijft gelijk."
        },
        {
          id: "rules",
          title: "Belangrijke Regels",
          body: "- Noem nooit het woord of een deel ervan.\n- Geen gebaren of spellen van letters.\n- Woorden herhalen niet totdat de lijst op is.\n- Bij gelijkspel kunnen meerdere teams winnen."
        },
        {
          id: "language",
          title: "Taal Wijzigen",
          body: "Wijzig de taal op het startscherm. Dit werkt alles bij. Tijdens het spel kan dit niet worden gewijzigd."
        },
        {
          id: "stats",
          title: "Statistieken",
          body: "Gegevens worden lokaal opgeslagen: Datum, namen en winnaars. Bekijk dit op het startscherm."
        }
      ]
    }
  },
  de: {
    title: "Runde",
    subtitle: "Gruppen-Wortspiel",
    newGame: "Neues Spiel",
    history: "Verlauf",
    guide: "Anleitung",
    setup: "Einstellungen",
    players: "Spieler",
    rounds: "Runden",
    duration: "Rundendauer",
    seconds: "Sekunden",
    back: "Zurück",
    next: "Weiter",
    categories_title: "Kategorien",
    difficulty_title: "Wort-Schwierigkeitsgrad",
    difficulty_hint: "Einzelwörter, zusammengesetzte Begriffe oder Sprichwörter",
    difficultyLevels: {
      easy: "Einfach",
      medium: "Mittel",
      hard: "Schwer",
      all: "Gemischt (Alle)"
    },
    difficultyDescs: {
      easy: "Einzelne Wörter (Glas, Kühlschrank, Löwe...)",
      medium: "Zusammengesetzte 2-Wort-Begriffe (Verkehrspolizei, Mountainbike...)",
      hard: "3+ Wörter & Sprichwörter (Wer im Glashaus sitzt...)",
      all: "Bunte Mischung aller Schwierigkeitsgrade"
    },
    wordsFinished: "Ausgewählte Wörter sind beendet",
    categories: {
      CAT_OBJECTS: "Alltagsgegenstände",
      CAT_FOOD: "Essen & Trinken",
      CAT_ANIMALS: "Tiere",
      CAT_JOBS: "Berufe",
      CAT_PLACES: "Orte",
      CAT_VEHICLES: "Fahrzeuge",
      CAT_FEELINGS: "Gefühle & Zustände",
      CAT_SPORTS: "Sport & Spiele",
      CAT_TECH: "Technik & Digitales",
      CAT_ENTERTAINMENT: "Unterhaltung",
      CAT_ADJECTIVES: "Adjektive"
    },
    minCategory: "Wähle mind. eine Kategorie",
    categoryHint: "Wähle mindestens eine Kategorie. Wörter werden zufällig ausgewählt.",
    playerNames: "Spielernamen",
    namesHint: "Partner sitzen gegenüber. Die Runde verläuft im Uhrzeigersinn.",
    start: "Spiel starten",
    round: "Runde",
    of: "von",
    timeRound: "Rundenzeit",
    nextRound: "Nächste Runde",
    roundEnded: "Runde {n} beendet",
    passPhone: "Telefon weitergeben",
    paused: "Pause",
    resume: "Verstanden",
    exit: "Beenden",
    swap: "Wort tauschen",
    swapReady: "Tausch in {n}s",
    eliminated: "Ausgeschieden!",
    teamEliminated: "Eure Teamzeit ist abgelaufen. Ihr seid raus.",
    onlyOneTeam: "Nur noch ein Team übrig!",
    winner: "Sieger!",
    winners: "Sieger!",
    tie: "Unentschieden!",
    returnMenu: "Hauptmenü",
    rules: "Allgemeine Regeln",
    howToPlay: "Spielweise",
    noHistory: "Noch keine Spiele.",
    quitGame: "Spiel beenden",
    roundOver: "Beendet",
    teamNames: { BLUE: "Blau", RED: "Rot", GREEN: "Grün", YELLOW: "Gelb" },
    helpContent: {
      title: "Spielanleitung 'Runde'",
      sections: [
        {
          id: "intro",
          title: "Einführung",
          body: "'Runde' ist ein rundenbasiertes Gesellschaftsspiel für ein einzelnes Smartphone. Ziel ist es, Begriffe so schnell wie möglich zu erklären, damit der Partner sie errät. Es fördert Sprechfertigkeit und Sprachenlernen."
        },
        {
          id: "teams",
          title: "Teamstruktur",
          body: "4, 6 oder 8 Spieler werden in Zweier-Teams aufgeteilt.\n- Partner sitzen sich im Kreis direkt gegenüber.\n- Die Spielrichtung ist im Uhrzeigersinn.\n- Jedes Team hat eine Farbe (Blau, Rot, Grün, Gelb)."
        },
        {
          id: "setup",
          title: "Vorbereitung (Setup)",
          body: "Wähle Spieleranzahl, Runden (min. 3) und Dauer (min. 90 Sek.). Gib Namen ein und wähle Kategorien. Partner werden automatisch gegenüber platziert."
        },
        {
          id: "start",
          title: "Spielstart",
          body: "Der aktive Spieler drückt 'Start' und erklärt den Begriff, ohne das Wort selbst, den Wortstamm oder eine Übersetzung zu nennen. Der Partner darf unbegrenzt raten."
        },
        {
          id: "turns",
          title: "Wechsel",
          body: "Sobald das Wort erraten wurde:\n- Tippe auf den Bildschirm.\n- Gib das Telefon nach rechts weiter.\n- Ein neues Wort erscheint.\n- Der nächste Spieler ist an der Reihe."
        },
        {
          id: "timers",
          title: "Zeitsteuerung",
          body: "Jede Runde hat einen Timer. Zusätzlich hat jedes Team ein Zeitkonto, das nur während seines Zugs abläuft. Schnelligkeit zählt!"
        },
        {
          id: "swap",
          title: "Wort tauschen (Swap)",
          body: "Nach 20 Sekunden wird die 'Tauschen'-Taste aktiv. Ein Tausch generiert ein neues Wort und startet die 20-Sekunden-Sperre erneut."
        },
        {
          id: "elimination",
          title: "Ausscheiden",
          body: "Sinkt das Zeitkonto eines Teams auf Null, scheidet es sofort aus. Das letzte verbleibende Team gewinnt."
        },
        {
          id: "roundEnd",
          title: "Rundenende",
          body: "Nach Ablauf des Rundentimers wird die aktuelle Karte verworfen. Die nächste Runde beginnt beim selben Spieler mit einem neuen Wort."
        },
        {
          id: "pause",
          title: "Pause",
          body: "Das Spiel kann jederzeit pausiert werden. Beim Fortsetzen wird ein neues Wort generiert, die Reihenfolge bleibt gleich."
        },
        {
          id: "rules",
          title: "Wichtige Regeln",
          body: "- Nenne nie das Wort oder Teile davon.\n- Gesten oder Buchstabieren sind verboten.\n- Wörter wiederholen sich erst, wenn alle aufgebraucht sind.\n- Bei Gleichstand können mehrere Teams gewinnen."
        },
        {
          id: "language",
          title: "Sprache ändern",
          body: "Die Sprache kann nur im Hauptmenü geändert werden. Dies aktualisiert alle Texte und die Anleitung."
        },
        {
          id: "stats",
          title: "Statistiken",
          body: "Spielverläufe werden lokal gespeichert: Datum, Namen und Sieger. Einsehbar im Hauptmenü."
        }
      ]
    }
  },
  fr: {
    title: "Tour",
    subtitle: "Jeu de mots en groupe",
    newGame: "Nouvelle Partie",
    history: "Historique",
    guide: "Guide",
    setup: "Configuration",
    players: "Joueurs",
    rounds: "Manches",
    duration: "Durée",
    seconds: "Secondes",
    back: "Retour",
    next: "Suivant",
    categories_title: "Catégories",
    difficulty_title: "Niveau de difficulté",
    difficulty_hint: "Mots simples, termes composés ou proverbes",
    difficultyLevels: {
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
      all: "Mixte (Tous)"
    },
    difficultyDescs: {
      easy: "Mots simples (Verre, Frigo, Lion, Voiture...)",
      medium: "Termes composés de 2 mots (Machine à laver, Vélo tout-terrain...)",
      hard: "3+ mots & proverbes (Pierre qui roule n'amasse pas mousse...)",
      all: "Mélange équilibré de tous les niveaux"
    },
    wordsFinished: "Les mots sélectionnés sont terminés",
    categories: {
      CAT_OBJECTS: "Objets Quotidiens",
      CAT_FOOD: "Nourriture & Boisson",
      CAT_ANIMALS: "Animaux",
      CAT_JOBS: "Métiers",
      CAT_PLACES: "Lieux",
      CAT_VEHICLES: "Véhicules",
      CAT_FEELINGS: "Sentiments",
      CAT_SPORTS: "Sports & Jeux",
      CAT_TECH: "Technologie",
      CAT_ENTERTAINMENT: "Divertissement",
      CAT_ADJECTIVES: "Adjectifs"
    },
    minCategory: "Choisissez une catégorie",
    categoryHint: "Sélectionnez au moins une catégorie. Les mots sont choisis au hasard.",
    playerNames: "Noms des joueurs",
    namesHint: "Les partenaires s'asseyent face à face en cercle.",
    start: "Commencer",
    round: "Manche",
    of: "sur",
    timeRound: "Temps",
    nextRound: "Manche Suivante",
    roundEnded: "Manche {n} terminée",
    passPhone: "Passez le téléphone",
    paused: "Pause",
    resume: "Compris",
    exit: "Quitter",
    swap: "Changer de mot",
    swapReady: "Changement dans {n}s",
    eliminated: "Éliminés !",
    teamEliminated: "Le temps de votre équipe est écoulé. Vous êtes éliminés.",
    onlyOneTeam: "Une seule équipe restante !",
    winner: "Gagnant !",
    winners: "Gagnants !",
    tie: "Égalité !",
    returnMenu: "Menu principal",
    rules: "Règles Générales",
    howToPlay: "Comment jouer",
    noHistory: "Pas d'historique.",
    quitGame: "Quitter la partie",
    roundOver: "Terminée",
    teamNames: { BLUE: "Bleu", RED: "Rouge", GREEN: "Vert", YELLOW: "Jaune" },
    helpContent: {
      title: "Guide du jeu 'Tour'",
      sections: [
        {
          id: "intro",
          title: "Introduction",
          body: "'Tour' est un jeu de société sur un seul téléphone. L'objectif est d'expliquer des mots à votre partenaire pour qu'il les devine le plus vite possible. C'est excellent pour la communication."
        },
        {
          id: "teams",
          title: "Structure des Équipes",
          body: "Jouez à 4, 6 ou 8 joueurs, répartis en duos.\n- Les partenaires s'asseyent face à face.\n- Les joueurs forment un cercle.\n- Le sens du jeu est horaire.\n- Chaque équipe a une couleur (Bleu, Rouge, Vert, Jaune)."
        },
        {
          id: "setup",
          title: "Préparation (Setup)",
          body: "Choisissez le nombre de joueurs, de manches (min. 3) et la durée (min. 90s). Entrez les noms et les catégories."
        },
        {
          id: "start",
          title: "Démarrage",
          body: "Le premier joueur appuie sur 'Démarrer'. Expliquez le mot sans le prononcer, ni sa racine, ni sa traduction. Le partenaire peut deviner sans limite."
        },
        {
          id: "turns",
          title: "Changement de Tour",
          body: "Dès que le mot est trouvé :\n- Touchez l'écran.\n- Passez le téléphone à droite.\n- Un nouveau mot apparaît.\n- C'est au tour du joueur suivant."
        },
        {
          id: "timers",
          title: "Chronomètres",
          body: "Chaque manche est limitée, et chaque équipe possède un capital temps global qui ne s'écoule que pendant son tour."
        },
        {
          id: "swap",
          title: "Changer de Mot (Swap)",
          body: "Après 20 secondes, le bouton 'Changer' devient actif. Cela génère un nouveau mot et relance le délai de 20 secondes."
        },
        {
          id: "elimination",
          title: "Élimination",
          body: "Si le capital temps d'une équipe tombe à zéro, elle est éliminée. La dernière équipe gagne."
        },
        {
          id: "roundEnd",
          title: "Fin de Manche",
          body: "À la fin du chrono, la manche s'arrête. Appuyez sur 'Manche Suivante' pour continuer avec le même joueur et un nouveau mot."
        },
        {
          id: "pause",
          title: "Pause",
          body: "Mettez en pause via le bouton ou le Guide. Reprendre génère un nouveau mot mais garde l'ordre des tours."
        },
        {
          id: "rules",
          title: "Règles Importantes",
          body: "- Interdiction de dire le mot ou ses dérivés.\n- Pas de gestes directs ni d'épellation.\n- Les mots ne reviennent qu'une fois la liste épuisée.\n- En cas d'égalité, plusieurs équipes peuvent gagner."
        },
        {
          id: "language",
          title: "Changer de Langue",
          body: "Modifiez la langue sur l'écran d'accueil. Cela met à jour tout le contenu. Impossible pendant une partie."
        },
        {
          id: "stats",
          title: "Statistiques",
          body: "Les données sont stockées localement : Date, noms et gagnants. Consultez-les sur l'écran d'accueil."
        }
      ]
    }
  },
  ar: {
    title: "دور",
    subtitle: "لعبة الكلمات الجماعية",
    newGame: "بدء لعبة جديدة",
    history: "السجل",
    guide: "الدليل",
    setup: "الإعدادات الأساسية",
    players: "لاعبين",
    rounds: "الجولات",
    duration: "مدة الجولة",
    seconds: "ثانية",
    back: "رجوع",
    next: "التالي",
    categories_title: "الفئات",
    difficulty_title: "مستوى صعوبة الكلمات",
    difficulty_hint: "كلمات مفردة، مصطلحات مركبة أو أمثال شعبية",
    difficultyLevels: {
      easy: "سهل",
      medium: "متوسط",
      hard: "صعب",
      all: "متنوع (الكل)"
    },
    difficultyDescs: {
      easy: "كلمات مفردة (كوب، ثلاجة، أسد، سيارة...)",
      medium: "مصطلحات مركبة من كلمتين (شرطة المرور، دراجة جبلية...)",
      hard: "عبارات ۳+ كلمات وأمثال شعبية (عصفور في اليد...)",
      all: "مزيج متوازن وعشوائي من كافة المستويات"
    },
    wordsFinished: "انتهت الكلمات المختارة",
    categories: {
      CAT_OBJECTS: "الأشياء اليومية",
      CAT_FOOD: "الطعام والشراب",
      CAT_ANIMALS: "الحيوانات",
      CAT_JOBS: "الوظائف والمهن",
      CAT_PLACES: "الأماكن",
      CAT_VEHICLES: "وسائل النقل",
      CAT_FEELINGS: "المشاعر والحالات",
      CAT_SPORTS: "الرياضة والألعاب",
      CAT_TECH: "التقنية والرقمنة",
      CAT_ENTERTAINMENT: "الأفلام والترفيه",
      CAT_ADJECTIVES: "الصفات الوصفية"
    },
    minCategory: "اختر فئة واحدة على الأقل",
    categoryHint: "اختر فئة واحدة على الأقل. يتم اختيار الكلمات عشوائياً.",
    playerNames: "أسماء اللاعبين",
    namesHint: "الزملاء يجلسون متقابلين في دائرة. الأدوار مع عقارب الساعة.",
    start: "بدء اللعبة",
    round: "الجولة",
    of: "من",
    timeRound: "وقت الجولة",
    nextRound: "بدء الجولة التالية",
    roundEnded: "انتهت الجولة {n}",
    passPhone: "مرر الهاتف للاعب التالي",
    paused: "اللعبة متوقفة",
    resume: "فهمت",
    exit: "خروج",
    swap: "تغيير الكلمة",
    swapReady: "تغيير في {n}ث",
    eliminated: "استبعاد!",
    teamEliminated: "انتهى وقت فريقك. تم استبعادكم.",
    onlyOneTeam: "بقي فريق واحد فقط!",
    winner: "الفائز!",
    winners: "الفائزون!",
    tie: "تعادل!",
    returnMenu: "العودة للقائمة",
    rules: "القواعد العامة",
    howToPlay: "كيفية اللعب",
    noHistory: "لا يوجد سجل ألعاب.",
    quitGame: "الخروج من اللعبة",
    roundOver: "انتهت",
    teamNames: { BLUE: "الأزرق", RED: "الأحمر", GREEN: "الأخضر", YELLOW: "الأصفر" },
    helpContent: {
      title: "دليل لعبة «دور»",
      sections: [
        {
          id: "intro",
          title: "مقدمة",
          body: "«دور» هي لعبة جماعية تُلعب بهاتف واحد. الهدف هو شرح الكلمات لزميلك ليقوم بتخمينها في أسرع وقت. اللعبة رائعة لتعلم اللغة."
        },
        {
          id: "teams",
          title: "هيكل الفرق",
          body: "تُلعب بـ 4 أو 6 أو 8 لاعبين.\n- يُقسم اللاعبون لأزواج.\n- يجلس الزملاء متقابلين.\n- يجلس اللاعبون في دائرة.\n- الأدوار باتجاه عقارب الساعة.\n- لكل فريق لون محدد."
        },
        {
          id: "setup",
          title: "الإعداد (Setup)",
          body: "اختر عدد اللاعبين، الجولات (3 كحد أدنى)، والمدة (90ث كحد أدنى). أدخل الأسماء واختر الفئات."
        },
        {
          id: "start",
          title: "بدء اللعب",
          body: "يبدأ اللاعب الأول بالضغط على 'ابدأ'. اشرح الكلمة دون ذكرها أو ذكر أصلها أو ترجمتها. الزميل يمكنه التخمين بلا حدود."
        },
        {
          id: "turns",
          title: "تغيير الدور",
          body: "بمجرد التخمين الصحيح:\n- اضغط على الشاشة.\n- مرر الهاتف لليمين.\n- تظهر كلمة جديدة.\n- يبدأ دور اللاعب التالي."
        },
        {
          id: "timers",
          title: "المؤقتات",
          body: "لكل جولة مؤقت، ولكل فريق رصيد زمني خاص ينقص فقط أثناء دورهم. السرعة ميزة."
        },
        {
          id: "swap",
          title: "تغيير الكلمة (Swap)",
          body: "بعد 20 ثانية، يتفعل زر 'تغيير'. استخدامه يبدأ فترة انتظار جديدة لمدة 20 ثانية."
        },
        {
          id: "elimination",
          title: "استبعاد الفريق",
          body: "إذا وصل وقت الفريق للصفر، يُستبعد فوراً. الفريق الأخير المتبقي هو الفائز."
        },
        {
          id: "roundEnd",
          title: "نهاية الجولة",
          body: "عند انتهاء وقت الجولة، تتوقف اللعبة. اضغط على 'الجولة التالية' للاستمرار مع نفس اللاعب بكلمة جديدة."
        },
        {
          id: "pause",
          title: "إيقاف مؤقت",
          body: "يمكن الإيقاف في أي وقت. عند الاستئناف تظهر كلمة جديدة لكن يبقى الترتيب كما هو."
        },
        {
          id: "rules",
          title: "قواعد هامة",
          body: "- يُمنع ذكر الكلمة أو مشتقاتها أو ترجمتها.\n- يُمنع الإشارة المباشرة أو العد.\n- لا تتكرر الكلمات حتى تنفد القائمة.\n- في حال التعادل، قد يفوز أكثر من فريق."
        },
        {
          id: "language",
          title: "تغيير اللغة",
          body: "تغيير اللغة من الشاشة الرئيسية يُحدث كل شيء. لا يمكن التغيير أثناء اللعب."
        },
        {
          id: "stats",
          title: "الإحصائيات",
          body: "تُحفظ البيانات محلياً: التاريخ، الأسماء والفائزين. متاحة في الشاشة الرئيسية."
        }
      ]
    }
  },
  tr: {
    title: "Dönem",
    subtitle: "Grup Kelime Oyunu",
    newGame: "Yeni Oyun",
    history: "Geçmiş",
    guide: "Rehber",
    setup: "Ayarlar",
    players: "Oyuncu",
    rounds: "Tur Sayısı",
    duration: "Tur Süresi",
    seconds: "Saniye",
    back: "Geri",
    next: "İleri",
    categories_title: "Kategoriler",
    difficulty_title: "Kelime Zorluk Derecesi",
    difficulty_hint: "Tek kelimeler, bileşik terimler veya atasözleri",
    difficultyLevels: {
      easy: "Kolay",
      medium: "Orta",
      hard: "Zor",
      all: "Karışık (Hepsi)"
    },
    difficultyDescs: {
      easy: "Tek kelimeler (Bardak, Buzdolabı, Aslan...)",
      medium: "2 kelimeli birleşik ifadeler (Trafik polisi, Dağ bisikleti...)",
      hard: "3+ kelimeli ifadeler ve atasözleri (Damlaya damlaya göl olur...)",
      all: "Tüm zorluk seviyelerinden dengeli karışım"
    },
    wordsFinished: "Seçili kelimeler bitti",
    categories: {
      CAT_OBJECTS: "Günlük Nesneler",
      CAT_FOOD: "Yiyecek & İçecek",
      CAT_ANIMALS: "Hayvanlar",
      CAT_JOBS: "Meslekler",
      CAT_PLACES: "Yerler",
      CAT_VEHICLES: "Taşıtlar",
      CAT_FEELINGS: "Duygular",
      CAT_SPORTS: "Spor & Oyun",
      CAT_TECH: "Teknoloji",
      CAT_ENTERTAINMENT: "Eğlence",
      CAT_ADJECTIVES: "Sıfatlar"
    },
    minCategory: "En az bir kategori seçin",
    categoryHint: "En az bir kategori seçin. Kelimeler rastgele seçilir.",
    playerNames: "Oyuncu İsimleri",
    namesHint: "Takım arkadaşları karşılıklı oturur.",
    start: "Oyunu Başlat",
    round: "Tur",
    of: " / ",
    timeRound: "Tur Süresi",
    nextRound: "Sonraki Tur",
    roundEnded: "Tur {n} bitti",
    passPhone: "Telefonu sıradaki oyuncuya ver",
    paused: "Oyun Durduruldu",
    resume: "Anladım",
    exit: "Çıkış",
    swap: "Kelimeyi Değiştir",
    swapReady: "{n}sn içinde değiştir",
    eliminated: "Elendiniz!",
    teamEliminated: "Takımınızın süresi bitti. Elendiniz.",
    onlyOneTeam: "Sadece bir takım kaldı!",
    winner: "Kazanan!",
    winners: "Kazananlar!",
    tie: "Berabere!",
    returnMenu: "Menüye Dön",
    rules: "Genel Kurallar",
    howToPlay: "Nasıl Oynanır",
    noHistory: "Henüz oyun yok.",
    quitGame: "Oyundan Çık",
    roundOver: "Bitti",
    teamNames: { BLUE: "Mavi", RED: "Kırmızı", GREEN: "Yeşil", YELLOW: "Sarı" },
    helpContent: {
      title: "'Dönem' Oyun Rehberi",
      sections: [
        {
          id: "intro",
          title: "Giriş",
          body: "'Dönem', tek bir telefon üzerinden oynanan grup tabanlı bir kelime oyunudur. Amaç, kelimeleri partnerinize anlatmaktır."
        },
        {
          id: "teams",
          title: "Takım Yapısı",
          body: "4, 6 veya 8 oyuncu ile oynanır.\n- Oyuncular çiftlere bölünür.\n- Partnerler karşılıklı oturur.\n- Oyuncular daire şeklinde oturur.\n- Sıra saat yönünde ilerler.\n- Takım renkleri (Mavi, Kırmızı, Yeşil, Sarı)."
        },
        {
          id: "setup",
          title: "Hazırlık (Setup)",
          body: "Oyuncu sayısını, tur sayısını (min. 3) ve süreyi (min. 90 sn) seçin. İsimleri girin ve kategorileri belirleyin."
        },
        {
          id: "start",
          title: "Başlatma",
          body: "Aktif oyuncu 'Başlat'a basar. Kelimeyi; kendisini, kökünü veya çevirisini söylemeden anlatır. Partner sınırsız tahmin yapabilir."
        },
        {
          id: "turns",
          title: "Sıra Değişimi",
          body: "Kelime doğru bilindiğinde:\n- Ekrana dokunun.\n- Telefonu sağa geçirin.\n- Yeni kelime gelir.\n- Sıradaki oyuncunun turu başlar."
        },
        {
          id: "timers",
          title: "Zamanlama",
          body: "Her turun bir süresi vardır. Ayrıca her takımın sadece kendi sırasında azalan ortak bir zaman bankası bulunur."
        },
        {
          id: "swap",
          title: "Kelime Değiştirme (Swap)",
          body: "20 saniye sonra 'Değiştir' butonu aktifleşir. Değişim, 20 saniyelik beklemeyi sıfırlar."
        },
        {
          id: "elimination",
          title: "Takım Elenmesi",
          body: "Zamanı biten takım elenir. Sona kalan tek takım kazanır."
        },
        {
          id: "roundEnd",
          title: "Tur Sonu",
          body: "Tur süresi bitince oyun durur. 'Sonraki Tur' butonu ile aynı oyuncudan ve yeni bir kelimeyle devam edilir."
        },
        {
          id: "pause",
          title: "Durdurma",
          body: "Oyun her an durdurulabilir. Devam edildiğinde kelime değişir ancak sıra bozulmaz."
        },
        {
          id: "rules",
          title: "Önemli Kurallar",
          body: "- Kelimeyi veya parçalarını söylemek yasaktır.\n- Harf saymak veya işaret etmek yasaktır.\n- Kelimeler liste bitene kadar tekrarlanmaz.\n- Eşitlik durumunda birden fazla takım kazanabilir."
        },
        {
          id: "language",
          title: "Dil Değiştirme",
          body: "Dil ana ekrandan değiştirilebilir. Bu her şeyi günceller. Oyun sırasında değiştirilemez."
        },
        {
          id: "stats",
          title: "İstatistikler",
          body: "Veriler yerel olarak kaydedilir: Tarih, isimler ve kazananlar. Ana ekrandan görebilirsiniz."
        }
      ]
    }
  },
  pl: {
    title: "Kolejka",
    subtitle: "Grupowa gra słowna",
    newGame: "Nowa Gra",
    history: "Historia",
    guide: "Instrukcja",
    setup: "Ustawienia",
    players: "Graczy",
    rounds: "Liczba rund",
    duration: "Czas rundy",
    seconds: "Sekundy",
    back: "Wstecz",
    next: "Dalej",
    categories_title: "Kategorie",
    difficulty_title: "Poziom trudności haseł",
    difficulty_hint: "Pojedyncze słowa, wyrażenia dwuczłonowe lub przysłowia",
    difficultyLevels: {
      easy: "Łatwy",
      medium: "Średni",
      hard: "Trudny",
      all: "Mieszany (Wszystko)"
    },
    difficultyDescs: {
      easy: "Pojedyncze słowa (Szklanka, Lodówka, Lew...)",
      medium: "Wyrażenia 2-wyrazowe (Policja drogowa, Rower górski...)",
      hard: "3+ wyrazów i przysłowia (Kto rano wstaje...)",
      all: "Różnorodna mieszanka wszystkich poziomów"
    },
    wordsFinished: "Wybrane słowa skończyлися",
    categories: {
      CAT_OBJECTS: "Codzienne Przedmioty",
      CAT_FOOD: "Jedzenie i Picie",
      CAT_ANIMALS: "Zwierzęta",
      CAT_JOBS: "Zawody",
      CAT_PLACES: "Miejsca",
      CAT_VEHICLES: "Pojazdy",
      CAT_FEELINGS: "Uczucia i Stany",
      CAT_SPORTS: "Sport i Gry",
      CAT_TECH: "Technologia",
      CAT_ENTERTAINMENT: "Rozrywka",
      CAT_ADJECTIVES: "Przymiotniki"
    },
    minCategory: "Wybierz min. jedną kategorię",
    categoryHint: "Wybierz przynajmniej jedną kategorię. Słowa są wybierane losowo.",
    playerNames: "Imiona graczy",
    namesHint: "Partnerzy siedzą naprzeciwko siebie in kręgu.",
    start: "Start",
    round: "Runda",
    of: "z",
    timeRound: "Czas rundy",
    nextRound: "Następna Runda",
    roundEnded: "Runda {n} zakończona",
    passPhone: "Podaj telefon",
    paused: "Pauza",
    resume: "Rozumiem",
    exit: "Wyjdź",
    swap: "Zmień słowo",
    swapReady: "Zmiana za {n}s",
    eliminated: "Eliminacja!",
    teamEliminated: "Czas waszej drużyny minął. Odpadacie.",
    onlyOneTeam: "Została jedna drużyna!",
    winner: "Zwycięzca!",
    winners: "Zwycięzcy!",
    tie: "Remis!",
    returnMenu: "Menu główne",
    rules: "Zasady Ogólne",
    howToPlay: "Jak grać",
    noHistory: "Brak historii gier.",
    quitGame: "Wyjdź z gry",
    roundOver: "Zakończona",
    teamNames: { BLUE: "Niebiescy", RED: "Czerwoni", GREEN: "Zieloni", YELLOW: "Żółci" },
    helpContent: {
      title: "Instrukcja gry 'Kolejka'",
      sections: [
        {
          id: "intro",
          title: "Wstęp",
          body: "'Kolejka' to gra towarzyska na jeden telefon. Celem jest wyjaśnianie haseł partnerowi jak najszybciej. Świetna do nauki języka."
        },
        {
          id: "teams",
          title: "Struktura Drużyn",
          body: "Graj w 4, 6 lub 8 osób.\n- Gracze dzielą się na pary.\n- Partnerzy siedzą naprzeciwko siebie.\n- Gracze tworzą krąg.\n- Kolejka zgodnie z ruchem wskazówek zegara.\n- Kolory drużyn (Niebieski, Czerwony, Zielony, Żółty)."
        },
        {
          id: "setup",
          title: "Przygotowanie (Setup)",
          body: "Wybierz liczbę graczy, rund (min. 3), czas (min. 90 sek.), kategorie i wpisz imiona."
        },
        {
          id: "start",
          title: "Start Gry",
          body: "Aktywny gracz naciska 'Start' i opisuje hasło bez użycia zakazanych słów lub ich tłumaczeń. Partner zgaduje bez limitu."
        },
        {
          id: "turns",
          title: "Zmiana Kolejki",
          body: "Po odgadnięciu haseł:\n- Dotknij ekranu.\n- Przekaż telefon osobie po prawej.\n- Pojawi się nowe hasło.\n- Zaczyna się tura kolejnego gracza."
        },
        {
          id: "timers",
          title: "Czas i Liczniki",
          body: "Każda runda ma swój czas, a każda drużyna wspólny bank czasu, który maleje tylko podczas ich tury."
        },
        {
          id: "swap",
          title: "Wymiana Hasła (Swap)",
          body: "Po 20 sekundach przycisk 'Zmień' staje się aktywny. Wymiana hasła resetuje 20-sekundową blokadę."
        },
        {
          id: "elimination",
          title: "Eliminacja",
          body: "Jeśli czas drużyny spadnie do zera, drużyna odpada. Ostatnia pozostała para wygrywa."
        },
        {
          id: "roundEnd",
          title: "Koniec Rundy",
          body: "Po upływie czasu rundy gra staje. Naciśnij 'Następna Runda', by kontynuować z nowym hasłem."
        },
        {
          id: "pause",
          title: "Pauza",
          body: "Możesz zatrzymać grę w dowolnym momencie. Wznowienie zmienia hasło, ale zachowuje kolejność."
        },
        {
          id: "rules",
          title: "Ważne Zasady",
          body: "- Nie wolno mówić hasła ani jego części.\n- Zakazane są gesty i pokazywanie liter.\n- Hasła nie powtarzają się aż do wyczerpania listy.\n- Przy remisie kilka drużyn może wygrać."
        },
        {
          id: "language",
          title: "Zmiana Języka",
          body: "Język zmienisz na ekranie głównym. Zmienia to hasła, instrukcje i menu."
        },
        {
          id: "stats",
          title: "Statystyki",
          body: "Dane są zapisywane lokalnie: Data, imiona i zwycięzcy. Dostępne w menu głównym."
        }
      ]
    }
  },
  uk: {
    title: "Черга",
    subtitle: "Групова гра в слова",
    newGame: "Нова гра",
    history: "Історія",
    guide: "Гайд",
    setup: "Налаштування",
    players: "Гравців",
    rounds: "Раунди",
    duration: "Тривалість",
    seconds: "Секунд",
    back: "Назад",
    next: "Далі",
    categories_title: "Категорії",
    difficulty_title: "Рівень складності слів",
    difficulty_hint: "Окремі слова, складені терміни або приказки",
    difficultyLevels: {
      easy: "Легкий",
      medium: "Середній",
      hard: "Складний",
      all: "Змішаний (Усі)"
    },
    difficultyDescs: {
      easy: "Окремі слова (Склянка, Холодильник, Лев...)",
      medium: "Складені терміни з 2 слів (Дорожня поліція, Гірський велосипед...)",
      hard: "3+ слів та приказки (Сім разів відміряй...)",
      all: "Різноманітний мікс усіх рівнів складності"
    },
    wordsFinished: "Вибрані слова закінчилися",
    categories: {
      CAT_OBJECTS: "Предмети",
      CAT_FOOD: "Їжа та напої",
      CAT_ANIMALS: "Тварини",
      CAT_JOBS: "Професії",
      CAT_PLACES: "Місця",
      CAT_VEHICLES: "Транспорт",
      CAT_FEELINGS: "Почуття",
      CAT_SPORTS: "Спорт та ігри",
      CAT_TECH: "Технології",
      CAT_ENTERTAINMENT: "Розваги",
      CAT_ADJECTIVES: "Прикметники"
    },
    minCategory: "Оберіть хоча б одну",
    categoryHint: "Оберіть принаймні одну категорію. Слова вибираються випадково.",
    playerNames: "Імена гравців",
    namesHint: "Напарники сидять навпроти один одного.",
    start: "Почати",
    round: "Раунд",
    of: "з",
    timeRound: "Час",
    nextRound: "Наступний раунд",
    roundEnded: "Раунд {n} завершено",
    passPhone: "Передайте телефон",
    paused: "Пауза",
    resume: "Зрозумів",
    exit: "Вихід",
    swap: "Змінити слово",
    swapReady: "Зміна через {n}с",
    eliminated: "Виліт!",
    teamEliminated: "Час вашої команди вийшов. Ви вибуваєте.",
    onlyOneTeam: "Залишилася одна команда!",
    winner: "Переможець!",
    winners: "Переможці!",
    tie: "Нічия!",
    returnMenu: "В меню",
    rules: "Загальні правила",
    howToPlay: "Как грати",
    noHistory: "Історія порожня.",
    quitGame: "Вийти з гри",
    roundOver: "Завершено",
    teamNames: { BLUE: "Сині", RED: "Червоні", GREEN: "Зелені", YELLOW: "Жовті" },
    helpContent: {
      title: "Гайд до гри 'Черга'",
      sections: [
        {
          id: "intro",
          title: "Вступ",
          body: "'Черга' — це групова гра на одному смартфоні. Мета: пояснити слова напарнику якнайшвидше. Корисно для вивчення мов."
        },
        {
          id: "teams",
          title: "Структура команд",
          body: "Грайте по 4, 6 або 8 осіб.\n- Гравці діляться на пари.\n- Напарники сидять навпроти.\n- Гравці утворюють коло.\n- Хід за годинниковою стрілкою.\n- Кольори команд (Синій, Червоний, Зелений, Жовтий)."
        },
        {
          id: "setup",
          title: "Налаштування (Setup)",
          body: "Оберіть кількість гравців, раундів (мін. 3), тривалість (мін. 90с), категорії та введіть імена."
        },
        {
          id: "start",
          title: "Початок гри",
          body: "Активний гравець тисне 'Старт' і пояснює слово без назви самого слова або перекладу. Напарник вгадує без лімітів."
        },
        {
          id: "turns",
          title: "Зміна ходу",
          body: "Коли слово вгадано:\n- Торкніться екрана.\n- Передайте телефон праворуч.\n- З'явиться нове слово.\n- Почнеться черга іншого гравця."
        },
        {
          id: "timers",
          title: "Таймери",
          body: "Кожен раунд обмежений часом. Також кожна команда має свій ліміт часу, що витрачається лише в їхній хід."
        },
        {
          id: "swap",
          title: "Заміна слова (Swap)",
          body: "Через 20 секунд кнопка 'Змінити' стає активною. Це оновлює 20-секундний тайمر очікування."
        },
        {
          id: "elimination",
          title: "Вибування",
          body: "Якщо час команди стає нульовим, вона вибуває. Остання команда перемагає."
        },
        {
          id: "roundEnd",
          title: "Кінець раунду",
          body: "Коли час раунду виходить, гра зупиняється. Тисніть 'Наступний раунд' для продовження з новим словом."
        },
        {
          id: "pause",
          title: "Пауза",
          body: "Гру можна поставити на паузу. При відновленні з'явиться нове слово, але черга не зміниться."
        },
        {
          id: "rules",
          title: "Важливі правила",
          body: "- Заборонено називати слово або його корінь.\n- Заборонено жестикулювати чи показувати букви.\n- Слова не повторюються.\n- При нічиї може бути кілька переможців."
        },
        {
          id: "language",
          title: "Зміна мови",
          body: "Мову можна змінити лише на головному екрані. Це оновить усі тексти та гайд."
        },
        {
          id: "stats",
          title: "Статистика",
          body: "Дані зберігаються локально: Дата, імена та переможці. Дивіться в головному меню."
        }
      ]
    }
  }
};
