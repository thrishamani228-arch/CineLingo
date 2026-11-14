
import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import LearningPage from "./LearningPage";
import AboutUs from "./AboutUs";
import Admin from "./Admin";

function App() {
  const [message, setMessage] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const openAdmin = () => {
    setShowAdmin(true);
    setShowLogin(false);
    setSelectedMovie(null);
    setShowAbout(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openLearningPage = (movie) => {
    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      setShowLogin(true);
      setSelectedMovie(null);
      setShowAbout(false);
      setShowAdmin(false);
      return;
    }

    setSelectedMovie(movie);
    setShowLogin(false);
    setShowAbout(false);
    setShowAdmin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");

    setShowLogin(false);
    setSelectedMovie(null);
    setShowAbout(false);
    setShowAdmin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setShowLogin(false);
    setSelectedMovie(null);
    setShowAbout(false);
    setShowAdmin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openLogin = () => {
    setShowLogin(true);
    setSelectedMovie(null);
    setShowAbout(false);
    setShowAdmin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openAbout = () => {
    setShowAbout(true);
    setSelectedMovie(null);
    setShowLogin(false);
    setShowAdmin(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (showAdmin) {
    return (
      <Admin
        onBack={() => {
          setShowAdmin(false);

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      />
    );
  }

  if (showAbout) {
    return (
      <AboutUs
        onBack={() => {
          setShowAbout(false);

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <LearningPage
        movie={selectedMovie}
        onBack={() => {
          setSelectedMovie(null);

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      />
    );
  }

  if (showLogin) {
    return (
      <Login
        onLogin={handleLoginSuccess}
        onBack={() => {
          setShowLogin(false);

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      />
    );
  }

  return (
    <div className="website">

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => scrollToSection("home")}
        >
          CineLingo
        </div>

        <div className="nav-links">

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() =>
              openLearningPage({
                title: "True Beauty",
                language: "Korean",
                genre: "Romance • Comedy • Drama",
                level: "Beginner",
                emoji: "🇰🇷"
              })
            }
          >
            Learn
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={openAbout}
          >
            About Us
          </button>

          {localStorage.getItem("isLoggedIn") === "true" ? (
            <button
              type="button"
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={openLogin}
            >
              Login
            </button>
          )}

        </div>

      </nav>

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="small-title">
            LEARN • WATCH • PRACTICE
          </p>

          <h1>
            Learn Languages
            <br />
            Through <span>Movies & Dramas</span>
          </h1>

          <p className="hero-text">
            Turn your favourite movies and dramas
            into your language-learning journey.
          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="start-btn"
              onClick={() => scrollToSection("languages")}
            >
              Start Learning
            </button>

          </div>

        </div>

        <div className="hero-image">

          <div className="movie-card">

            <img
              src="/Images/hero.jpeg"
              alt="Movies and Dramas"
            />

          </div>

        </div>

      </section>

      <section
        className="languages"
        id="languages"
      >

        <p className="section-small-title">
          EXPLORE
        </p>

        <h2>
          Choose Your Language
        </h2>

        <p className="section-description">
          Start learning a new language through
          the movies you love.
        </p>

        <div className="language-container">

          <div className="language-card">

            <div className="language-icon">
              🇰🇷
            </div>

            <h3>
              Korean
            </h3>

            <p>
              Movies & K-Dramas
            </p>

            <button
              type="button"
              onClick={() =>
                showMessage(
                  "Korean movies and K-Dramas selected!"
                )
              }
            >
              Explore
            </button>

          </div>

          <div className="language-card">

            <div className="language-icon">
              🇬🇧
            </div>

            <h3>
              English
            </h3>

            <p>
              Movies & TV Shows
            </p>

            <button
              type="button"
              onClick={() =>
                showMessage(
                  "English movies and TV shows selected!"
                )
              }
            >
              Explore
            </button>

          </div>

          <div className="language-card">

            <div className="language-icon">
              🇯🇵
            </div>

            <h3>
              Japanese
            </h3>

            <p>
              Anime & Movies
            </p>

            <button
              type="button"
              onClick={() =>
                showMessage(
                  "Japanese anime and movies selected!"
                )
              }
            >
              Explore
            </button>

          </div>

        </div>

      </section>

      <section
        className="how-section"
        id="how"
      >

        <p className="section-small-title">
          HOW IT WORKS
        </p>

        <h2>
          Learn in 3 Simple Steps
        </h2>

        <div className="steps">

          <div className="step">

            <div className="step-icon">
              🎬
            </div>

            <h3>
              Choose
            </h3>

            <p>
              Choose a movie or drama you want
              to learn from.
            </p>

          </div>

          <div className="step">

            <div className="step-icon">
              💬
            </div>

            <h3>
              Learn
            </h3>

            <p>
              Learn useful dialogues, words
              and phrases.
            </p>

          </div>

          <div className="step">

            <div className="step-icon">
              🎯
            </div>

            <h3>
              Practice
            </h3>

            <p>
              Practice your knowledge with
              interactive quizzes.
            </p>

          </div>

        </div>

      </section>

      <section
        className="featured"
        id="featured"
      >

        <p className="section-small-title">
          DISCOVER
        </p>

        <h2>
          Featured Movies & Dramas
        </h2>

        <p className="section-description">
          Start learning from popular movies
          and dramas.
        </p>

        <div className="movie-container">

          <div className="featured-card">

            <div className="poster poster-three">

              <img
                src="/Images/True beauty.jpeg"
                alt="True Beauty"
              />

            </div>

            <div className="movie-info">

              <h3>
                Korean
              </h3>

              <p>
                🇰🇷 Korean • Beginner
              </p>

              <button
                type="button"
                onClick={() =>
                  openLearningPage({
                    title: "True Beauty",
                    language: "Korean",
                    genre: "Romance • Comedy • Drama",
                    level: "Beginner",
                    emoji: "🇰🇷"
                  })
                }
              >
                Learn More
              </button>

            </div>

          </div>

          <div className="featured-card">

            <div className="poster poster-four">

              <img
                src="/Images/jap1.jpeg"
                alt="The Fragrant Flower Blooms with Dignity"
              />

            </div>

            <div className="movie-info">

              <h3>
                Japanese
              </h3>

              <p>
                🇯🇵 Japanese • Beginner
              </p>

              <button
                type="button"
                onClick={() =>
                  openLearningPage({
                    title:
                      "The Fragrant Flower Blooms with Dignity",
                    language: "Japanese",
                    genre: "Romance • School • Drama",
                    level: "Beginner",
                    emoji: "🇯🇵",

                    videos: [
                      {
                        title: "Japanese Lesson 1",
                        description:
                          "Watch the video and learn useful Japanese words and expressions.",
                        videoId: "SBJNyf47B6Y"
                      },
                      {
                        title: "Japanese Lesson 2",
                        description:
                          "Practice Japanese vocabulary and everyday expressions.",
                        videoId: "9_aejVgOUNE"
                      },
                      {
                        title: "Japanese Lesson 3",
                        description:
                          "Learn Japanese through conversations and examples.",
                        videoId: "98d4_TU_qYY"
                      },
                      {
                        title: "Japanese Lesson 4",
                        description:
                          "Improve your Japanese listening and understanding.",
                        videoId: "H94p7KjpDzo"
                      },
                      {
                        title: "Japanese Lesson 5",
                        description:
                          "Learn useful Japanese words and phrases.",
                        videoId: "SL5JGaYdr5A"
                      },
                      {
                        title: "Japanese Lesson 6",
                        description:
                          "Practice Japanese expressions from the lesson.",
                        videoId: "B3z2-izt3wY"
                      },
                      {
                        title: "Japanese Lesson 7",
                        description:
                          "Learn more Japanese vocabulary and conversations.",
                        videoId: "znAnNtbNOg0"
                      },
                      {
                        title: "Japanese Lesson 8",
                        description:
                          "Practice Japanese listening and useful expressions.",
                        videoId: "q9HLtjfG8P4"
                      },
                      {
                        title: "Japanese Lesson 9",
                        description:
                          "Learn Japanese words and phrases through the video.",
                        videoId: "g_j-IgvS0wo"
                      },
                      {
                        title: "Japanese Lesson 10",
                        description:
                          "Practice useful Japanese conversation.",
                        videoId: "PQxlNAyJ-6g"
                      },
                      {
                        title: "Japanese Lesson 11",
                        description:
                          "Learn Japanese vocabulary and pronunciation.",
                        videoId: "Izv7aQcxtNc"
                      },
                      {
                        title: "Japanese Lesson 12",
                        description:
                          "Practice common Japanese sentences and expressions.",
                        videoId: "4afYM1MhjJ8"
                      },
                      {
                        title: "Japanese Lesson 13",
                        description:
                          "Improve your Japanese listening skills.",
                        videoId: "j2DbGW7zWac"
                      },
                      {
                        title: "Japanese Lesson 14",
                        description:
                          "Learn Japanese through useful conversations.",
                        videoId: "xQXySBUuYxE"
                      },
                      {
                        title: "Japanese Lesson 15",
                        description:
                          "Practice Japanese vocabulary and everyday phrases.",
                        videoId: "FI3Ild980DI"
                      },
                      {
                        title: "Japanese Lesson 16",
                        description:
                          "Learn more Japanese expressions and conversations.",
                        videoId: "PuWUhwIgHTo"
                      },
                      {
                        title: "Japanese Lesson 17",
                        description:
                          "Practice Japanese listening and pronunciation.",
                        videoId: "tZe1VEcx3Eg"
                      },
                      {
                        title: "Japanese Lesson 18",
                        description:
                          "Learn useful Japanese words and expressions.",
                        videoId: "UPELPXtUtOw"
                      },
                      {
                        title: "Japanese Lesson 19",
                        description:
                          "Practice Japanese conversations and vocabulary.",
                        videoId: "Cb8BXm9ZDO4"
                      },
                      {
                        title: "Japanese Lesson 20",
                        description:
                          "Review Japanese words, phrases and conversations.",
                        videoId: "mbCCx2XSOrM"
                      },
                      {
                        title: "Japanese Lesson 21",
                        description:
                          "Review useful Japanese expressions and listening.",
                        videoId: "somEzKcCDVE"
                      }
                    ]
                  })
                }
              >
                Learn More
              </button>

            </div>

          </div>

          <div className="featured-card">

            <div className="poster poster-five">

              <img
                src="/Images/eng2.jpeg"
                alt="Elemental"
              />

            </div>

            <div className="movie-info">

              <h3>
                English
              </h3>

              <p>
                🇬🇧 English • Beginner
              </p>

              <button
                type="button"
                onClick={() =>
                  openLearningPage({
                    title: "Elemental",
                    language: "English",
                    genre: "Animation • Romance • Fantasy",
                    level: "Beginner",
                    emoji: "🇬🇧",

                    videos: [
                      {
                        title: "English Lesson 1",
                        description:
                          "Watch the video and learn useful English words and expressions.",
                        videoId: "0zbPeoZzcPg"
                      },
                      {
                        title: "English Lesson 2",
                        description:
                          "Practice English vocabulary and everyday expressions.",
                        videoId: "aU58RGC4IKw"
                      },
                      {
                        title: "English Lesson 3",
                        description:
                          "Learn English through conversations and examples.",
                        videoId: "oXsGIcz3LOA"
                      },
                      {
                        title: "English Lesson 4",
                        description:
                          "Improve your English listening and understanding.",
                        videoId: "Ruy5jsEQrVA"
                      },
                      {
                        title: "English Lesson 5",
                        description:
                          "Learn useful English words and phrases.",
                        videoId: "TswCNV6meYM"
                      },
                      {
                        title: "English Lesson 6",
                        description:
                          "Practice English expressions from the lesson.",
                        videoId: "xZIh2so3-AU"
                      },
                      {
                        title: "English Lesson 7",
                        description:
                          "Learn more English vocabulary and conversations.",
                        videoId: "oFUjih69vcI"
                      },
                      {
                        title: "English Lesson 8",
                        description:
                          "Practice English listening and useful expressions.",
                        videoId: "r_vbkAnwXm8"
                      },
                      {
                        title: "English Lesson 9",
                        description:
                          "Learn English words and phrases through the video.",
                        videoId: "j-3TJrph4j4"
                      },
                      {
                        title: "English Lesson 10",
                        description:
                          "Practice useful English conversation.",
                        videoId: "BJ2VqM1V_hQ"
                      },
                      {
                        title: "English Lesson 11",
                        description:
                          "Learn English vocabulary and pronunciation.",
                        videoId: "5AMGLvROqsg"
                      },
                      {
                        title: "English Lesson 12",
                        description:
                          "Review useful English expressions and listening.",
                        videoId: "S0kfnpgY-Gs"
                      }
                    ]
                  })
                }
              >
                Learn More
              </button>

            </div>

          </div>

        </div>

      </section>

      <section
        className="why-section"
        id="learning"
      >

        <p className="section-small-title">
          WHY CINELINGO?
        </p>

        <h2>
          Learn Beyond the Classroom
        </h2>

        <div className="features">

          <div className="feature">

            <div>
              🎬
            </div>

            <h3>
              Real Dialogues
            </h3>

            <p>
              Learn language through real movie
              and drama conversations.
            </p>

          </div>

          <div className="feature">

            <div>
              📖
            </div>

            <h3>
              Vocabulary
            </h3>

            <p>
              Understand useful words and
              phrases from every scene.
            </p>

          </div>

          <div className="feature">

            <div>
              🎯
            </div>

            <h3>
              Interactive Quizzes
            </h3>

            <p>
              Test what you have learned through
              simple quizzes.
            </p>

          </div>

        </div>

      </section>

      <footer>

        <div
          className="footer-logo"
          onClick={() => scrollToSection("home")}
        >
          CineLingo
        </div>

        <p>
          Learn Languages Through Movies & Dramas
        </p>

        <div className="footer-links">

          <button
            type="button"
            className="footer-about-btn"
            onClick={openAbout}
          >
            About Us
          </button>

          <button
            type="button"
            className="footer-link-btn"
            onClick={openAdmin}
          >
            Admin
          </button>

          <button
            type="button"
            className="footer-link-btn"
            onClick={() =>
              showMessage("Contact page coming soon!")
            }
          >
            Contact
          </button>

        </div>

        <p className="copyright">
          © 2026 CineLingo. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;
