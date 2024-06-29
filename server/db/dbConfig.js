const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
//   ssl: {
//     rejectUnauthorized: false  // Allows connections to a server with an invalid SSL certificate for testing purposes only
//   }
// });
 
const pool = new Pool({
  user: 'postgres',      // Your database username
  host: 'localhost',
  database: 'postgres',  // Your database name
  password: 'Brookspsql1996',  // Your database password
  port: 5432,                // Your database port
});


pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;