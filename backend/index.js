const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const { getConnection } = require('./DB/connection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

function generateUserId(username) {
    //will return a short unique integer of 4 digit based on the username and current time
    return Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}

function generateLoginId(username, password) {
    //will generate a login id based on the username and password nad time\
    return Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;    
}

function generateMediaId(title) {
    //will generate a media id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}






// Create a connection pool
oracledb.createPool({
    user: "ADMIN",
    password: "admin",
    connectString: "localhost:1521/orclpdb",
    poolMin: 5,
    poolMax: 20,
    poolIncrement: 5
}).then(pool => {
    console.log('Connection pool started');


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR USER REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    //registration route
    app.post('/registration/user', async (req, res) => {
        const { username, password, name, dob, email, city, street, house, phone, genres } = req.body;
        console.log('Received user registration request:', { username, password, name, dob, email, city, street, house, phone, genres });

        const user_id = generateUserId(username);
        console.log('Generated User ID:', user_id);
        const login_id = generateLoginId(username, password, dob);
        console.log('Generated Login ID:', login_id);

        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
            res.status(500).send("Connection Error");
            return;
            }

            // Insert user data into the database
            const userResult = await con.execute(
                `INSERT INTO USERS (USER_ID, USER_NAME, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE) 
                VALUES (:user_id, :username, :name, TO_DATE(:dob, 'YYYY-MM-DD'), :email, :city, :street, :house, :phone)`,
                { user_id, username, name, dob, email, city, street, house, phone }
            );
            console.log(`User Insert Result: ${JSON.stringify(userResult)}`);

            // Insert user login credentials into the database
            const loginResult = await con.execute(
                `INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID) 
                VALUES (:login_id, :password, 'USER', :user_id)`,
                { login_id, password, user_id }
            );
            console.log(`Login Insert Result: ${JSON.stringify(loginResult)}`);

            // Insert user genre preferences into the database
            const genreResult = await con.execute(
                `INSERT INTO PREFERREDGENRE (USER_ID, GENRES) VALUES (:user_id, :genres)`,
                { user_id, genres: genres.join(',') }
            );
            console.log(`Genre Insert Result: ${JSON.stringify(genreResult)}`);

            // Commit the transaction
            await con.commit();

            res.status(201).send("User registered successfully");
            console.log("User registered successfully");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR MERCHANIDISER REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/registration/merchandiser', async (req, res) => {
        const { username, password, name, description, email, city, street, house, phone } = req.body;
        console.log('Received merchandiser registration request:', { username, password, name, description, email, city, street, house, phone });
    
        const user_id = generateUserId(username);
        console.log('Generated User ID:', user_id);
        const login_id = generateLoginId(username, password);
        console.log('Generated Login ID:', login_id);
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            // Insert merchandiser data into the database\
            const result = await con.execute(
                `INSERT INTO MERCHANDISER (MER_ID, USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
                VALUES (:user_id, :username, :name, :description, :email, :city, :street, :house, :phone)`,
                { user_id, username, name, description, email, city, street, house, phone }
            );
            console.log(`Merchandiser Insert Result: ${JSON.stringify(result)}`);

            // Insert merchandiser login credentials into the database
            const loginResult = await con.execute(
                `INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID) 
                VALUES (:login_id, :password, 'MERCHANDISER', :user_id)`,
                { login_id, password, user_id }
            );
            console.log(`Login Insert Result: ${JSON.stringify(loginResult)}`);

            // Commit the transaction
            await con.commit();

            res.status(201).send("Merchandiser registered successfully");
            console.log("Merchandiser registered successfully");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        }
    }
    );

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR CHECK USERNAME EXIST USER REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/registration/user/check-username', async (req, res) => {
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR CHECK USERNAME EXIST MERCHANDISER REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/registration/merch/check-username', async (req, res) => {
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
                `SELECT COUNT(*) AS count FROM MERCHANDISER WHERE USER_NAME = :username`,
                { username }
            );
            console.log('Query Result: ${JSON.stringify(checkUserResult.rows)}');
    
            const userCount = checkUserResult.rows[0].COUNT;
    
            console.log('User Count: ${userCount}');
    
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



    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR CHECK USERNAME EXIST COMPANY REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/registration/company/check-username', async (req, res) => {
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
                `SELECT COUNT(*) AS count FROM COMPANY WHERE USER_NAME = :username`,
                { username }
            );
            console.log('Query Result: ${JSON.stringify(checkUserResult.rows)}');
    
            const userCount = checkUserResult.rows[0].COUNT;
    
            console.log('User Count: ${userCount}');
    
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR COMPANY REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/registration/company', async (req, res) => {
        const { username, password, name, email, description, imageUrl } = req.body;
        console.log('Received company registration request:', { username, password, name, email, description, imageUrl });
    
        const user_id = generateUserId(username);
        console.log('Generated User ID:', user_id);
        const login_id = generateLoginId(username, password);
        console.log('Generated Login ID:', login_id);
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            // Insert company data into the database
            const result = await con.execute(
                `INSERT INTO COMPANY (COM_ID, USER_NAME, NAME, IMG, EMAIL, DESCRIPTION)
                VALUES (:user_id, :username, :name, :imageUrl, :email, :description)`,
                { user_id, username, name, imageUrl, email, description }
            );
            console.log(`Company Insert Result: ${JSON.stringify(result)}`);

            // Insert company login credentials into the database
            const loginResult = await con.execute(
                `INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID) 
                VALUES (:login_id, :password, 'COMPANY', :user_id)`,
                { login_id, password, user_id }
            );

            console.log(`Login Insert Result: ${JSON.stringify(loginResult)}`);

            // Commit the transaction
            await con.commit();

            res.status(201).send("Company registered successfully");
            console.log("Company registered successfully");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        }

    });

        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Login route for ADMIN
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/login/admin', async (req, res) => {
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
                `SELECT USER_NAME, PASSWORD, ADMIN_ID as "user_id" 
                FROM LOGIN JOIN ADMIN ON LOGIN.ID = ADMIN.ADMIN_ID
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Login route for USER
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/login/user', async (req, res) => {
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
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Login route for MERCHANDISER 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.post('/login/merchandiser', async (req, res) => {
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
                `SELECT USER_NAME, PASSWORD, MER_ID as "user_id"
                FROM LOGIN JOIN MERCHANDISER ON LOGIN.ID = MERCHANDISER.MER_ID WHERE USER_NAME = :username AND PASSWORD = :password`,
                { username, password } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.status(200).send(result.rows[0]); // Respond to client
                console.log("Login Successful");
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
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Login route for COMPANY 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/login/company', async (req, res) => {
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
                `SELECT USER_NAME, PASSWORD, COM_ID as "user_id"
                FROM LOGIN JOIN COMPANY ON LOGIN.ID = COMPANY.COM_ID WHERE USER_NAME = :username AND PASSWORD = :password`,
                { username, password } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.status(200).send(result.rows[0]); // Respond to client
                console.log("Login Successful");
            }
            else {
                console.log("Invalid Credentials");
                res.status(401).send("Invalid Credentials"); // Respond to client
            }
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        }
    });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for ADMIN PROFILE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/profile/admin', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received user profile request:', { user_id });
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await con.execute(
            `SELECT * FROM ADMIN WHERE ADMIN_ID = :user_id`,
            { user_id } // Named bind variables
        );
        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            res.send(result.rows[0]);
            console.log("User Data sent");
        } else {
            res.status(404).send("User not found");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for ADMIN PROFILE UPDATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/profile/admin/update', async (req, res) => {
        const { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
        console.log('Received admin profile update request:', { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE });
      
        if (!user_id || !NAME || !DOB || !EMAIL || !CITY || !STREET || !HOUSE || !PHONE) {
          return res.status(400).json({ message: "All fields are required" });
        }
      
        // Log the DOB value to verify its format
        console.log('DOB before formatting:', DOB);
      
        // Ensure DOB is in YYYY-MM-DD format
        const formattedDOB = new Date(DOB).toISOString().split('T')[0];
        console.log('Formatted DOB:', formattedDOB);
      
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            res.status(500).json({ message: "Connection Error" });
            return;
          }
      
          const result = await con.execute(
            `UPDATE ADMIN SET NAME = :NAME, DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), EMAIL = :EMAIL, CITY = :CITY, STREET = :STREET, HOUSE = :HOUSE, PHONE = :PHONE WHERE ADMIN_ID = :user_id`,
            { NAME, DOB: formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE, user_id }
          );
          console.log(`Query Result: ${JSON.stringify(result)}`);
      
          await con.commit();
      
          const updatedProfile = { user_id, NAME, DOB: formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE };
          res.status(200).json(updatedProfile);
          console.log("Profile updated successfully");
      
        } catch (err) {
          console.error("Error during database query: ", err);
          res.status(500).json({ message: "Internal Server Error" });
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for USER PROFILE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/profile/user', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received user profile request:', { user_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT * FROM USERS WHERE USER_ID = :user_id`,
                { user_id } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.send(result.rows[0]);
                console.log("User Data sent");
            } else {
                res.status(404).send("User not found");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for USER PROFILE UPDATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/profile/user/update', async (req, res) => {
        const { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
        console.log('Received user profile update request:', { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE });
      
        if (!user_id || !NAME || !DOB || !EMAIL || !CITY || !STREET || !HOUSE || !PHONE) {
          return res.status(400).json({ message: "All fields are required" });
        }
      
        // Log the DOB value to verify its format
        console.log('DOB before formatting:', DOB);
      
        // Ensure DOB is in YYYY-MM-DD format
        const formattedDOB = new Date(DOB).toISOString().split('T')[0];
        console.log('Formatted DOB:', formattedDOB);
      
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            res.status(500).json({ message: "Connection Error" });
            return;
          }
      
          const result = await con.execute(
            `UPDATE USERS SET NAME = :NAME, DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), EMAIL = :EMAIL, CITY = :CITY, STREET = :STREET, HOUSE = :HOUSE, PHONE = :PHONE WHERE USER_ID = :user_id`,
            { NAME, DOB: formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE, user_id }
          );
          console.log(`Query Result: ${JSON.stringify(result)}`);
      
          await con.commit();
      
          const updatedProfile = { user_id, NAME, DOB: formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE };
          res.status(200).json(updatedProfile);
          console.log("Profile updated successfully");
      
        } catch (err) {
          console.error("Error during database query: ", err);
          res.status(500).json({ message: "Internal Server Error" });
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


        
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for MERCHANDISER PROFILE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/profile/merch', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received MERCHANDISER profile request:', { user_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT * FROM MERCHANDISER WHERE MER_ID = :user_id`,
                { user_id } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.send(result.rows[0]);
                console.log("User Data sent");
            } else {
                res.status(404).send("User not found");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for MERCHANDISER PROFILE UPDATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/profile/merch/update', async (req, res) => {
        const { user_id, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
        console.log('Received Merchandiser profile update request:', { user_id, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE });
    
        if (!user_id || !NAME || !DESCRIPTION || !EMAIL || !CITY || !STREET || !HOUSE || !PHONE) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        let con;
        try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).json({ message: "Connection Error" });
            return;
        }
    
        const result = await con.execute(
            `UPDATE MERCHANDISER SET NAME = :NAME, DESCRIPTION = :DESCRIPTION, EMAIL = :EMAIL, CITY = :CITY, STREET = :STREET, HOUSE = :HOUSE, PHONE = :PHONE 
            WHERE MER_ID = :user_id`,
            { NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE, user_id }
        );
        console.log(`Query Result: ${JSON.stringify(result)}`);
    
        await con.commit();
    
        const updatedProfile = { user_id, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE };
        res.status(200).json(updatedProfile);
        console.log("Profile updated successfully");
    
        } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).json({ message: "Internal Server Error" });
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for COMPANY PROFILE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/profile/company', async (req, res) => {
        const { userid } = req.body;
        console.log('Received company profile request:', { userid });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT * FROM COMPANY WHERE COM_ID = :userid`,
                { userid } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.send(result.rows[0]);
                console.log("Company Data sent");
            } else {
                res.status(404).send("Company not found");
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
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR ADMIN'S USERLIST 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/userlist', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            console.log('Received userlist request');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received userlist request');

            const result = await con.execute(

                `SELECT * FROM USERS`
            );

            const transformData = (data) => {
                return {
                    USER_ID: data.USER_ID,
                    USER_NAME: data.USER_NAME,
                    NAME: data.NAME,
                    DOB: data.DOB,
                    EMAIL: data.EMAIL,
                    CITY: data.CITY,
                    STREET: data.STREET,
                    HOUSE: data.HOUSE,
                    PHONE: data.PHONE
                };
            };
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Search Data sent:", transformedData);
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR ADMIN'S COMPANYLIST 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/companylist', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            console.log('Received companylist request');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received companylist request');

            const result = await con.execute(

                `SELECT * FROM COMPANY`
            );

            const transformData = (data) => {
                return {
                    COM_ID: data.COM_ID,
                    USER_NAME: data.USER_NAME,
                    NAME: data.NAME,
                    IMG: data.IMG,
                    DESCRIPTION: data.DESCRIPTION,
                    EMAIL: data.EMAIL
                };
            };
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Search Data sent:", transformedData);
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR ADMIN'S MERCHANDISERLIST 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/merchlist', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            console.log('Received merchlist request');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received merchlist request');

            const result = await con.execute(

                `SELECT * FROM MERCHANDISER`
            );

            const transformData = (data) => {
                return {
                    MER_ID: data.MER_ID,
                    USER_NAME: data.USER_NAME,
                    NAME: data.NAME,
                    DESCRIPTION: data.DESCRIPTION,
                    EMAIL: data.EMAIL,
                    CITY: data.CITY,
                    STREET: data.STREET,
                    HOUSE: data.HOUSE,
                    PHONE: data.PHONE
                };
            };
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Search Data sent:", transformedData);
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



    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for fetch all Role
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/roles', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received Role request');
            const result = await con.execute(
                `SELECT * FROM ROLE`
            );
            console.log(`Query Result: `,result.rows);

            

            res.send(result.rows);
            console.log("ROLE Data sent");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR ADD MEDIA
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/addmedia', async (req, res) => {
        const {
            title,
            description,
            type,
            selectedGenres,
            trailer,
            duration,
            releaseDate,
            episode,
            roles,
            imageUrl,
            com_id
        } = req.body;
    
        console.log('Received add media request:', { title, description, type, selectedGenres, trailer, imageUrl, duration, releaseDate, episode, roles });
        
        const media_id = generateMediaId(title); // Assuming you have a function to generate media IDs
        const rating = 0; // Default rating
        console.log('Generated Media ID:', media_id);

        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Insert media data into the database
            const result = await con.execute(
                `INSERT INTO MEDIA (MEDIA_ID, TITLE, DESCRIPTION, RATING, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE)
                VALUES (:media_id, :title, :description, :rating, :type, :genres, :trailer, :poster, :duration, TO_DATE(:releaseDate, 'YYYY-MM-DD'), :episode)`,
                {
                    media_id,
                    title,
                    description,
                    rating,
                    type,
                    genres: selectedGenres.join(', '), // Assuming genres are stored as comma-separated values
                    trailer,
                    poster: imageUrl,
                    duration,
                    releaseDate,
                    episode
                }
            );
            
            console.log(`Media Insert Result: ${JSON.stringify(result)}`);
    
            // Insert roles associated with the media into MEDIAHASROLE
            for (const role of roles) {
                try {
                    const roleResult = await con.execute(
                        `INSERT INTO MEDIAHASROLE (ROLE_ID, MEDIA_ID)
                        VALUES (:role_id, :media_id)`,
                        {
                            role_id: role.role_id,
                            media_id
                        }
                    );
                    console.log(`Role Insert Result for Role ID ${role.role_id}: ${JSON.stringify(roleResult)}`);
                } catch (roleErr) {
                    console.error(`Error inserting role ID ${role.role_id}: `, roleErr);
                    throw roleErr;
                }
            }

             // Insert media and company association into COMPANYHASMEDIA
            const companyMediaResult = await con.execute(
            `INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID)
            VALUES (:media_id, :com_id)`,
            {
                media_id,
                com_id
            }
        );
        console.log(`Company-Media Insert Result: ${JSON.stringify(companyMediaResult)}`);
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Media added successfully");
            console.log("Media added successfully");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                try {
                    await con.close();
                } catch (closeErr) {
                    console.error("Error closing database connection: ", closeErr);
                }
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for COMPANY MY MEDIA
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/mymedia', async (req, res) => {
        const { com_id } = req.body;
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Get all media IDs for the given company ID
            const mediaIdsResult = await con.execute(
                `SELECT MEDIA_ID FROM COMPANYHASMEDIA WHERE COM_ID = :com_id`,
                { com_id }
            );
    
            const mediaIds = mediaIdsResult.rows.map(row => row.MEDIA_ID);
    
            if (mediaIds.length === 0) {
                res.status(404).send("No media found for the given company");
                return;
            }
    
            // Get all media details for the retrieved media IDs
            const mediaQuery = `
                SELECT MEDIA.*, COMPANY.NAME AS COMPANY_NAME 
                FROM MEDIA
                LEFT JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
                LEFT JOIN COMPANY ON COMPANYHASMEDIA.COM_ID = COMPANY.COM_ID
                WHERE MEDIA.MEDIA_ID IN (${mediaIds.join(', ')})
            `;
    
            const result = await con.execute(mediaQuery);
    
            const mediaList = result.rows.map(data => ({
                id: data.MEDIA_ID,
                img: data.POSTER,
                title: data.TITLE,
                description: data.DESCRIPTION,
                companyName: data.COMPANY_NAME
            }));
    
            res.send(mediaList);
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for COMPANY ADD MEDIA
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 

app.post('/addNews', async (req, res) => {
    const { mediaID, com_id, topic, description } = req.body;
    
    if (!mediaID || !com_id || !topic || !description) {
        res.status(400).send("Missing required fields");
        return;
    }

    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const news_id = generateUserId(topic);
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        // Insert news into NEWSANDUPDATES table
        await con.execute(
            `INSERT INTO NEWSANDUPDATES (NEWS_ID, DESCRIPTION, HEADLINE)
            VALUES (:news_id, :description, :headline)`,
            {
                news_id,
                description,
                headline: topic
            }
        );

        // Insert into COMPANYGIVENEWS table
        await con.execute(
            `INSERT INTO COMPANYGIVENEWS (NEWS_ID, COM_ID, NEWS_DATE)
            VALUES (:news_id, :com_id, TO_DATE(:news_date, 'YYYY-MM-DD'))`,
            {
                news_id,
                com_id,
                news_date: currentDate
            }
        );

        // Insert into NEWSTOMEDIA table
        await con.execute(
            `INSERT INTO NEWSTOMEDIA (MEDIA_ID, NEWS_ID, NEWS_DATE)
            VALUES (:media_id, :news_id, TO_DATE(:news_date, 'YYYY-MM-DD'))`,
            {
                media_id: mediaID,
                news_id,
                news_date: currentDate
            }
        );

        await con.commit();
        res.status(201).send("News added successfully");
        console.log("News added successfully");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (closeErr) {
                console.error("Error closing database connection: ", closeErr);
            }
        }
    }
});
    
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for fetch all COMPANY
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/companies', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received company request');
            const result = await con.execute(
                `SELECT * FROM COMPANY`
            );
            console.log(`Query Result: `,result.rows);

            

            res.send(result.rows);
            console.log("Company Data sent");
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for COMPANY DETAILS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/companies/page', async (req, res) => {
        const { companyID } = req.body;
        console.log('Received company request:', companyID);

        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT * FROM COMPANY WHERE COM_ID = :companyID`,
                { companyID }
            );
            console.log(`Query Result: `, result.rows);
            if (!result.rows.length) {
                res.status(404).send("Company not found");
                return;
            }
            res.send(result.rows[0]);
            console.log("Company Data sent");
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for ALL PRODUCTS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/products', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received company request');
            const result = await con.execute(
                `SELECT * FROM products`
            );
            console.log(`Query Result: `,result.rows);

            

            res.send(result.rows);
            console.log("Company Data sent");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for ALL MEDIA
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/media', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            console.log('Received media request000');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received media request');

            const result = await con.execute(

                `SELECT * FROM MEDIA`
            );
    
            const transformData = (data) => {
                return {
                    id: data.MEDIA_ID,
                    img: data.POSTER,
                    title: data.TITLE,
                    description: data.DESCRIPTION,
                    rating: data.RATING , // Assuming the original rating is out of 10 and the new one is out of 5
                    releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                    type: data.TYPE,
                    episodes: data.EPISODE || 0,
                    duration: data.DURATION,
                    genre: data.GENRE.split(',').map(g => g.trim()),
                    companyName: 'Example Productions',
                    role: [],
                    news: [],
                    review: []
                };
            };
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Media Data sent");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR MEADIA SEARCH 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/media/search', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received search request:', req.body);
            const { searchTerm, selectedGenres, selectedMediaType } = req.body;
    
            // Construct the genre filter part of the query
            const genreFilter = selectedGenres.length ? `AND (${selectedGenres.map(g => `GENRE LIKE '%${g}%'`).join(' AND ')})` : '';
    
            // Construct the media type filter part of the query
            const mediaTypeFilter = selectedMediaType ? `AND LOWER(TYPE) = LOWER(:selectedMediaType)` : '';
    
            // Combine the filters into the query
            const query = `
                SELECT * FROM MEDIA 
                WHERE LOWER(TITLE) LIKE LOWER(:searchTerm) 
                ${genreFilter} 
                ${mediaTypeFilter}
            `;
    
            // Execute the query with the search term and selected media type
            const result = await con.execute(query, { searchTerm: `%${searchTerm}%`, selectedMediaType });
    
            const transformData = (data) => {
                return {
                    id: data.MEDIA_ID,
                    img: data.POSTER,
                    title: data.TITLE,
                    description: data.DESCRIPTION,
                    rating: data.RATING / 2, // Assuming the original rating is out of 10 and the new one is out of 5
                    releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                    type: data.TYPE.charAt(0).toUpperCase() + data.TYPE.slice(1).toLowerCase(),
                    episodes: data.EPISODE || 0,
                    duration: data.DURATION,
                    genre: data.GENRE.split(',').map(g => g.trim()),
                    companyName: 'Example Productions',
                    role: [],
                    news: [],
                    review: []
                };
            };
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Search Data sent:", transformedData);
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR MEADIA SEARCH BY GENRE 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/media/search/genre', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received search request:', req.body);
            const { searchTerm, selectedGenres } = req.body;
            const genreFilter = selectedGenres.length ? `AND (${selectedGenres.map(g => `GENRE LIKE '%${g}%'`).join(' AND ')})` : '';
            const result = await con.execute(
                `SELECT * FROM MEDIA WHERE LOWER(TITLE) LIKE LOWER(:searchTerm) ${genreFilter}`,
                { searchTerm: `%${searchTerm}%` } // Named bind variables
            );
    
            const transformData = (data) => {
                return {
                    id: data.MEDIA_ID,
                    img: data.POSTER,
                    title: data.TITLE,
                    description: data.DESCRIPTION,
                    rating: data.RATING / 2, // Assuming the original rating is out of 10 and the new one is out of 5
                    releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                    type: data.TYPE.charAt(0).toUpperCase() + data.TYPE.slice(1).toLowerCase(),
                    episodes: data.EPISODE || 0,
                    duration: data.DURATION,
                    genre: data.GENRE.split(',').map(g => g.trim()),
                    companyName: 'Example Productions',
                    role: [],
                    news: [],
                    review: []
                };
            };
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log(transformData);
            console.log("Search Data sent");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR MEDIA PAGE 
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    

    app.post('/media/page', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received media request:', req.body);
            const { id } = req.body;
            console.log('Received media request:', id);
            const result = await con.execute(
                `   SELECT MEDIA.*, COMPANY.NAME AS COMPANY_NAME 
                    FROM MEDIA
                    LEFT JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
                    LEFT JOIN COMPANY ON COMPANYHASMEDIA.COM_ID = COMPANY.COM_ID
                    WHERE MEDIA.MEDIA_ID = :id`,
                { id }
            );
            console.log(`Query Result: `, result.rows);

            if (!result.rows.length) {
                res.status(404).send("Media not found");
                return;
            }

            const roleResult = await con.execute(
                `SELECT ROLE_ID, NAME, IMG, ROLE_TYPE 
                FROM ROLE NATURAL JOIN MEDIAHASROLE 
                where MEDIA_ID = :id 
                ORDER by ROLE_TYPE ASC`,
                { id }
            );
            console.log(`Role Query Result: `, roleResult.rows);
            
            const newsQuery = `
            SELECT NEWSANDUPDATES.NEWS_ID, HEADLINE AS TOPIC, DESCRIPTION, COMPANYGIVENEWS.NEWS_DATE 
            FROM NEWSANDUPDATES
            JOIN NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
            JOIN COMPANYGIVENEWS ON NEWSANDUPDATES.NEWS_ID = COMPANYGIVENEWS.NEWS_ID
            WHERE NEWSTOMEDIA.MEDIA_ID = :id
            ORDER BY COMPANYGIVENEWS.NEWS_DATE DESC
             `;

            const newsResult = await con.execute(newsQuery, { id });
    
            const transformData = (data) => {
                return {
                    id: data.MEDIA_ID,
                    img: data.POSTER,
                    title: data.TITLE,
                    description: data.DESCRIPTION,
                    rating: data.RATING / 2, // Assuming the original rating is out of 10 and the new one is out of 5
                    releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                    type: data.TYPE,
                    episodes: data.EPISODE || 0,
                    duration: data.DURATION,
                    genre: data.GENRE ? data.GENRE.split(',').map(g => g.trim()) : [],
                    trailer: data.TRAILER,
                    companyName: data.COMPANY_NAME,
                    role: roleResult.rows,
                    news: newsResult.rows.map(row => ({
                        topic: row.TOPIC,
                        description: row.DESCRIPTION,
                        date: row.NEWS_DATE
                    })),
                    review: []
                };
            };
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData[0]);
            console.log("Media Data sent");
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR PRODUCT DETAILS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/products/details', async (req, res) => {
        try {
            const { id } = req.body;
            console.log('Received product request');
            const con = await pool.getConnection();
            if (!con) {
                throw new Error("Connection Error");
            }
            const result = await con.execute(
                `SELECT * FROM PRODUCTS WHERE PRO_ID = :id`,
                { id }
            );
            console.log(`Query Result: `, result.rows);
    
            if (!result.rows.length) {
                res.status(404).send("Product not found");
                return;
            }
    
            res.send(result.rows[0]);
            console.log("Product Data sent");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR FEATURED MEDIA
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    

    app.get('/media/featured', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received media request');
    
            const query = `
                SELECT TITLE, POSTER AS IMG_SRC, DESCRIPTION
                FROM MEDIA
                ORDER BY RATING DESC
                FETCH FIRST 5 ROWS ONLY
            `;
            const result = await con.execute(query);
    
            const transformData = (data) => ({
                title: data.TITLE,
                imgSrc: data.IMG_SRC, // Ensure the database field is aliased as IMG_SRC
                description: data.DESCRIPTION
            });
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Media Data sent");
        } catch (err) {
            console.error("Error during database query:", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                try {
                    await con.close();
                } catch (err) {
                    console.error("Error closing database connection:", err);
                }
            }
        }
    });
    

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR adding in PLAN TO WATCH or WATCHED
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/mylist/add', async (req, res) => {
        let { user_id, media_id, status } = req.body; // Changed to let
        console.log('Received add to plan to watch request:', { user_id, media_id, status });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            let originalStatus = status;
            if (status === 'WATCHED') {
                status = 'PLAN_TO_WATCH';
            } else {
                status = 'WATCHED';
            }
    
            const deleteResult = await con.execute(
                `DELETE FROM USERWATCHANDFAVORITE 
                 WHERE USER_ID = :user_id
                 AND MEDIA_ID = :media_id
                 AND STATUS = :status`,
                { user_id, media_id, status }, { autoCommit: true }
            );
            console.log(`Query Result: `, deleteResult);
    
            status = originalStatus; // Reset status to the original value before inserting
    
            const result = await con.execute(
                `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, STATUS)
                VALUES (:user_id, :media_id, :status)`,
                { user_id, media_id, status }, { autoCommit: true }
            );
            console.log(`Query Result: `, result);
            res.send("Added to My List successfully");
            console.log("Added to My List successfully");


    
        } catch (err) {
            console.error("Error during database query:", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                try {
                    await con.close();
                } catch (err) {
                    console.error("Error closing database connection:", err);
                }
            }
        }
    });
    







    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR PLAN TO WATCH
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/planToWatch', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received plan to watch request:', { user_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT * FROM MEDIA 
                WHERE MEDIA_ID IN (
                    SELECT MEDIA_ID FROM USERWATCHANDFAVORITE 
                    WHERE USER_ID = :user_id
                    AND STATUS = 'PLAN_TO_WATCH'
                )`,
                { user_id }
            );
            // console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Plan to Watch Data sent");
        } catch (err) {
            console.error("Error during database query:", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                try {
                    await con.close();
                } catch (err) {
                    console.error("Error closing database connection:", err);
                }
            }
        }
    });
    


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR WATCHED
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/watched', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received plan to watch request:', { user_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT * FROM MEDIA 
                WHERE MEDIA_ID IN (
                    SELECT MEDIA_ID FROM USERWATCHANDFAVORITE 
                    WHERE USER_ID = :user_id
                    AND STATUS = 'WATCHED'
                )`,
                { user_id }
            );
            // console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Plan to Watch Data sent");
        } catch (err) {
            console.error("Error during database query:", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                try {
                    await con.close();
                } catch (err) {
                    console.error("Error closing database connection:", err);
                }
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR DELETE FROM PLAN TO WATCH
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/planToWatch/delete', async (req, res) => {
        const { user_id, media_id } = req.body;
        console.log('Received delete request for plan to watch:', { user_id, media_id });
        
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            res.status(500).send("Connection Error");
            return;
          }
          
          const result = await con.execute(
            `DELETE FROM USERWATCHANDFAVORITE 
             WHERE USER_ID = :user_id
             AND MEDIA_ID = :media_id
             AND STATUS = 'PLAN_TO_WATCH'`,
            { user_id, media_id },{ autoCommit: true }
          );
          
          console.log(`Query Result: `, result.rowsAffected);
          if (result.rowsAffected === 0) {
            res.status(404).send("Record not found or already deleted");
          } else {
            await con.commit();
            res.send("Deleted successfully");
            console.log("Deleted successfully");
          }
        } catch (err) {
          console.error("Error during database query:", err);
          res.status(500).send("Internal Server Error");
        } finally {
          if (con) {
            try {
              await con.close();
            } catch (err) {
              console.error("Error closing database connection:", err);
            }
          }
        }
      });
      

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR DELETE FROM WATCHED
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/watched/delete', async (req, res) => {
        const { user_id, media_id } = req.body;
        console.log('Received delete request for watched:', { user_id, media_id });
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            res.status(500).send("Connection Error");
            return;
          }
          const result = await con.execute(
            `DELETE FROM USERWATCHANDFAVORITE 
             WHERE USER_ID = :user_id
             AND MEDIA_ID = :media_id
             AND STATUS = 'WATCHED'`,
            { user_id, media_id } ,{ autoCommit: true}
          );
          console.log(`Query Result: `, result);
          if (result.rowsAffected === 0) {
            res.status(404).send("Record not found or already deleted");
          } else {
            res.send("Deleted successfully");
            console.log("Deleted successfully");
            await con.commit();
          }
        } catch (err) {
          console.error("Error during database query:", err);
          res.status(500).send("Internal Server Error");
        } finally {
          if (con) {
            try {
              await con.close();
            } catch (err) {
              console.error("Error closing database connection:", err);
            }
          }
        }
    });


    app.get('/discussions', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received discussion request');
            const result = await con.execute(
                `SELECT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT
                FROM DISCUSSION JOIN DISCUSSIONABOUTMEDIA 
                    ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
                JOIN MEDIA 
                    ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID`
            );
            console.log(`Query Result: `,result.rows);
            
            res.send(result.rows);
            console.log("Discussion Data sent");
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
      


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR DISCUSSION REPLIES
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/discussions/replies', async (req, res) => {
        const { discussion_id } = req.body;
        console.log('Received discussion request:', { discussion_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT DISCUSSION.DIS_ID, USERS.NAME, DISCUSSION.DESCRIPTION, DISCUSSION.REPLY_COUNT
                FROM DISCUSSION JOIN USERSTARTDISCUSSION 
                    ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID 
                JOIN USERS 
                    ON USERSTARTDISCUSSION.USER_ID = USERS.USER_ID 
                WHERE PARENT_TOPIC = :discussion_id
                ORDER BY DISCUSSION.REPLY_COUNT ASC`,
                { discussion_id }
            );
            console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Discussion Data sent");
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



    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR DISCUSSION FOR MOVIE PAGE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/discussions/media', async (req, res) => {
        const { id } = req.body;
        console.log('Received discussion request:', { id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT
                FROM DISCUSSION JOIN DISCUSSIONABOUTMEDIA 
                    ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
                JOIN MEDIA ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
                WHERE MEDIA.MEDIA_ID= :id`,
                { id }
            );
            console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Discussion Data sent");
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR NOTIFICATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/notifications', async (req, res) => {
        const { user_id } = req.body;
    
        if (!user_id) {
            res.status(400).send("Missing required fields");
            return;
        }
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            const query = `
                SELECT
                    NEWSANDUPDATES.NEWS_ID,
                    NEWSANDUPDATES.HEADLINE,
                    NEWSANDUPDATES.DESCRIPTION,
                    NEWSTOMEDIA.NEWS_DATE,
                    MEDIA.TITLE AS MEDIA_TITLE
                FROM
                    NEWSANDUPDATES
                JOIN
                    NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
                JOIN
                    MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
                WHERE
                    NEWSTOMEDIA.MEDIA_ID IN (
                        SELECT MEDIA_ID
                        FROM USERWATCHANDFAVORITE
                        WHERE USER_ID = :user_id
                    )
                ORDER BY
                    NEWSTOMEDIA.NEWS_DATE DESC
            `;
    
            const result = await con.execute(query, { user_id });
    
            if (result.rows.length === 0) {
                res.status(404).send("No notifications found");
                return;
            }
    
            const notifications = result.rows.map(row => ({
                news_id: row.NEWS_ID,
                headline: row.HEADLINE,
                description: row.DESCRIPTION,
                news_date: row.NEWS_DATE,
                media_title: row.MEDIA_TITLE
            }));
    
            res.status(200).json(notifications);
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


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR STATS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/user-stats', async (req, res) => {
        console.log('Received user stats request');
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            const userStatsQuery = `
                SELECT 'User' AS name, COUNT(*) AS count FROM USERS
                UNION ALL
                SELECT 'Company' AS name, COUNT(*) AS count FROM COMPANY
                UNION ALL
                SELECT 'Merchandiser' AS name, COUNT(*) AS count FROM MERCHANDISER
            `;
    
            const userPieStatsQuery = `
                SELECT 'Total Users' AS name, 
                       (SELECT COUNT(*) FROM USERS) + 
                       (SELECT COUNT(*) FROM COMPANY) + 
                       (SELECT COUNT(*) FROM MERCHANDISER) AS value
                FROM DUAL
                UNION ALL
                SELECT 'Users' AS name, COUNT(*) AS value FROM USERS
                UNION ALL
                SELECT 'Companies' AS name, COUNT(*) AS value FROM COMPANY
                UNION ALL
                SELECT 'Merchandisers' AS name, COUNT(*) AS value FROM MERCHANDISER
            `;
    
            const userStats = await con.execute(userStatsQuery);
            const userPieStats = await con.execute(userPieStatsQuery);
    
            res.json({ bar: userStats.rows, pie: userPieStats.rows });
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
    

    app.post('/media-stats', async (req, res) => {
        console.log('Received media stats request');
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            const mediaStats = await con.execute(`
                SELECT 'Media' AS name, COUNT(*) AS count FROM MEDIA
                UNION ALL
                SELECT 'Products' AS name, COUNT(*) AS count FROM PRODUCTS
                UNION ALL
                SELECT 'Roles' AS name, COUNT(*) AS count FROM ROLE
            `);
    
            res.json(mediaStats.rows);
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

    app.post('/genre-stats', async (req, res) => {
        console.log('Received genre stats request');
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Execute the query and get the result
            const result = await con.execute(`
                SELECT GENRE
                FROM MEDIA
            `);
    
            // Log the entire result to understand its structure
            console.log('Fetched media result:', result);
    
            // Check if result.rows is an array and contains data
            if (!result || !Array.isArray(result.rows)) {
                throw new Error('Invalid result format or empty result');
            }
    
            // Process the rows to count genres
            const genreCounts = {};
            result.rows.forEach(row => {
                if (row.GENRE) {
                    const genres = row.GENRE.split(',').map(genre => genre.trim());
                    genres.forEach(genre => {
                        if (genre) {
                            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                        }
                    });
                }
            });
    
            // Convert counts to an array format
            const genreStats = Object.entries(genreCounts).map(([genre, count]) => ({
                genre,
                count
            }));
    
            // console.log('Processed genre stats:', genreStats); 
    
            res.json(genreStats);
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
    

    
    app.post('/type-stats', async (req, res) => {
        console.log('Received type stats request');
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            const typeStats = await con.execute(`
                SELECT TYPE AS type, COUNT(*) AS count
                FROM MEDIA
                GROUP BY TYPE
            `);
         
            res.json(typeStats.rows);
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

    app.post('/role-stats', async (req, res) => {
    console.log('Received role stats request');
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const roleStats = await con.execute(`
            SELECT ROLE_TYPE AS role, COUNT(*) AS count
            FROM ROLE
            GROUP BY ROLE_TYPE
        `);
        console.log(roleStats.rows);
        res.json(roleStats.rows);
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

    


    // Start the server
    app.listen(5000, () => {
        console.log('Server started on http://localhost:5000');
    });
}).catch(err => {
    console.error('Error starting connection pool', err);
});
