# CineLingo – Learn Languages Through Movies

**CineLingo** is a movie-based language learning web application that helps users learn new languages through movie and drama video lessons.

The platform makes language learning more interesting by combining entertainment with educational content.

## Features

- **User Registration and Login** – Users can create an account and log in.
- **Video-Based Learning** – Learn languages through movie and drama lessons.
- **Multiple Languages** – Explore Korean, English, and Japanese learning content.
- **Learning Progress Tracking** – Save and track learning activities.
- **Admin Dashboard** – View user learning progress.
- **Feedback System** – Users can submit feedback.
- **About Us Page** – Learn more about the CineLingo platform.

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- MySQL
- mysql2
- CORS

## Project Structure

```text
CineLingo/
│
├── public/
│
├── src/
│   ├── backend/
│   │   └── server.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── Login.jsx
│   ├── Login.css
│   ├── LearningPage.jsx
│   ├── LearningPage.css
│   ├── AboutUs.jsx
│   ├── AboutUs.css
│   ├── Admin.jsx
│   └── Admin.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thrishamani228-arch/CineLingo.git
```

### 2. Open the Project Folder

```bash
cd CineLingo
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure MySQL

- Install and start MySQL.
- Create the database named `cinelingo`.
- Create the required database tables.
- Configure the database connection in `src/backend/server.js`.

### 5. Start the Backend

```bash
node src/backend/server.js
```

### 6. Start the Frontend

Open another terminal in the project folder and run:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access CineLingo.

## Project Objective

The main objective of CineLingo is to make language learning enjoyable and accessible through movie and drama-based educational content.

## Developer

**Thrisha**

BCA Student

## Project Type

Academic Web Development Project
