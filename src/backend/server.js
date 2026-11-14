const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cinelingo"
});

db.connect((err) => {

    if (err) {

        console.log("MySQL connection failed");
        console.log(err);

    } else {

        console.log("MySQL connected successfully");

    }

});

app.get("/", (req, res) => {

    res.send("CineLingo Backend is Running");

});


app.post("/register", (req, res) => {

    console.log("Register request received");

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log("Name:", name);
    console.log("Email:", email);

    const checkEmail =
        "SELECT * FROM users WHERE email = ?";

    db.query(
        checkEmail,
        [email],
        (err, results) => {

            if (err) {

                console.log("Email check error:");
                console.log(err);

                return res.status(500).send(
                    "Database error"
                );

            }

            if (results.length > 0) {

                console.log(
                    "Email already exists"
                );

                return res.status(409).send(
                    "Email already registered"
                );

            }

            const sql =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(
                sql,
                [name, email, password],
                (err, result) => {

                    if (err) {

                        console.log(
                            "Registration database error:"
                        );

                        console.log(err);

                        return res.status(500).send(
                            "Registration failed"
                        );

                    }

                    console.log(
                        "User added successfully"
                    );

                    res.send(
                        "Registration successful"
                    );

                }
            );

        }
    );

});


app.post("/login", (req, res) => {

    console.log("Login request received");

    const email = req.body.email;
    const password = req.body.password;

    console.log("Email:", email);

    const sql =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(
        sql,
        [email, password],
        (err, results) => {

            if (err) {

                console.log(
                    "Login database error:"
                );

                console.log(err);

                return res.status(500).send(
                    "Login failed"
                );

            }

            if (results.length === 0) {

                console.log(
                    "Invalid email or password"
                );

                return res.status(401).send(
                    "Invalid email or password"
                );

            }

            console.log(
                "Login successful"
            );

            res.send(
                "Login successful"
            );

        }
    );

});



app.post("/learning-progress", (req, res) => {

    console.log(
        "Learning progress request received"
    );

    const email = req.body.email;
    const movie = req.body.movie;
    const language = req.body.language;
    const activity = req.body.activity;
    const completed = req.body.completed || 1;

    const quizScore =
        req.body.quiz_score === ""
            ? null
            : req.body.quiz_score;

    if (
        !email ||
        !movie ||
        !language ||
        !activity
    ) {

        return res.status(400).send(
            "Missing progress information"
        );

    }

    const findUser =
        "SELECT id FROM users WHERE email = ?";

    db.query(
        findUser,
        [email],
        (err, users) => {

            if (err) {

                console.log(
                    "User lookup error:"
                );

                console.log(err);

                return res.status(500).send(
                    "Database error"
                );

            }

            if (users.length === 0) {

                return res.status(404).send(
                    "User not found"
                );

            }

            const userId = users[0].id;

            const sql = `
                INSERT INTO learning_progress
                (
                    user_id,
                    movie,
                    language,
                    activity,
                    completed,
                    quiz_score
                )
                VALUES (?, ?, ?, ?, ?, ?)

                ON DUPLICATE KEY UPDATE

                    completed = VALUES(completed),

                    quiz_score =
                        CASE
                            WHEN VALUES(quiz_score) IS NOT NULL
                            THEN VALUES(quiz_score)
                            ELSE quiz_score
                        END
            `;

            db.query(
                sql,
                [
                    userId,
                    movie,
                    language,
                    activity,
                    completed,
                    quizScore
                ],
                (err, result) => {

                    if (err) {

                        console.log(
                            "Progress save error:"
                        );

                        console.log(err);

                        return res.status(500).send(
                            "Progress save failed"
                        );

                    }

                    console.log(
                        "Progress saved successfully"
                    );

                    res.send(
                        "Progress saved successfully"
                    );

                }
            );

        }
    );

});



app.post("/get-learning-progress", (req, res) => {

    const email = req.body.email;
    const movie = req.body.movie;
    const language = req.body.language;

    if (
        !email ||
        !movie ||
        !language
    ) {

        return res.status(400).send(
            "Missing progress information"
        );

    }

    const sql = `
        SELECT
            lp.activity,
            lp.completed,
            lp.quiz_score,
            lp.completed_at

        FROM learning_progress lp

        INNER JOIN users u
            ON lp.user_id = u.id

        WHERE
            u.email = ?
            AND lp.movie = ?
            AND lp.language = ?

        ORDER BY lp.id ASC
    `;

    db.query(
        sql,
        [
            email,
            movie,
            language
        ],
        (err, results) => {

            if (err) {

                console.log(
                    "Get progress error:"
                );

                console.log(err);

                return res.status(500).send(
                    "Could not get progress"
                );

            }

            res.json(results);

        }
    );

});



app.get("/admin-progress", (req, res) => {

    console.log(
        "Admin progress request received"
    );

    const sql = `
        SELECT
            u.id AS user_id,
            u.name,
            u.email,
            lp.movie,
            lp.language,
            lp.activity,
            lp.completed,
            lp.quiz_score,
            lp.completed_at

        FROM users u

        LEFT JOIN learning_progress lp
            ON u.id = lp.user_id

        ORDER BY
            u.name ASC,
            lp.movie ASC,
            lp.language ASC,
            lp.id ASC
    `;

    db.query(
        sql,
        (err, results) => {

            if (err) {

                console.log(
                    "Admin progress error:"
                );

                console.log(err);

                return res.status(500).send(
                    "Could not load admin progress"
                );

            }

           

            const videoCounts = {

                "The Fragrant Flower Blooms with Dignity": 21,

                "Elemental": 12,

                "True Beauty": 1

            };


        

            const progressMap = {};


            results.forEach((row) => {

                const key =
                    `${row.user_id}-${row.movie}-${row.language}`;


                if (!progressMap[key]) {

                    progressMap[key] = {

                        user_id: row.user_id,

                        name: row.name,

                        email: row.email,

                        movie: row.movie,

                        language: row.language,

                        videos_completed: 0,

                        total_videos:
                            videoCounts[row.movie] || 0,

                        vocabulary_completed: false,

                        expressions_completed: false,

                        dialogue_completed: false,

                        quiz_completed: false,

                        quiz_score: null,

                        completed_at: null

                    };

                }


                if (
                    row.activity &&
                    row.completed == 1
                ) {

                    if (
                        row.activity
                            .toLowerCase()
                            .startsWith("video")
                    ) {

                        progressMap[key]
                            .videos_completed++;

                    }


                  

                    if (
                        row.activity
                            .toLowerCase() ===
                        "vocabulary"
                    ) {

                        progressMap[key]
                            .vocabulary_completed = true;

                    }



                    if (
                        row.activity
                            .toLowerCase() ===
                        "expressions"
                    ) {

                        progressMap[key]
                            .expressions_completed = true;

                    }



                    if (
                        row.activity
                            .toLowerCase() ===
                        "dialogue"
                    ) {

                        progressMap[key]
                            .dialogue_completed = true;

                    }


                 

                    if (
                        row.activity
                            .toLowerCase() ===
                        "quiz"
                    ) {

                        progressMap[key]
                            .quiz_completed = true;

                    }

                }


             
                if (
                    row.quiz_score !== null
                ) {

                    progressMap[key]
                        .quiz_score =
                        row.quiz_score;

                }



                if (
                    row.completed_at
                ) {

                    progressMap[key]
                        .completed_at =
                        row.completed_at;

                }

            });


           

            const progress =
                Object.values(progressMap);


            progress.forEach((user) => {

                const videosComplete =
                    user.total_videos > 0 &&
                    user.videos_completed >=
                    user.total_videos;

                const activitiesComplete =
                    user.vocabulary_completed &&
                    user.expressions_completed &&
                    user.dialogue_completed &&
                    user.quiz_completed;

                if (
                    videosComplete &&
                    activitiesComplete
                ) {

                    user.overall_status =
                        "Completed";

                } else {

                    user.overall_status =
                        "In Progress";

                }

            });


            res.json(progress);

        }
    );

});

// GET ALL FEEDBACK FOR ADMIN
app.get("/admin-feedback", (req, res) => {

    const sql = `
        SELECT * FROM feedback
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("Feedback fetch error:", err);

            return res.status(500).json({
                message: "Unable to fetch feedback"
            });
        }

        res.json(result);

    });

});


app.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );

});