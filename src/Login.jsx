import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onBack, onLogin }) {

  const [isSignup, setIsSignup] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        new URLSearchParams({
          email: email,
          password: password
        })
      );

      alert(response.data);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      setEmail("");
      setPassword("");

      if (onLogin) {
        onLogin();
      }

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Cannot connect to the server.");
      }

    }

  };


  const handleSignup = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/register",
        new URLSearchParams({
          name: name,
          email: email,
          password: password
        })
      );

      alert(response.data);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setShowPassword(false);
      setShowConfirmPassword(false);

      setIsSignup(false);

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Cannot connect to the server.");
      }

    }

  };


  return (

    <div className="login-page">

      <div className="login-left">

        <div
          className="login-brand"
          onClick={onBack}
        >
          CineLingo
        </div>

        <div className="login-left-content">

          <p className="login-small-title">
            Learn • Watch • Practice
          </p>

          <h1>
            Learn Languages
            <br />
            Through{" "}
            <span>
              Movies & Dramas
            </span>
          </h1>

          <p>
            Turn your favourite movies
            and dramas into your
            language-learning journey.
          </p>

          <div className="login-features">

            <div>
              <span>🎬</span>
              <p>
                Learn from real movie dialogues
              </p>
            </div>

            <div>
              <span>📖</span>
              <p>
                Build vocabulary from every scene
              </p>
            </div>

            <div>
              <span>🎯</span>
              <p>
                Practice with interactive quizzes
              </p>
            </div>

          </div>

        </div>

      </div>


      <div className="login-right">

        <div className="login-box">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>


          {!isSignup && (

            <>

              <h2>
                Welcome Back!
              </h2>

              <p className="login-description">
                Login to continue your
                language-learning journey.
              </p>

              <form onSubmit={handleLogin}>

                <div className="input-group">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="off"
                  />

                </div>


                <div className="input-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="password-input">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="show-password"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                <button
                  type="submit"
                  className="login-submit"
                >
                  Login
                </button>

              </form>


              <p className="signup-text">

                Don't have an account?

                <button
                  type="button"
                  className="signup-button"
                  onClick={() =>
                    setIsSignup(true)
                  }
                >
                  Sign Up
                </button>

              </p>

            </>

          )}


          {isSignup && (

            <>

              <h2>
                Create Account
              </h2>

              <p className="login-description">
                Start your language-learning
                journey with CineLingo.
              </p>

              <form onSubmit={handleSignup}>

                <div className="input-group">

                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>


                <div className="input-group">

                  <label htmlFor="signup-email">
                    Email
                  </label>

                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="off"
                  />

                </div>


                <div className="input-group">

                  <label htmlFor="signup-password">
                    Password
                  </label>

                  <div className="password-input">

                    <input
                      id="signup-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="show-password"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                <div className="input-group">

                  <label htmlFor="confirm-password">
                    Confirm Password
                  </label>

                  <div className="password-input">

                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="show-password"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                <button
                  type="submit"
                  className="login-submit"
                >
                  Sign Up
                </button>

              </form>


              <p className="signup-text">

                Already have an account?

                <button
                  type="button"
                  className="signup-button"
                  onClick={() =>
                    setIsSignup(false)
                  }
                >
                  Login
                </button>

              </p>

            </>

          )}

        </div>

      </div>

    </div>

  );
}

export default Login;