import React, { useState } from "react";
import "./MyLearning.css";

function MyLearning({ onBack, onContinue }) {

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const trueBeauty = {
    title: "True Beauty",
    language: "Korean",
    genre: "Romance • Comedy • Drama",
    level: "Beginner",
    emoji: "🇰🇷"
  };

  const businessProposal = {
    title: "Business Proposal",
    language: "Korean",
    genre: "Romance • Comedy • Drama",
    level: "Beginner",
    emoji: "🇰🇷"
  };

  return (

    <div className="my-learning-page">

      {}

      <header className="my-learning-header">

        <button
          type="button"
          className="back-home-btn"
          onClick={onBack}
        >
          ← Home
        </button>

        <div className="my-learning-logo">
          CineLingo
        </div>

      </header>

      {}

      <section className="my-learning-title">

        <p>MY LEARNING</p>

        <h1>
          Welcome Back! 👋
        </h1>

        <span>
          Continue your language-learning journey
          through movies and dramas.
        </span>

      </section>

      {}

      <section className="continue-learning-card">

        <div className="continue-movie-poster">
          🇰🇷
        </div>

        <div className="continue-movie-content">

          <p className="card-label">
            CONTINUE LEARNING
          </p>

          <h2>
            True Beauty
          </h2>

          <p className="movie-language">
            Korean • Beginner
          </p>

        <div className="main-progress">

            <div className="main-progress-bar">

              <div className="main-progress-fill"></div>

            </div>

            <span>
              80%
            </span>

          </div>

          <button
            type="button"
            className="continue-btn"
            onClick={() => onContinue(trueBeauty)}
          >
            Continue Learning
          </button>

        </div>

      </section>

      {}
      <section className="progress-section">

        <div className="section-title">

          <p>
            MY PROGRESS
          </p>

          <h2>
            Your Learning Progress
          </h2>

        </div>

        <div className="progress-cards">

          <div className="progress-card">

            <div className="progress-icon">
              🎬
            </div>

            <h3>
              2
            </h3>

            <span>
              Movies Started
            </span>

          </div>

          <div className="progress-card">

            <div className="progress-icon">
              📚
            </div>

            <h3>
              42
            </h3>

            <span>
              Words Learned
            </span>

          </div>

          <div className="progress-card">

            <div className="progress-icon">
              📝
            </div>

            <h3>
              5
            </h3>

            <span>
              Quizzes Completed
            </span>

          </div>

          <div className="progress-card">

            <div className="progress-icon">
              ⭐
            </div>

            <h3>
              86%
            </h3>

            <span>
              Average Score
            </span>

          </div>

        </div>


        {}

        <div className="overall-progress">

          <div className="overall-progress-heading">

            <div>

              <h3>
                Overall Learning Progress
              </h3>

              <p>
                Keep going! You're doing great.
              </p>

            </div>

            <strong>
              80%
            </strong>

          </div>


          <div className="overall-bar">

            <div className="overall-fill"></div>

          </div>

        </div>

      </section>
      {}
      <section className="my-movies-section">

        <div className="section-title">

          <p>
            MY MOVIES
          </p>

          <h2>
            Movies You're Learning
          </h2>

        </div>


        <div className="my-movies-grid">


          {}

          <div className="my-movie-card">

            <div className="movie-card-poster">
              🇰🇷
            </div>

            <div className="my-movie-content">

              <h3>
                True Beauty
              </h3>

              <p>
                Korean • Beginner
              </p>

              <div className="movie-progress">

                <div className="movie-progress-fill true-beauty"></div>

              </div>

              <span>
                8 / 10 lessons
              </span>

              <button
                type="button"
                onClick={() => onContinue(trueBeauty)}
              >
                Continue
              </button>

            </div>

          </div>

          {}

          <div className="my-movie-card">

            <div className="movie-card-poster">
              🇰🇷
            </div>

            <div className="my-movie-content">

              <h3>
                Business Proposal
              </h3>

              <p>
                Korean • Beginner
              </p>

              <div className="movie-progress">

                <div className="movie-progress-fill business-proposal"></div>

              </div>

              <span>
                5 / 10 lessons
              </span>

              <button
                type="button"
                onClick={() => onContinue(businessProposal)}
              >
                Continue
              </button>

            </div>

          </div>

        </div>

      </section>


      {}

      <section className="recent-section">

        <div className="section-title">

          <p>
            RECENTLY LEARNED
          </p>

          <h2>
            Your Recent Activities
          </h2>

        </div>


        <div className="recent-list">


          <div className="recent-item">

            <div className="recent-icon">
              💬
            </div>

            <div>

              <h3>
                True Beauty — Dialogue 3
              </h3>

              <p>
                Korean dialogue lesson completed
              </p>

            </div>

            <span className="completed">
              ✓ Completed
            </span>

          </div>


          <div className="recent-item">

            <div className="recent-icon">
              📚
            </div>

            <div>

              <h3>
                True Beauty — Vocabulary
              </h3>

              <p>
                8 new Korean words learned
              </p>

            </div>

            <span className="completed">
              ✓ Completed
            </span>

          </div>


          <div className="recent-item">

            <div className="recent-icon">
              📝
            </div>

            <div>

              <h3>
                Business Proposal — Quiz 1
              </h3>

              <p>
                Score: 90%
              </p>

            </div>

            <span className="completed">
              ✓ Completed
            </span>

          </div>

        </div>

      </section>


      {}

      <section className="vocabulary-section">

        <div className="section-title">

          <p>
            VOCABULARY
          </p>

          <h2>
            Words You've Learned
          </h2>

        </div>


        <div className="vocabulary-grid">


          <div className="word-card">

            <strong>
              친구
            </strong>

            <span>
              Friend
            </span>

          </div>


          <div className="word-card">

            <strong>
              오늘
            </strong>

            <span>
              Today
            </span>

          </div>


          <div className="word-card">

            <strong>
              학교
            </strong>

            <span>
              School
            </span>

          </div>


          <div className="word-card">

            <strong>
              좋아요
            </strong>

            <span>
              Good / I like it
            </span>

          </div>

        </div>


        <button
          type="button"
          className="review-btn"
        >
          Review Vocabulary
        </button>

      </section>


      {}

      <section className="achievements-section">

        <div className="section-title">

          <p>
            ACHIEVEMENTS
          </p>

          <h2>
            Your Achievements 🏆
          </h2>

        </div>


        <div className="achievement-grid">


          <div className="achievement-card">

            <div>
              🌱
            </div>

            <h3>
              First Lesson
            </h3>

            <p>
              Completed your first lesson
            </p>

          </div>


          <div className="achievement-card">

            <div>
              📚
            </div>

            <h3>
              25 Words
            </h3>

            <p>
              Learned 25 new words
            </p>

          </div>


          <div className="achievement-card">

            <div>
              🎯
            </div>

            <h3>
              First Quiz
            </h3>

            <p>
              Completed your first quiz
            </p>

          </div>

        </div>

      </section>


      {}

      <section className="my-learning-quiz">

        <p className="quiz-label">
          QUICK QUIZ
        </p>

        <h2>
          Test What You Learned 📝
        </h2>

        <p className="quiz-subtitle">
          Let's see how much you remember.
        </p>


        <div className="quiz-card">

          <h3>
            What does "친구" mean?
          </h3>


          <div className="quiz-options">


            <button
              type="button"
              className={
                selectedAnswer === "School"
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => handleAnswer("School")}
            >
              A. School
            </button>


            <button
              type="button"
              className={
                selectedAnswer === "Friend"
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => handleAnswer("Friend")}
            >
              B. Friend
            </button>


            <button
              type="button"
              className={
                selectedAnswer === "Today"
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => handleAnswer("Today")}
            >
              C. Today
            </button>


            <button
              type="button"
              className={
                selectedAnswer === "Thank You"
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => handleAnswer("Thank You")}
            >
              D. Thank You
            </button>

          </div>


          {selectedAnswer && (

            <div
              className={
                selectedAnswer === "Friend"
                  ? "quiz-result correct"
                  : "quiz-result wrong"
              }
            >

              {selectedAnswer === "Friend"
                ? "✓ Correct! 친구 means Friend."
                : "✗ Not quite. 친구 means Friend."}

            </div>

          )}

        </div>

      </section>

      {}

      <footer className="my-learning-footer">

        <button
          type="button"
          onClick={onBack}
        >
          ← Back to Home
        </button>

      </footer>

    </div>

  );
}

export default MyLearning;