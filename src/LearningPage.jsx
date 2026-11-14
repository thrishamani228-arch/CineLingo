import React, { useEffect, useState } from "react";

import "./LearningPage.css";

function LearningPage({ movie, onBack }) {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [quizFinished, setQuizFinished] = useState(false);

  const [completedActivities, setCompletedActivities] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);

  const movieData = movie || {

    title: "True Beauty",

    language: "Korean",

    genre: "Romance • Comedy • Drama",

    level: "Beginner",

    emoji: "🇰🇷"

  };

  const isJapanese = movieData.language === "Japanese";

  const isEnglish = movieData.language === "English";

  const languageName = movieData.language;

  const speakText = (text) => {
    const synth = window.speechSynthesis;

    if (!synth || typeof window.SpeechSynthesisUtterance === "undefined") {
      alert("Your browser does not support voice pronunciation. Please use the latest version of Chrome or Edge.");
      return;
    }

    if (!text || !String(text).trim()) {
      alert("There is no text available to pronounce.");
      return;
    }

    // Clear any previous speech and resume the speech engine before playing.
    synth.cancel();
    synth.resume();

    const languageCode = isJapanese ? "ja-JP" : isEnglish ? "en-US" : "ko-KR";
    const speech = new window.SpeechSynthesisUtterance(String(text));
    speech.lang = languageCode;
    speech.rate = 0.82;
    speech.pitch = 1;
    speech.volume = 1;

    const playSpeech = () => {
      const availableVoices = synth.getVoices();
      const languagePrefix = languageCode.slice(0, 2).toLowerCase();
      const matchingVoice = availableVoices.find((voice) =>
        voice.lang && voice.lang.toLowerCase().startsWith(languagePrefix)
      );

      // Use the matching Korean/Japanese/English voice when installed.
      // If no matching voice exists, still try the browser's default voice.
      if (matchingVoice) speech.voice = matchingVoice;

      speech.onerror = (event) => {
        console.error("Pronunciation playback error:", event.error);
        if (event.error === "voice-unavailable") {
          alert(`A ${languageCode} voice is not installed. Add the ${isJapanese ? "Japanese" : isEnglish ? "English" : "Korean"} speech voice in your computer's language settings, then reload this page.`);
        } else if (event.error !== "canceled" && event.error !== "interrupted") {
          alert("Could not play pronunciation. Please check your browser's sound and try again.");
        }
      };

      synth.speak(speech);
    };

    // Some browsers load their voice list after the page has opened.
    if (synth.getVoices().length === 0) {
      let hasStarted = false;
      const startOnce = () => {
        if (hasStarted) return;
        hasStarted = true;
        synth.removeEventListener("voiceschanged", onVoicesReady);
        playSpeech();
      };
      const onVoicesReady = () => startOnce();
      synth.addEventListener("voiceschanged", onVoicesReady);

      // Do not wait forever if the browser does not fire voiceschanged.
      window.setTimeout(() => {
        synth.removeEventListener("voiceschanged", onVoicesReady);
        startOnce();
      }, 800);
    } else {
      // A short delay avoids a cancel/speak timing issue in some Chromium browsers.
      window.setTimeout(playSpeech, 100);
    }
  };

  const videos = movieData.videos || (

    isJapanese

      ? [

          ["Japanese Lesson 1", "Watch the video and learn useful Japanese words and expressions.", "SBJNyf47B6Y"],

          ["Japanese Lesson 2", "Practice Japanese vocabulary and everyday expressions.", "9_aejVgOUNE"],

          ["Japanese Lesson 3", "Learn Japanese through conversations and examples.", "98d4_TU_qYY"],

          ["Japanese Lesson 4", "Improve your Japanese listening and understanding.", "H94p7KjpDzo"],

          ["Japanese Lesson 5", "Learn useful Japanese words and phrases.", "SL5JGaYdr5A"],

          ["Japanese Lesson 6", "Practice Japanese expressions from the lesson.", "B3z2-izt3wY"],

          ["Japanese Lesson 7", "Learn more Japanese vocabulary and conversations.", "znAnNtbNOg0"],

          ["Japanese Lesson 8", "Practice Japanese listening and useful expressions.", "q9HLtjfG8P4"],

          ["Japanese Lesson 9", "Learn Japanese words and phrases through the video.", "g_j-IgvS0wo"],

          ["Japanese Lesson 10", "Practice useful Japanese conversation.", "PQxlNAyJ-6g"],

          ["Japanese Lesson 11", "Learn Japanese vocabulary and pronunciation.", "Izv7aQcxtNc"],

          ["Japanese Lesson 12", "Practice common Japanese sentences and expressions.", "4afYM1MhjJ8"],

          ["Japanese Lesson 13", "Improve your Japanese listening skills.", "j2DbGW7zWac"],

          ["Japanese Lesson 14", "Learn Japanese through useful conversations.", "xQXySBUuYxE"],

          ["Japanese Lesson 15", "Practice Japanese vocabulary and everyday phrases.", "FI3Ild980DI"],

          ["Japanese Lesson 16", "Learn more Japanese expressions and conversations.", "PuWUhwIgHTo"],

          ["Japanese Lesson 17", "Practice Japanese listening and pronunciation.", "tZe1VEcx3Eg"],

          ["Japanese Lesson 18", "Learn useful Japanese words and expressions.", "UPELPXtUtOw"],

          ["Japanese Lesson 19", "Practice Japanese conversations and vocabulary.", "Cb8BXm9ZDO4"],

          ["Japanese Lesson 20", "Review Japanese words, phrases and conversations.", "mbCCx2XSOrM"],

          ["Japanese Lesson 21", "Review useful Japanese expressions and listening.", "somEzKcCDVE"]

        ].map(([title, description, videoId]) => ({ title, description, videoId }))

      : isEnglish

      ? [

          ["Scene 1 — Learn English with Elemental", "Watch the scene and learn useful English words and expressions.", "PjOf8tV_AXA"],

          ["Scene 2 — Learn English with Elemental", "Practice simple English conversations from the movie.", "OXeWVcFPwzg"],

          ["Scene 3 — Learn English with Elemental", "Learn useful English phrases from the scene.", "VXAexaaaUdE"],

          ["Scene 4 — Learn English with Elemental", "Practice English listening and everyday expressions.", "oZXiFpqxTuw"],

          ["Scene 5 — Learn English with Elemental", "Learn new English vocabulary through the movie scene.", "DiWrdCte7fw"],

          ["Scene 6 — Learn English with Elemental", "Practice common English sentences and expressions.", "DB3-s5oJFo8"],

          ["Scene 7 — Learn English with Elemental", "Improve your English listening with another scene.", "oQxJWkw0OcU"],

          ["Scene 8 — Learn English with Elemental", "Learn simple English expressions from the movie.", "wLEH8thqQZ8"],

          ["Scene 9 — Learn English with Elemental", "Practice useful English conversation.", "u0WX5gxSU0o"],

          ["Scene 10 — Learn English with Elemental", "Learn English vocabulary and pronunciation.", "fSMZ_fDkcqo"],

          ["Scene 11 — Learn English with Elemental", "Review English expressions through the final scene.", "wZjGV_VwIt4"]

        ].map(([title, description, videoId]) => ({ title, description, videoId }))

      : [

          ["Korean Lesson 1", "Watch the video and learn useful Korean words and expressions.", "YxrCvcWg74Q"],

          ["Korean Lesson 2", "Practice Korean vocabulary and everyday expressions.", "ma5AD144dt8"],

          ["Korean Lesson 3", "Learn Korean through scenes and conversations.", "QZKmHPi2co8"],

          ["Korean Lesson 4", "Improve your Korean listening and understanding.", "sdz1Eyqir04"],

          ["Korean Lesson 5", "Learn useful Korean words and phrases.", "aWUp9ZuH9Ig"],

          ["Korean Lesson 6", "Practice Korean expressions from the lesson.", "bGal4Iai8hQ"],

          ["Korean Lesson 7", "Learn more Korean vocabulary and conversations.", "Z8aQZSx56Rs"],

          ["Korean Lesson 8", "Practice Korean listening and useful expressions.", "FlJ345wWRDo"],

          ["Korean Lesson 9", "Review Korean words, phrases and conversations.", "\_4FzrrRQJq0"]

        ].map(([title, description, videoId]) => ({ title, description, videoId }))

  );

  const japaneseDialogues = [

    { japanese: "こんにちは。", pronunciation: "Konnichiwa.", meaning: "Hello." },

    { japanese: "元気ですか？", pronunciation: "Genki desu ka?", meaning: "How are you?" },

    { japanese: "ありがとう。", pronunciation: "Arigatou.", meaning: "Thank you." },

    { japanese: "大丈夫です。", pronunciation: "Daijoubu desu.", meaning: "It's okay." },

    { japanese: "またね。", pronunciation: "Mata ne.", meaning: "See you." },

    { japanese: "ごめんなさい。", pronunciation: "Gomen nasai.", meaning: "I'm sorry." },

    { japanese: "好きです。", pronunciation: "Suki desu.", meaning: "I like you / I like it." },

    { japanese: "本当ですか？", pronunciation: "Hontou desu ka?", meaning: "Really?" },

    { japanese: "わかりました。", pronunciation: "Wakarimashita.", meaning: "I understand." },

    { japanese: "気をつけて。", pronunciation: "Ki o tsukete.", meaning: "Take care." }

  ];

  const japaneseVocabulary = [

    { japanese: "友達", pronunciation: "Tomodachi", meaning: "Friend" },

    { japanese: "学校", pronunciation: "Gakkou", meaning: "School" },

    { japanese: "今日", pronunciation: "Kyou", meaning: "Today" },

    { japanese: "好き", pronunciation: "Suki", meaning: "Like" },

    { japanese: "愛", pronunciation: "Ai", meaning: "Love" },

    { japanese: "幸せ", pronunciation: "Shiawase", meaning: "Happiness" },

    { japanese: "家族", pronunciation: "Kazoku", meaning: "Family" },

    { japanese: "先生", pronunciation: "Sensei", meaning: "Teacher" },

    { japanese: "学生", pronunciation: "Gakusei", meaning: "Student" },

    { japanese: "大切", pronunciation: "Taisetsu", meaning: "Important / Precious" }

  ];

  const japaneseExpressions = [

    { japanese: "こんにちは", pronunciation: "Konnichiwa", meaning: "Hello" },

    { japanese: "大丈夫です", pronunciation: "Daijoubu desu", meaning: "It's okay" },

    { japanese: "好きです", pronunciation: "Suki desu", meaning: "I like you / I like it" },

    { japanese: "ありがとう", pronunciation: "Arigatou", meaning: "Thank you" },

    { japanese: "ごめんなさい", pronunciation: "Gomen nasai", meaning: "I'm sorry" },

    { japanese: "ちょっと待って", pronunciation: "Chotto matte", meaning: "Wait a moment" },

    { japanese: "本当？", pronunciation: "Hontou?", meaning: "Really?" },

    { japanese: "わかりました", pronunciation: "Wakarimashita", meaning: "I understand" }

  ];

  const englishDialogues = [

    { english: "Hi! How are you?", pronunciation: "Hi! How are you?", meaning: "A friendly way to ask how someone is." },

    { english: "I'm doing well.", pronunciation: "I'm doing well.", meaning: "A simple way to say you are okay." },

    { english: "Nice to meet you.", pronunciation: "Nice to meet you.", meaning: "Used when meeting someone for the first time." },

    { english: "What are you doing?", pronunciation: "What are you doing?", meaning: "Asking about someone's current activity." },

    { english: "I understand.", pronunciation: "I understand.", meaning: "Saying that you understand something." },

    { english: "That's okay.", pronunciation: "That's okay.", meaning: "Used to say that something is not a problem." },

    { english: "Are you sure?", pronunciation: "Are you sure?", meaning: "Used to check if someone is certain." },

    { english: "I like it.", pronunciation: "I like it.", meaning: "Used to say you like something." },

    { english: "Let's go.", pronunciation: "Let's go.", meaning: "Used to suggest going somewhere or starting." },

    { english: "See you later.", pronunciation: "See you later.", meaning: "A friendly way to say goodbye." }

  ];

  const englishVocabulary = [

    { english: "friend", pronunciation: "friend", meaning: "A person you know and like." },

    { english: "family", pronunciation: "family", meaning: "People related to you." },

    { english: "school", pronunciation: "school", meaning: "A place where students learn." },

    { english: "home", pronunciation: "home", meaning: "The place where you live." },

    { english: "happy", pronunciation: "happy", meaning: "Feeling good and pleased." },

    { english: "important", pronunciation: "important", meaning: "Having great value or meaning." },

    { english: "different", pronunciation: "different", meaning: "Not the same." },

    { english: "together", pronunciation: "together", meaning: "With another person or people." },

    { english: "understand", pronunciation: "understand", meaning: "To know the meaning of something." },

    { english: "remember", pronunciation: "remember", meaning: "To keep something in your memory." }

  ];

  const englishExpressions = [

    { english: "How are you?", pronunciation: "How are you?", meaning: "A common greeting asking about someone's condition." },

    { english: "I'm fine.", pronunciation: "I'm fine.", meaning: "A simple reply saying you are okay." },

    { english: "Thank you.", pronunciation: "Thank you.", meaning: "Used to show gratitude." },

    { english: "You're welcome.", pronunciation: "You're welcome.", meaning: "A reply after someone says thank you." },

    { english: "I'm sorry.", pronunciation: "I'm sorry.", meaning: "Used to apologize." },

    { english: "Excuse me.", pronunciation: "Excuse me.", meaning: "Used to get attention or politely interrupt." },

    { english: "Wait a moment.", pronunciation: "Wait a moment.", meaning: "Used to ask someone to wait briefly." },

    { english: "Really?", pronunciation: "Really?", meaning: "Used to show surprise or ask for confirmation." },

    { english: "Of course.", pronunciation: "Of course.", meaning: "Used to say yes or show agreement." },

    { english: "See you soon.", pronunciation: "See you soon.", meaning: "A friendly way to say goodbye." }

  ];

  const koreanDialogues = [

    { korean: "안녕하세요.", pronunciation: "Annyeonghaseyo.", meaning: "Hello." },

    { korean: "괜찮아요?", pronunciation: "Gwaenchanayo?", meaning: "Are you okay?" },

    { korean: "감사합니다.", pronunciation: "Gamsahamnida.", meaning: "Thank you." },

    { korean: "안녕!", pronunciation: "Annyeong!", meaning: "Hi! / Bye!" },

    { korean: "좋아요.", pronunciation: "Joayo.", meaning: "Good / I like it." },

    { korean: "미안해요.", pronunciation: "Mianhaeyo.", meaning: "I'm sorry." },

    { korean: "괜찮아.", pronunciation: "Gwaenchana.", meaning: "It's okay." },

    { korean: "잘 지냈어요?", pronunciation: "Jal jinaesseoyo?", meaning: "How have you been?" },

    { korean: "뭐 해요?", pronunciation: "Mwo haeyo?", meaning: "What are you doing?" },

    { korean: "어디 가요?", pronunciation: "Eodi gayo?", meaning: "Where are you going?" }

  ];

  const koreanVocabulary = [

    { korean: "안녕하세요", pronunciation: "Annyeonghaseyo", meaning: "Hello" },

    { korean: "친구", pronunciation: "Chingu", meaning: "Friend" },

    { korean: "학교", pronunciation: "Hakgyo", meaning: "School" },

    { korean: "오늘", pronunciation: "Oneul", meaning: "Today" },

    { korean: "좋아요", pronunciation: "Joayo", meaning: "Good / I like it" },

    { korean: "사랑", pronunciation: "Sarang", meaning: "Love" },

    { korean: "사람", pronunciation: "Saram", meaning: "Person" },

    { korean: "행복", pronunciation: "Haengbok", meaning: "Happiness" },

    { korean: "가족", pronunciation: "Gajok", meaning: "Family" },

    { korean: "친절하다", pronunciation: "Chinjeolhada", meaning: "To be kind" },

    { korean: "예쁘다", pronunciation: "Yeppeuda", meaning: "Pretty / Beautiful" },

    { korean: "멋있다", pronunciation: "Meositta", meaning: "Cool / Handsome" },

    { korean: "선생님", pronunciation: "Seonsaengnim", meaning: "Teacher" },

    { korean: "학생", pronunciation: "Haksaeng", meaning: "Student" },

    { korean: "친구들", pronunciation: "Chingudeul", meaning: "Friends" }

  ];

  const koreanExpressions = [

    { korean: "안녕!", pronunciation: "Annyeong!", meaning: "Hi! / Bye!" },

    { korean: "괜찮아요", pronunciation: "Gwaenchanayo", meaning: "It's okay" },

    { korean: "좋아해요", pronunciation: "Joahaeyo", meaning: "I like it / I like you" },

    { korean: "감사합니다", pronunciation: "Gamsahamnida", meaning: "Thank you" },

    { korean: "미안해요", pronunciation: "Mianhaeyo", meaning: "I'm sorry" },

    { korean: "잘 모르겠어요", pronunciation: "Jal moreugesseoyo", meaning: "I'm not sure / I don't know well" },

    { korean: "잠깐만요", pronunciation: "Jamkkanmanyo", meaning: "Wait a moment" },

    { korean: "정말요?", pronunciation: "Jeongmallyo?", meaning: "Really?" },

    { korean: "맞아요", pronunciation: "Majayo", meaning: "That's right" },

    { korean: "좋은 생각이에요", pronunciation: "Joeun saenggagieyo", meaning: "That's a good idea" },

    { korean: "괜찮아", pronunciation: "Gwaenchana", meaning: "It's okay" },

    { korean: "잘했어요", pronunciation: "Jalhaesseoyo", meaning: "Well done" }

  ];

  const dialogues = isJapanese ? japaneseDialogues : isEnglish ? englishDialogues : koreanDialogues;

  const vocabulary = isJapanese ? japaneseVocabulary : isEnglish ? englishVocabulary : koreanVocabulary;

  const expressions = isJapanese ? japaneseExpressions : isEnglish ? englishExpressions : koreanExpressions;

  const japaneseQuiz = [

    { question: "What does 友達 (tomodachi) mean?", options: ["School", "Friend", "Teacher", "Family"], answer: "Friend" },

    { question: "What does 学校 (gakkou) mean?", options: ["School", "Love", "Today", "Student"], answer: "School" },

    { question: "What does 今日 (kyou) mean?", options: ["Family", "Today", "Friend", "Teacher"], answer: "Today" },

    { question: "What does 好き (suki) mean?", options: ["Like", "School", "Happiness", "Student"], answer: "Like" },

    { question: "What does 愛 (ai) mean?", options: ["Love", "Friend", "Teacher", "Today"], answer: "Love" },

    { question: "What does 家族 (kazoku) mean?", options: ["Student", "Family", "School", "Happiness"], answer: "Family" },

    { question: "What does 先生 (sensei) mean?", options: ["Teacher", "Friend", "Love", "Student"], answer: "Teacher" },

    { question: "What does ありがとう (arigatou) mean?", options: ["Hello", "Thank you", "I'm sorry", "Really?"], answer: "Thank you" }

  ];

  const englishQuiz = [

    { question: "What does “friend” mean?", options: ["A person you know and like", "A place to study", "A family member only", "A type of food"], answer: "A person you know and like" },

    { question: "What does “happy” mean?", options: ["Feeling good and pleased", "Feeling tired", "Being late", "Being angry"], answer: "Feeling good and pleased" },

    { question: "What does “important” mean?", options: ["Having great value or meaning", "Very small", "Very far away", "Not useful"], answer: "Having great value or meaning" },

    { question: "What does “together” mean?", options: ["With another person or people", "Without anyone", "Very quickly", "Only at school"], answer: "With another person or people" },

    { question: "What does “understand” mean?", options: ["To know the meaning of something", "To forget something", "To leave a place", "To buy something"], answer: "To know the meaning of something" },

    { question: "What does “Thank you” express?", options: ["Gratitude", "Anger", "Confusion", "Fear"], answer: "Gratitude" },

    { question: "What does “I'm sorry” express?", options: ["An apology", "A greeting", "A question about time", "An invitation"], answer: "An apology" },

    { question: "What does “Let's go” suggest?", options: ["Going somewhere or starting", "Going to sleep", "Stopping forever", "Studying alone"], answer: "Going somewhere or starting" }

  ];

  const koreanQuiz = [

    { question: "What does 친구 (chingu) mean?", options: ["School", "Friend", "Today", "Thank You"], answer: "Friend" },

    { question: "What does 오늘 (oneul) mean?", options: ["Love", "Person", "Today", "School"], answer: "Today" },

    { question: "What does 학교 (hakgyo) mean?", options: ["School", "Friend", "Hello", "Love"], answer: "School" },

    { question: "What does 좋아요 (joayo) mean?", options: ["Good / I like it", "Thank You", "Today", "Person"], answer: "Good / I like it" },

    { question: "What does 감사합니다 (gamsahamnida) mean?", options: ["Hello", "Thank You", "Friend", "School"], answer: "Thank You" },

    { question: "What does 사랑 (sarang) mean?", options: ["Family", "Love", "Teacher", "School"], answer: "Love" },

    { question: "What does 가족 (gajok) mean?", options: ["Friend", "Family", "Student", "Person"], answer: "Family" },

    { question: "What does 미안해요 (mianhaeyo) mean?", options: ["I'm sorry", "Hello", "Good luck", "Really?"], answer: "I'm sorry" }

  ];

  const quizQuestions = isJapanese ? japaneseQuiz : isEnglish ? englishQuiz : koreanQuiz;

  const getUserEmail = () =>

    localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail") || "";

  const saveProgress = async (activity, quizScore = null) => {

    const email = getUserEmail();

    if (!email) {

      console.error("User email not found. Progress cannot be saved.");

      return;

    }

    try {

      const body = new URLSearchParams();

      body.append("email", email);

      body.append("movie", movieData.title);

      body.append("language", movieData.language);

      body.append("activity", activity);

      body.append("completed", "1");

      if (quizScore !== null) {

        body.append("quiz_score", String(quizScore));

      }

      const response = await fetch("http://localhost:5000/learning-progress", {

        method: "POST",

        headers: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        body: body.toString()

      });

      if (!response.ok) {

        throw new Error(`Progress save failed: ${response.status}`);

      }

    } catch (error) {

      console.error("Error saving learning progress:", error);

    }

  };

  useEffect(() => {

    const loadProgress = async () => {

      const email = getUserEmail();

      if (!email) return;

      try {

        const body = new URLSearchParams();

        body.append("email", email);

        body.append("movie", movieData.title);

        body.append("language", movieData.language);

        const response = await fetch("http://localhost:5000/get-learning-progress", {

          method: "POST",

          headers: {

            "Content-Type": "application/x-www-form-urlencoded"

          },

          body: body.toString()

        });

        if (!response.ok) {

          throw new Error(`Progress load failed: ${response.status}`);

        }

        const data = await response.json();

        if (!Array.isArray(data)) return;

        const completed = data

          .filter((item) => Number(item.completed) === 1)

          .map((item) => item.activity);

        setCompletedActivities([...new Set(completed)]);

        const savedQuiz = data.find(

          (item) => item.activity === "quiz" && item.quiz_score !== null

        );

        if (savedQuiz) {

          setScore(Number(savedQuiz.quiz_score));

          setQuizFinished(true);

        }

      } catch (error) {

        console.error("Error loading learning progress:", error);

      }

    };

    loadProgress();

  }, [movieData.title, movieData.language]);

  const completeActivity = (activity, quizScore = null) => {

    setCompletedActivities((previous) => {

      if (previous.includes(activity)) return previous;

      return [...previous, activity];

    });

    saveProgress(activity, quizScore);

  };

  const handleAnswer = (answer) => {

    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === quizQuestions[currentQuestion].answer) {

      setScore((previousScore) => previousScore + 1);

    }

  };

  const nextQuestion = () => {

    if (currentQuestion < quizQuestions.length - 1) {

      setCurrentQuestion((previous) => previous + 1);

      setSelectedAnswer("");

    } else {

      setQuizFinished(true);

      completeActivity("quiz", score);

    }

  };

  const restartQuiz = () => {

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setQuizFinished(false);

  };

  const totalActivities = videos.length + 4;

  const learningProgress = Math.round((completedActivities.length / totalActivities) * 100);

  const languageLabel = isJapanese ? "JAPANESE" : isEnglish ? "ENGLISH" : "KOREAN";

  const lessonText = isJapanese

    ? "Learn useful Japanese words, expressions and conversations through anime scenes."

    : isEnglish

    ? "Learn useful English words, expressions and conversations through movie scenes."

    : "Learn useful Korean words, expressions and conversations through movie scenes.";

  return (

    <div className="learning-page">

      <style>{`
        .speak-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 16px;
          margin-top: 10px;
          border: 1px solid #e8b8c9;
          border-radius: 30px;
          background: #fff0f5;
          color: #873e68;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .speak-button:hover {
          background: linear-gradient(120deg, #e77d9c, #a66bc4);
          color: #ffffff;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(166, 107, 196, 0.2);
        }

        .speak-button:active {
          transform: scale(0.96);
        }

        .speak-button:focus-visible {
          outline: 3px solid #c69ad8;
          outline-offset: 3px;
        }
      `}</style>

      <header className="learning-header">

        <button className="learning-back" onClick={onBack}>← Back</button>

        <div className="learning-logo">CineLingo</div>

        <div className="learning-header-right">{movieData.language}</div>

      </header>

      <section className="learning-intro">

        <div className="learning-poster"><span>{movieData.emoji}</span></div>

        <div className="learning-movie-info">

          <p className="learning-small-title">LANGUAGE LESSON</p>

          <h1>{movieData.title}</h1>

          <div className="learning-tags">

            <span>{movieData.language}</span>

            <span>{movieData.genre}</span>

            <span>{movieData.level}</span>

          </div>

          <p>{lessonText}</p>

          <button

            className="start-scene"

            onClick={() => document.getElementById("watch")?.scrollIntoView({ behavior: "smooth" })}

          >

            ▶ Start Learning

          </button>

        </div>

      </section>

      <main className="learning-content">

        <section className="learning-section" id="watch">

          <span className="section-label">STEP 1</span>

          <h2>🎬 Watch & Learn</h2>

          <p className="section-subtitle">Watch the scenes and learn {languageName} from the conversation.</p>

          <div className="video-learning-container">
            {videos.length > 0 ? (
              <>
                <div className="main-video-card">
                  <h3>{videos[activeVideo]?.title}</h3>
                  <p>{videos[activeVideo]?.description}</p>

                  <div className="youtube-container">
                    <iframe
                      key={videos[activeVideo]?.videoId || videos[activeVideo]?.playlistId || activeVideo}
                      src={
                        videos[activeVideo]?.playlistId
                          ? `https://www.youtube.com/embed/videoseries?list=${videos[activeVideo].playlistId}`
                          : `https://www.youtube.com/embed/${videos[activeVideo]?.videoId}`
                      }
                      title={videos[activeVideo]?.title || "Learning video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  <button
                    className={
                      completedActivities.includes(`video-${activeVideo + 1}`)
                        ? "activity-complete completed"
                        : "activity-complete"
                    }
                    onClick={() => completeActivity(`video-${activeVideo + 1}`)}
                  >
                    {completedActivities.includes(`video-${activeVideo + 1}`)
                      ? "✓ Video Completed"
                      : "✓ Mark Video Complete"}
                  </button>
                </div>

                <div className="lesson-selector">
                  <h3>Choose Your Lesson</h3>
                  {videos.map((video, index) => (
                    <button
                      key={index}
                      className={activeVideo === index ? "lesson-option active" : "lesson-option"}
                      onClick={() => setActiveVideo(index)}
                    >
                      <span>
                        {completedActivities.includes(`video-${index + 1}`) ? "✓" : "▶"}
                      </span>
                      {video.title}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>No videos are available for this lesson yet.</p>
            )}
          </div>

        </section>

        <section className="learning-section">

          <span className="section-label">STEP 2</span>

          <h2>💬 Learn the Dialogue</h2>

          <p className="section-subtitle">Learn {languageName} dialogue, pronunciation and meaning.</p>

          <div className="dialogue-card">

            {dialogues.map((item, index) => (

              <div className="dialogue-row" key={index}>

                <div className="dialogue-number">{index + 1}</div>

                <div className="dialogue-details">

                  <div className="dialogue-language">{languageLabel}</div>

                  <strong>{isJapanese ? item.japanese : isEnglish ? item.english : item.korean}</strong>

                  <div className="dialogue-pronunciation">{item.pronunciation}</div>

                  <button
                    type="button"
                    className="speak-button"
                    onClick={() =>
                      speakText(isJapanese ? item.japanese : isEnglish ? item.english : item.korean)
                    }
                    aria-label={`Listen to ${isJapanese ? item.japanese : isEnglish ? item.english : item.korean}`}
                  >
                    🔊 Listen
                  </button>

                  <div className="dialogue-meaning">{item.meaning}</div>

                </div>

              </div>

            ))}

          </div>

          <button

            className={completedActivities.includes("dialogue") ? "activity-complete completed" : "activity-complete"}

            onClick={() => completeActivity("dialogue")}

          >

            {completedActivities.includes("dialogue") ? "✓ Dialogue Completed" : "✓ Mark Dialogue Complete"}

          </button>

        </section>

        <section className="learning-section">

          <span className="section-label">STEP 3</span>

          <h2>📚 Vocabulary</h2>

          <p className="section-subtitle">Learn important {languageName} words from the lesson.</p>

          <div className="vocabulary-grid">

            {vocabulary.map((item, index) => (

              <div className="vocabulary-card" key={index}>

                <span className="word-label">{languageLabel}</span>

                <h3>{isJapanese ? item.japanese : isEnglish ? item.english : item.korean}</h3>

                <span className="pronunciation-label">PRONUNCIATION</span>

                <p className="korean-pronunciation">{item.pronunciation}</p>

                <button
                  type="button"
                  className="speak-button"
                  onClick={() =>
                    speakText(isJapanese ? item.japanese : isEnglish ? item.english : item.korean)
                  }
                  aria-label={`Listen to ${isJapanese ? item.japanese : isEnglish ? item.english : item.korean}`}
                >
                  🔊 Listen
                </button>

                <span className="meaning-label">MEANING</span>

                <p className="vocabulary-meaning">{item.meaning}</p>

              </div>

            ))}

          </div>

          <button

            className={completedActivities.includes("vocabulary") ? "activity-complete completed" : "activity-complete"}

            onClick={() => completeActivity("vocabulary")}

          >

            {completedActivities.includes("vocabulary") ? "✓ Vocabulary Completed" : "✓ Mark Vocabulary Complete"}

          </button>

        </section>

        <section className="learning-section">

          <span className="section-label">EXTRA PRACTICE</span>

          <h2>🗣️ Useful Expressions</h2>

          <p className="section-subtitle">Useful {languageName} expressions for everyday conversations.</p>

          <div className="expression-grid">

            {expressions.map((item, index) => (

              <div className="expression-card" key={index}>

                <span className="word-label">{languageLabel}</span>

                <h3>{isJapanese ? item.japanese : isEnglish ? item.english : item.korean}</h3>

                <span className="pronunciation-label">PRONUNCIATION</span>

                <p className="expression-pronunciation">{item.pronunciation}</p>

                <button
                  type="button"
                  className="speak-button"
                  onClick={() =>
                    speakText(isJapanese ? item.japanese : isEnglish ? item.english : item.korean)
                  }
                  aria-label={`Listen to ${isJapanese ? item.japanese : isEnglish ? item.english : item.korean}`}
                >
                  🔊 Listen
                </button>

                <span className="meaning-label">MEANING</span>

                <p className="expression-meaning">{item.meaning}</p>

              </div>

            ))}

          </div>

          <button

            className={completedActivities.includes("expressions") ? "activity-complete completed" : "activity-complete"}

            onClick={() => completeActivity("expressions")}

          >

            {completedActivities.includes("expressions") ? "✓ Expressions Completed" : "✓ Mark Expressions Complete"}

          </button>

        </section>

        <section className="learning-section quiz-section">

          <span className="section-label">STEP 4</span>

          <h2>📝 Quick Quiz</h2>

          <p className="section-subtitle">Test what you learned from this lesson.</p>

          {!quizFinished ? (

            <div className="quiz-card">

              <div className="quiz-top">

                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>

                <span>Score: {score}</span>

              </div>

              <div className="quiz-progress">

                <div

                  className="quiz-progress-fill"

                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}

                />

              </div>

              <h3>{quizQuestions[currentQuestion].question}</h3>

              <div className="quiz-options">

                {quizQuestions[currentQuestion].options.map((option, index) => {

                  let optionClass = "";

                  if (selectedAnswer) {

                    if (option === quizQuestions[currentQuestion].answer) optionClass = "correct";

                    else if (option === selectedAnswer) optionClass = "wrong";

                  }

                  return (

                    <button

                      key={index}

                      className={`quiz-option ${optionClass}`}

                      onClick={() => handleAnswer(option)}

                    >

                      <span>{String.fromCharCode(65 + index)}</span>

                      {option}

                    </button>

                  );

                })}

              </div>

              {selectedAnswer && (

                <div className="quiz-bottom">

                  <p

                    className={selectedAnswer === quizQuestions[currentQuestion].answer ? "quiz-result correct" : "quiz-result wrong"}

                  >

                    {selectedAnswer === quizQuestions[currentQuestion].answer

                      ? "✓ Correct! Great job!"

                      : `✗ The correct answer is ${quizQuestions[currentQuestion].answer}`}

                  </p>

                  <button className="next-question" onClick={nextQuestion}>

                    {currentQuestion < quizQuestions.length - 1 ? "Next Question →" : "Finish Quiz"}

                  </button>

                </div>

              )}

            </div>

          ) : (

            <div className="quiz-complete">

              <div className="quiz-trophy">🏆</div>

              <h3>Quiz Completed!</h3>

              <p>You scored <strong>{score}/{quizQuestions.length}</strong></p>

              <div className="score-percentage">{Math.round((score / quizQuestions.length) * 100)}%</div>

              <button className="next-question" onClick={restartQuiz}>🔄 Try Again</button>

            </div>

          )}

        </section>

        <section className="daily-phrase">

          <span>{isJapanese ? "🌟 DAILY JAPANESE PHRASE" : isEnglish ? "🌟 DAILY ENGLISH PHRASE" : "🌟 DAILY KOREAN PHRASE"}</span>

          <h2>{isJapanese ? "頑張って！" : isEnglish ? "You can do it!" : "화이팅!"}</h2>

          <p>{isJapanese ? "Ganbatte!" : isEnglish ? "You can do it!" : "Hwaiting!"}</p>

          <strong>{isJapanese ? "Do your best! / Good luck!" : isEnglish ? "Keep going! / Good luck!" : "You can do it! / Good luck!"}</strong>

        </section>

        <section className="progress-section">

          <div className="progress-heading">

            <div>

              <span className="section-label">YOUR PROGRESS</span>

              <h2>Keep Learning! 🌟</h2>

            </div>

            <strong>{learningProgress}%</strong>

          </div>

          <div className="progress-bar">

            <div className="progress-fill" style={{ width: `${learningProgress}%` }} />

          </div>

          <p>

            {learningProgress === 0 && "Start your lesson to build your progress."}

            {learningProgress > 0 && learningProgress < 100 && "Great start! Complete the remaining activities to improve your progress."}

            {learningProgress === 100 && "Amazing! You completed the entire lesson! 🎉"}

          </p>

          <div className="progress-steps">

            {[

              ...videos.map((video, index) => [`video-${index + 1}`, `Video ${index + 1}`]),

              ["dialogue", "Dialogue"],

              ["vocabulary", "Vocabulary"],

              ["expressions", "Expressions"],

              ["quiz", "Quiz"]

            ].map(([activity, label], index) => (

              <div

                className={completedActivities.includes(activity) ? "progress-step completed" : "progress-step"}

                key={activity}

              >

                <span>{index + 1}</span>

                <p>{label}</p>

              </div>

            ))}

          </div>

        </section>

        <div className="continue-learning">

          <button onClick={onBack}>← Back to Movies</button>

        </div>

      </main>

    </div>

  );

}

export default LearningPage;
