const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });
 
const pool = new Pool({
  user: 'postgres',      // Your database username
  host: 'localhost',
  database: 'postgres',  // Your database name
  password: 'Ydidiya@777',  // Your database password
  port: 5432,                // Your database port
});


pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;