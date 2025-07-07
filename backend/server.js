// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para guardar un gasto
app.post('/gastos', (req, res) => {
  const { descripcion, monto, categoria, fecha } = req.body;
  const query = 'INSERT INTO gastos (descripcion, monto, categoria, fecha) VALUES (?, ?, ?, ?)';
  db.query(query, [descripcion, monto, categoria, fecha], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Gasto registrado con éxito');
  });
});

// Ruta para obtener todos los gastos
app.get('/gastos', (req, res) => {
  db.query('SELECT * FROM gastos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Servidor backend en puerto 3001');
});
