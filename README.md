# 🎯 Dart Scoring System

A web-based dart scoring application for **multiplayer 501 and 301 games** as well as **training modes** ("Around the Clock Singles & Doubles"). Built with **Node.js**, **Express**, **PostgreSQL**, and **Vanilla JS**, this project tracks all game and training data and provides statistics for each player.

---

## 🎥 Demo Video

See the Dart Scoring System in action:

[![Watch the video](https://img.youtube.com/vi/XPSroIYUkwc/hqdefault.jpg)](https://www.youtube.com/watch?v=XPSroIYUkwc)

---

## 📦 Features

- Multiplayer support for 501 and 301 dart games
- Training modes:
  - Around the Clock: Singles (targets 1–20)
  - Around the Clock: Doubles (double targets 1–20)
- Real-time scoring and checkout suggestions
- Automatic game state tracking and undo function
- Persistent statistics storage (PostgreSQL)
- Visual statistics and sortable tables
- Training performance graph (Chart.js)

---

## 🧑‍💻 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS (Bootstrap), Vanilla JavaScript
- **Visualization:** Chart.js

---

## 🚀 Setup & Installation

### 1. Clone this Repository

```bash
git clone https://github.com/janBaron/Dart_Scoring_System.git
cd Dart_Scoring_System
```

### 2. Install Node.js Dependencies

Make sure you have Node.js installed. Then run:

```bash
npm install
```

### 3. Setup PostgreSQL

- Ensure PostgreSQL is installed and running on your machine.
- Create a database named `Dart_Scores`:

```sql
CREATE DATABASE "Dart_Scores";
```

- Optionally: Use **pgAdmin** to visualize and manage the database.

> The `db.sql` file will automatically initialize tables when the server starts.

### 4. Configure Database Connection

Update your `server.js` file if needed (e.g., password or port):

```js
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Dart_Scores',
  password: 'your_postgres_password',
  port: 5432,
});
```

### 5. Start the Server

```bash
node server.js
```

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 📝 Usage

1. Add players via the input field and press Enter.
2. Choose a mode from the **“Change Mode”** dropdown:
   - 501 / 301: Standard games
   - Around the Clock (Singles/Doubles): Training mode
3. Use the dartboard buttons to enter scores.
4. “Double” and “Triple” buttons apply multipliers.
5. “OUT” marks a checkout attempt.
6. “Undo” reverts the last throw.
7. Use **“Show Statistics”** to view game or training history.

---

## 📊 Stats & Tracking

- Player stats are tracked automatically (wins, losses, checkouts, 9-dart average).
- Training sessions save average tries and per-target attempts.
- All data is stored in PostgreSQL and visualized on dedicated stats pages.

---

## 🛠 Development Notes

- If you modify the schema via pgAdmin, update `db.sql` accordingly.
- To auto-launch the app on double-click (Windows), create a `.bat` file:

```bat
@echo off
cd path\to\your\project
start cmd /k "node server.js"
start http://localhost:3000
```

---

## 📁 Folder Structure

```
dart-scoring-system/
│
├── public/  # Frontend HTML, CSS, JS
│   ├── themes/     
│   ├── index.html
│   ├── stats_game.html
│   ├── stats_singles.html
│   ├── stats_doubles.html
│   ├── index.js
│   └── themechanger.js
│
├── db.sql                # PostgreSQL schema
├── server.js             # Express backend
├── package.json
└── README.md
```

---

## 🙌 Author

Developed with passion by **[Jan Baron]**

---

## 🧠 To Do (optional)

- Add user authentication
- Expand training modes
- Add mobile responsiveness
- Add leaderboard view

---

## 📜 License

This project is open source and free to use under the [MIT License](LICENSE).
