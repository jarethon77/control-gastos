// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'gastos-db.cvu0gswccfc5.us-east-2.rds.amazonaws.com', 
  user: 'admin',
  password: 'HJA071017.',
  database: 'gastos_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
