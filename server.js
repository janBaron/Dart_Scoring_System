const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Dart_Scores',
  password: 'postgres',
  port: 5432,
});

// Run db.sql on startup
const pathToSQL = path.join(__dirname, 'db.sql');
const initSQL = fs.readFileSync(pathToSQL, 'utf8').replace(/^﻿/, '');

pool.query(initSQL)
  .then(() => console.log('✅ Tables created or already exist.'))
  .catch(err => {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add new player if not existing
app.post('/api/addPlayer', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required." });

  try {
    const result = await pool.query('SELECT id FROM players WHERE name = $1', [name]);
    if (result.rows.length > 0) {
      return res.json({ success: true, playerId: result.rows[0].id, message: "Player exists" });
    }
    const insert = await pool.query('INSERT INTO players (name) VALUES ($1) RETURNING id', [name]);
    res.json({ success: true, playerId: insert.rows[0].id, message: "Player created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save training data: singles
app.post('/api/training/singles', async (req, res) => {
  const { attempts, averageTries } = req.body;
  if (!attempts || Object.keys(attempts).length !== 20) {
    return res.status(400).json({ error: "Invalid training data." });
  }

  try {
    const columns = Object.keys(attempts).map(t => `"${t}"`).join(", ");
    const values = Object.values(attempts);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const query = `
      INSERT INTO training_singles (${columns}, average_tries)
      VALUES (${placeholders}, $${values.length + 1})
    `;
    await pool.query(query, [...values, averageTries]);
    res.json({ success: true, message: "Training saved." });
  } catch (err) {
    res.status(500).json({ error: "Error saving training data." });
  }
});

// Save training data: doubles
app.post('/api/training/doubles', async (req, res) => {
  const { attempts, averageTries } = req.body;
  if (!attempts || Object.keys(attempts).length !== 20) {
    return res.status(400).json({ error: "Invalid training data." });
  }

  try {
    const columns = Object.keys(attempts).map(t => `"${t}"`).join(", ");
    const values = Object.values(attempts);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const query = `
      INSERT INTO training_doubles (${columns}, average_tries)
      VALUES (${placeholders}, $${values.length + 1})
    `;
    await pool.query(query, [...values, averageTries]);
    res.json({ success: true, message: "Training saved." });
  } catch (err) {
    res.status(500).json({ error: "Error saving training data." });
  }
});

// Save game result
app.post('/api/saveGame', async (req, res) => {
  const { playerName, dartsThrown, scoreStart } = req.body;
  const scoreEnd = 0; 

  if (!playerName || dartsThrown == null) {
    return res.status(400).json({ error: "Missing required data." });
  }

  try {
    await pool.query(
      `INSERT INTO games (player_name, score_start, score_end, darts_thrown)
       VALUES ($1, $2, $3, $4)`,
      [playerName, scoreStart, scoreEnd, dartsThrown]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update player stats
app.post('/api/updateStats', async (req, res) => {
  const { playerName, dartsThrown, checkout, isWin, scoreStart } = req.body;

  if (!playerName || dartsThrown == null || typeof isWin === 'undefined') {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    // Get player ID and name from DB
    const playerRes = await pool.query('SELECT id, name FROM players WHERE name = $1', [playerName]);
    if (playerRes.rows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    const playerId = playerRes.rows[0].id;
    const playerNameDb = playerRes.rows[0].name;

    // Calculate average only for winners
    const avg = isWin ? ((scoreStart || 501) / dartsThrown) * 3 : 0;

    // Check if entry exists
    const result = await pool.query('SELECT * FROM game_stats WHERE player_id = $1', [playerId]);

    if (result.rows.length > 0) {
      const existing = result.rows[0];
      const updatedGames = existing.games_played + 1;
      const updatedWins = isWin ? existing.wins + 1 : existing.wins;
      const updatedLosses = !isWin ? existing.losses + 1 : existing.losses;
      const updatedHighCheckout = Math.max(existing.highest_checkout || 0, checkout || 0);
      const updatedHighAverage = isWin
        ? Math.max(existing.highest_9dart_avg || 0, avg)
        : existing.highest_9dart_avg;

      await pool.query(
        `UPDATE game_stats
         SET games_played = $1,
             wins = $2,
             losses = $3,
             highest_checkout = $4,
             highest_9dart_avg = $5,
             player_name = $6
         WHERE player_id = $7`,
        [updatedGames, updatedWins, updatedLosses, updatedHighCheckout, updatedHighAverage, playerNameDb, playerId]
      );
    } else {
      await pool.query(
        `INSERT INTO game_stats (player_id, player_name, games_played, wins, losses, highest_checkout, highest_9dart_avg)
         VALUES ($1, $2, 1, $3, $4, $5, $6)`,
        [
          playerId,
          playerNameDb,
          isWin ? 1 : 0,
          isWin ? 0 : 1,
          checkout || 0,
          isWin ? avg : 0
        ]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating stats:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get stats pages

app.get('/api/gameStats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        player_name, 
        games_played, 
        wins, 
        losses, 
        highest_checkout, 
        ROUND(highest_9dart_avg, 2) AS highest_9dart_avg
      FROM game_stats
    `);
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load game statistics." });
  }
});

app.get('/api/trainingSingles', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        training_date,
        ${[...Array(20)].map((_, i) => `tries_target_${i + 1}`).join(', ')},
        ROUND(average_tries, 2) AS average_tries
      FROM training_singles
      ORDER BY training_date DESC
      LIMIT 100
    `);
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load training singles." });
  }
});

app.get('/api/trainingDoubles', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        training_date,
        ${[...Array(20)].map((_, i) => `tries_target_${i + 1}`).join(', ')},
        ROUND(average_tries, 2) AS average_tries
      FROM training_doubles
      ORDER BY training_date DESC
      LIMIT 100
    `);
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load training doubles." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
