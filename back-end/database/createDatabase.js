const sqlite3 = require("sqlite3").verbose();

const errorFunction = (error, message) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(message);
};

const database = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  (err) => errorFunction(err, "Connected Successfully")
);

const query = `CREATE TABLE IF NOT EXISTS events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT NOT NULL,
	data_inicio TEXT NOT NULL,
	data_fim TEXT,
  horario_inicio TEXT NOT NULL,
  horario_fim TEXT NOT NULL
);`;

database.run(query, (err) => errorFunction(err, "Table created successfully"));

database.close((err) => errorFunction(err, "Database Closed Successfully"));
