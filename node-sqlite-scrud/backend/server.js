const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Lisää path-moduuli
const cors = require('cors');
const app = express();
const port = 3000;

// Käytetään JSON-middlewarea POST-datan käsittelyyn
app.use(express.json());
app.use(cors());

// Palvele staattiset tiedostot public-kansiosta
app.use(express.static(path.join(__dirname, 'public')));

// Yhdistä SQLite-tietokantaan
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Tietokantavirhe:', err.message);
  } else {
    console.log('Yhteys SQLite-tietokantaan onnistui.');
  }
});

// Luo taulu, jos sitä ei ole olemassa
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  age INTEGER
)`);

// Luo uusi käyttäjä (Create)
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Nimi, sähköposti ja ikä vaaditaan' });
  }

  const query = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  db.run(query, [name, email, age], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, age });
  });
});

// Hae kaikki käyttäjät (Read)
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Päivitä käyttäjä (Update)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const query = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
  db.run(query, [name, email, age, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    res.status(200).json({ id, name, email, age });
  });
});

// Poista käyttäjä (Delete)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    res.status(200).json({ message: 'Käyttäjä poistettu' });
  });
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
