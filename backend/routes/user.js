const express = require('express');
const router = express.Router();  // Using router instead of app
const { getConnection } = require('../DB/connection'); // adjust the path if necessary

// User Registration
router.post('/registration/user', async (req, res) => {
    const { username, password, name, dob, email, city, street, house, phone, genres } = req.body;
    console.log('Received user registration request:', { username, password, name, dob, email, city, street, house, phone, genres });

    const user_id = generateUserId(username);
    console.log('Generated User ID:', user_id);
    const login_id = generateLoginId(username, password); // Login ID is generated here in Node.js
    console.log('Generated Login ID:', login_id);

    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        // Define bind parameters for calling the stored procedure
        const bindParams = {
            p_username: username,
            p_password: password,
            p_name: name,
            p_dob: dob,
            p_email: email,
            p_city: city,
            p_street: street,
            p_house: house,
            p_phone: phone,
            p_genres: genres.join(','),
            p_login_id: login_id,  // Pass the generated login_id as an input parameter
            p_user_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        };

        // Call the stored procedure using a cursor
        const result = await con.execute(
            `BEGIN 
                RegisterUser(
                    :p_username, :p_password, :p_name, TO_DATE(:p_dob, 'YYYY-MM-DD'), :p_email, :p_city, :p_street, :p_house, :p_phone, 
                    :p_genres, :p_login_id, :p_user_id
                );
                END;`,
            bindParams
        );

        const userId = result.outBinds.p_user_id;
        console.log(`User registered with User ID: ${userId} and Login ID: ${login_id}`);

        // Respond with success
        res.status(201).send("User registered successfully");

        // Commit the transaction
        await con.commit();
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                console.error("Error closing database connection: ", err);
            }
        }
    }
});

// Check if Username Exists
router.post('/registration/user/check-username', async (req, res) => {
    const { username } = req.body;
    console.log('Received username check request:', username);

    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        console.log('Checking username availability:', username);

        const checkUserResult = await con.execute(
            `SELECT COUNT(*) AS count FROM USERS WHERE USER_NAME = :username`,
            { username }
        );
        console.log('Query Result: ${JSON.stringify(checkUserResult.rows)}');

        const userCount = checkUserResult.rows[0].COUNT;

        console.log('User Count:', userCount);

        if (userCount > 0) {
            res.status(409).send("Username already exists");
        } else {
            res.status(200).send("Username available");
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                console.error("Error closing connection: ", err);
            }
        }
    }
});

// User Login
router.post('/login/user', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password }); // Log the received request
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await con.execute(
            `SELECT USER_NAME, PASSWORD, USER_ID as "user_id" 
            FROM LOGIN JOIN USERS ON LOGIN.ID = USERS.USER_ID
            WHERE USER_NAME = :username AND PASSWORD = :password`,
            { username, password } // Named bind variables
        );
        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            //send the full user data to the client
            res.status(200).send(result.rows[0]); // Respond to client
        } else {
            console.log("Invalid Credentials");
            res.status(401).send("Invalid Credentials"); // Respond to client
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                console.error("Error closing database connection: ", err);
            }
        }
    }
});

// User Profile
router.post('/profile/user', async (req, res) => {
    // Logic for fetching user profile
});

module.exports = router;  // Export the router
