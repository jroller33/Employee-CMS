const express = require('express');
const mysql = require('mysql2');
// require sequelize

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',      
    user: 'root',
    password: 'mysqlPass',  // put in .env
    database: 'cms_db'
  },
  console.log(`Connected to the cms_db database.`)
);

// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
