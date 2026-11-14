
import React, { useState } from "react";
import "./AboutUs.css";

function AboutUs({ onBack }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = (e) => {
    e.preventDefault();
    setFeedbackSent(true);

    setTimeout(() => {
      setFeedbackSent(false);
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="about-page">

      {/* HEADER */}
      <header className="about-header">
        <button
          type="button"
          className="about-back-btn"
          onClick={onBack}
        >
          ← Back to Home
        </button>

        <div className="about-logo">CineLingo</div>
      </header>

      {/* HERO */}
      <section className="about-hero">
        <p className="about-small-title">ABOUT CINELINGO</p>

        <h1>
          Learn Languages
          <br />
          Through <span>Stories.</span>
        </h1>

        <p>
          Discover a fun way to learn languages through movies,
          dramas and real-life conversations.
        </p>

        <div className="hero-tags">
          <span>🎬 Movies</span>
          <span>💬 Conversations</span>
          <span>📚 Vocabulary</span>
        </div>
      </section>

      {/* ABOUT CINELINGO */}
      <section className="about-main">
        <div className="about-main-card">
          <div className="about-big-icon">🎬</div>

          <div>
            <p className="about-small-title">OUR STORY</p>
            <h2>What is CineLingo?</h2>

            <p>
              CineLingo is a movie-based language learning platform
              designed to help learners improve their language skills
              through movies and dramas.
            </p>

            <p>
              Instead of learning only from textbooks, users can
              explore vocabulary, dialogues, pronunciation and
              everyday expressions through entertaining content.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission-section">
        <div className="mission-content">
          <p className="about-small-title">OUR MISSION</p>
          <h2>Making Language Learning More Enjoyable</h2>

          <p>
            We believe learning a new language should be exciting,
            practical and connected to everyday life. Our goal is to
            make learning easier by bringing entertainment and
            education together.
          </p>
        </div>

        <div className="mission-visual">
          <div className="mission-emoji">🌍</div>
          <h3>Learn Beyond the Classroom</h3>
          <p>Explore languages through the stories you love.</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-features">
        <p className="about-small-title">WHAT WE OFFER</p>
        <h2>Learn. Watch. Practice.</h2>

        <div className="about-feature-container">
          <div className="about-feature-card">
            <div className="about-feature-icon">🎬</div>
            <h3>Learn Through Movies</h3>
            <p>
              Learn new words and phrases through movies and dramas
              you enjoy.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">💬</div>
            <h3>Real Conversations</h3>
            <p>
              Understand natural conversations and expressions
              used in everyday situations.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🎯</div>
            <h3>Interactive Practice</h3>
            <p>
              Test your knowledge with vocabulary activities and
              interactive quizzes.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <p className="about-small-title">YOUR LEARNING JOURNEY</p>
        <h2>How CineLingo Works</h2>

        <div className="how-container">
          <div className="how-card">
            <div className="how-number">01</div>
            <div className="how-icon">🌐</div>
            <h3>Choose a Language</h3>
            <p>
              Select the language you want to learn and explore
              available lessons.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">02</div>
            <div className="how-icon">▶️</div>
            <h3>Watch and Learn</h3>
            <p>
              Watch movie-based lessons and discover useful
              vocabulary and expressions.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">03</div>
            <div className="how-icon">✍️</div>
            <h3>Practice and Improve</h3>
            <p>
              Complete activities and quizzes to practise what
              you have learned.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="why-heading">
          <p className="about-small-title">WHY CINELINGO?</p>
          <h2>Learning That Feels Like Entertainment</h2>
          <p>
            Turn your love for movies and dramas into a meaningful
            learning experience.
          </p>
        </div>

        <div className="why-list">
          <div className="why-item">
            <span>✓</span>
            <p>Learn at your own pace</p>
          </div>

          <div className="why-item">
            <span>✓</span>
            <p>Discover practical vocabulary</p>
          </div>

          <div className="why-item">
            <span>✓</span>
            <p>Understand everyday expressions</p>
          </div>

          <div className="why-item">
            <span>✓</span>
            <p>Practise through interactive activities</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta">
        <p className="about-small-title">START YOUR JOURNEY</p>
        <h2>Your Next Language Lesson Starts with a Story.</h2>
        <p>
          Explore, learn and enjoy a new way of discovering languages.
        </p>

        <button type="button" onClick={onBack}>
          Explore CineLingo →
        </button>
      </section>

      {/* CONTACT */}
      <section className="get-in-touch">
        <p className="about-small-title">GET IN TOUCH</p>
        <h2>We'd Love to Hear From You</h2>

        <p className="touch-description">
          Have feedback, questions or suggestions?
          Connect with the CineLingo team.
        </p>

        <div className="contact-container">
          <button
            type="button"
            className="contact-card"
            onClick={() => setShowFeedback(true)}
          >
            <div className="contact-icon">💬</div>
            <h3>Feedback</h3>
            <p>Share your thoughts and suggestions with us.</p>
          </button>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">📸</div>
            <h3>Instagram</h3>
            <p>@cinelingo</p>
          </a>

          <a
            href="mailto:cinelingo@gmail.com"
            className="contact-card"
          >
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>cinelingo@gmail.com</p>
          </a>

          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Contact</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </section>

      {/* FEEDBACK POPUP */}
      {showFeedback && (
        <div className="feedback-overlay">
          <div className="feedback-modal">
            <button
              type="button"
              className="feedback-close"
              onClick={() => setShowFeedback(false)}
            >
              ×
            </button>

            {!feedbackSent ? (
              <>
                <div className="feedback-icon">💗</div>
                <h2>Share Your Feedback</h2>
                <p>Tell us what you think about CineLingo.</p>

                <form onSubmit={handleFeedback}>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                  <label>Feedback</label>
                  <textarea
                    rows="5"
                    placeholder="Write your feedback..."
                    required
                  />

                  <button type="submit" className="feedback-submit">
                    Submit Feedback
                  </button>
                </form>
              </>
            ) : (
              <div className="feedback-success">
                <div className="success-icon">✓</div>
                <h2>Thank You! 💗</h2>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="about-footer">
        <h2>CineLingo</h2>
        <p>Learn Languages Through Movies &amp; Dramas</p>
        <p>📧 cinelingo@gmail.com</p>
        <p>📸 Instagram: @cinelingo</p>
        <p>📞 +91 98765 43210</p>

        <p className="about-copyright">
          © 2026 CineLingo. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default AboutUs;
