const oracle = require("oracledb");
oracle.outFormat = oracle.OUT_FORMAT_OBJECT;

let connection;

async function initializeConnection() {
  try {
    connection = await oracle.getConnection({
      user: "ADMIN",
      password: "admin",
      connectString: "Tone:1521/orclpdb",
    });
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}



async function getConnection() { 
  if (!connection) {
    await initializeConnection();
  }
  return connection;
}

module.exports = { getConnection };