const express = require('express');
const cors = require('cors');
const { getConnection } = require('./DB/connection');

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password }); // Log the received request
    let con = await getConnection();
    if (!con) {
        res.status(500).send("Connection Error");
        return;
    }
    try {
        const result = await con.execute(
            `SELECT * FROM LOGIN WHERE login_id = :username AND password = :password`,
            { username, password } 
        );
        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length > 0) {
            console.log("Login Successful");
            res.status(200).send("Login Successful"); // Respond to client

        } else {
            console.log("Login Failed");
            res.status(401).send("Login Failed"); // Respond to client
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                await con.close();
                console.log("Database connection closed.");
            } catch (err) {
                console.error("Error closing database connection: ", err);
            }
        }
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
