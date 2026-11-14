
import React, { useEffect, useState } from "react";
import "./Admin.css";

function Admin({ onBack }) {

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("adminLogin") === "true"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [progress, setProgress] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // ADMIN LOGIN

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@cinelingo.com" &&
      password === "admin123"
    ) {
      sessionStorage.setItem("adminLogin", "true");
      setIsLoggedIn(true);
      setError("");
      setPassword("");
    } else {
      setError("Invalid email or password");
    }
  };

  // ADMIN LOGOUT

  const handleLogout = () => {
    sessionStorage.removeItem("adminLogin");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setActivePage("dashboard");
  };

  // FETCH LEARNING PROGRESS

  useEffect(() => {

    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/admin-progress")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch progress");
        }
        return response.json();
      })
      .then((data) => {
        setProgress(data);
      })
      .catch((error) => {
        console.log("Admin data error:", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [isLoggedIn]);

  // FETCH STUDENT FEEDBACK

  useEffect(() => {

    if (!isLoggedIn) return;

    fetch("http://localhost:5000/admin-feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch feedback");
        }
        return response.json();
      })
      .then((data) => {
        setFeedbackList(data);
      })
      .catch((error) => {
        console.log("Feedback fetch error:", error);
      });

  }, [isLoggedIn]);

  // USERS

  const users = [
    ...new Map(
      progress.map((item) => [
        item.user_id,
        {
          id: item.user_id,
          name: item.name,
          email: item.email
        }
      ])
    ).values()
  ];

  // MOVIES

  const movies = [
    ...new Set(
      progress
        .map((item) => item.movie)
        .filter((movie) => movie)
    )
  ];

  // COMPLETED LEARNING

  const completed = progress.filter(
    (item) => item.overall_status === "Completed"
  ).length;

  // ADMIN LOGIN SCREEN

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">

        <form
          className="admin-login-box"
          onSubmit={handleLogin}
        >

          <div className="admin-logo">
            CineLingo
          </div>

          <p className="admin-label">
            SECURE ADMIN ACCESS
          </p>

          <h1>Admin Login</h1>

          <p className="admin-description">
            Login to access the CineLingo dashboard.
          </p>

          <div className="admin-input-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Login
          </button>

          <button
            type="button"
            className="admin-back-button"
            onClick={onBack}
          >
            Back to CineLingo
          </button>

        </form>

      </div>
    );
  }

  // ADMIN DASHBOARD

  return (
    <div className="admin-page">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          CineLingo
        </div>

        <p className="admin-title">
          ADMIN PANEL
        </p>

        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={activePage === "users" ? "active" : ""}
          onClick={() => setActivePage("users")}
        >
          👥 Users
        </button>

        <button
          className={activePage === "movies" ? "active" : ""}
          onClick={() => setActivePage("movies")}
        >
          🎬 Movies
        </button>

        <button
          className={activePage === "progress" ? "active" : ""}
          onClick={() => setActivePage("progress")}
        >
          📈 Progress
        </button>

        <button
          className={activePage === "feedback" ? "active" : ""}
          onClick={() => setActivePage("feedback")}
        >
          💬 Feedback
        </button>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          🔒 Logout
        </button>

        <button
          className="admin-back"
          onClick={onBack}
        >
          ← Back to CineLingo
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main className="admin-content">

        <div className="admin-header">

          <div>
            <p className="admin-small-title">
              CINELINGO ADMIN
            </p>

            <h1>
              {activePage === "dashboard" && "Dashboard"}
              {activePage === "users" && "Users"}
              {activePage === "movies" && "Movies"}
              {activePage === "progress" && "Learning Progress"}
              {activePage === "feedback" && "Student Feedback"}
            </h1>
          </div>

        </div>

        {loading ? (

          <div className="admin-loading">
            Loading admin data...
          </div>

        ) : (

          <>

            {/* DASHBOARD */}

            {activePage === "dashboard" && (

              <div className="dashboard">

                <div className="stat-container">

                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div>
                      <p>Total Users</p>
                      <h2>{users.length}</h2>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🎬</div>
                    <div>
                      <p>Total Movies</p>
                      <h2>{movies.length}</h2>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div>
                      <p>Learning Records</p>
                      <h2>{progress.length}</h2>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div>
                      <p>Completed</p>
                      <h2>{completed}</h2>
                    </div>
                  </div>

                </div>

                <div className="admin-section">

                  <h2>Recent Learning Progress</h2>

                  {progress.length === 0 ? (

                    <p className="empty-message">
                      No learning progress available yet.
                    </p>

                  ) : (

                    <div className="table-container">

                      <table>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Movie</th>
                            <th>Language</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {progress.slice(0, 8).map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.movie}</td>
                              <td>{item.language}</td>
                              <td>
                                <span
                                  className={
                                    item.overall_status === "Completed"
                                      ? "status completed"
                                      : "status progress"
                                  }
                                >
                                  {item.overall_status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>

                  )}

                </div>

              </div>

            )}

            {/* USERS */}

            {activePage === "users" && (

              <div className="admin-section">

                <h2>Registered Users</h2>

                {users.length === 0 ? (

                  <p className="empty-message">
                    No users found.
                  </p>

                ) : (

                  <div className="table-container">

                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>

                )}

              </div>

            )}

            {/* MOVIES */}

            {activePage === "movies" && (

              <div className="admin-section">

                <h2>Available Movies</h2>

                {movies.length === 0 ? (

                  <p className="empty-message">
                    No movies have learning progress yet.
                  </p>

                ) : (

                  <div className="movie-admin-grid">

                    {movies.map((movie, index) => (
                      <div
                        className="movie-admin-card"
                        key={index}
                      >
                        <div className="movie-admin-icon">
                          🎬
                        </div>

                        <h3>{movie}</h3>

                        <p>Learning content available</p>
                      </div>
                    ))}

                  </div>

                )}

              </div>

            )}

            {/* LEARNING PROGRESS */}

            {activePage === "progress" && (

              <div className="admin-section">

                <h2>Learning Progress</h2>

                {progress.length === 0 ? (

                  <p className="empty-message">
                    No learning progress available.
                  </p>

                ) : (

                  <div className="table-container">

                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Movie</th>
                          <th>Language</th>
                          <th>Videos</th>
                          <th>Vocabulary</th>
                          <th>Expressions</th>
                          <th>Dialogue</th>
                          <th>Quiz</th>
                          <th>Score</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {progress.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.movie}</td>
                            <td>{item.language}</td>

                            <td>
                              {item.videos_completed}/{item.total_videos}
                            </td>

                            <td>
                              {item.vocabulary_completed ? "✓" : "—"}
                            </td>

                            <td>
                              {item.expressions_completed ? "✓" : "—"}
                            </td>

                            <td>
                              {item.dialogue_completed ? "✓" : "—"}
                            </td>

                            <td>
                              {item.quiz_completed ? "✓" : "—"}
                            </td>

                            <td>
                              {item.quiz_score !== null
                                ? item.quiz_score
                                : "—"}
                            </td>

                            <td>
                              <span
                                className={
                                  item.overall_status === "Completed"
                                    ? "status completed"
                                    : "status progress"
                                }
                              >
                                {item.overall_status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>

                )}

              </div>

            )}

            {/* FEEDBACK */}

            {activePage === "feedback" && (

              <div className="admin-section">

                <h2>Student Feedback</h2>

                <p className="feedback-count">
                  Total Feedback: {feedbackList.length}
                </p>

                {feedbackList.length === 0 ? (

                  <p className="empty-message">
                    No feedback submitted yet.
                  </p>

                ) : (

                  <div className="table-container">

                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Feedback</th>
                          <th>Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {feedbackList.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.feedback}</td>
                            <td>
                              {new Date(item.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>

                )}

              </div>

            )}

          </>

        )}

      </main>

    </div>
  );
}

export default Admin;
