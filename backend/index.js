const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const { getConnection } = require('./DB/connection');
const e = require('express');

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

function generateProductId(title) {
    //will generate a media id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


function generateDiscussionId(topic) {
    //will generate a discussion id based on the topic and time
    return Math.abs(topic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


function generateReviewId(title) {
    //will generate a review id based on the title and time
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
    
        // Generate IDs
        const user_id = generateUserId(username);
        console.log('Generated User ID:', user_id);
        const login_id = generateLoginId(username, password); // Generate Login ID in Node.js
        console.log('Generated Login ID:', login_id);
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Ensure DOB is in the correct format (YYYY-MM-DD)
            const formattedDob = new Date(dob).toISOString().split('T')[0]; // Example conversion
    
            // Define bind parameters for calling the stored procedure
            const bindParams = {
                p_username: username,
                p_password: password,
                p_name: name,
                p_dob: formattedDob, // Use the formatted DOB here
                p_email: email,
                p_city: city,
                p_street: street,
                p_house: house,
                p_phone: phone,
                p_genres: genres.join(','),  // Assuming genres is an array, join it into a string
                p_login_id: login_id,  // Pass the generated login_id as an input parameter
                p_user_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }  // Output parameter for user ID
            };
    
            // Execute the stored procedure
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
    
            // Commit the transaction
            await con.commit();
            console.log("Transaction committed successfully.");
    
            // Respond with success
            res.status(201).json({
                message: `User registered successfully.`,
                userId: userId,
                loginId: login_id
            });
    
        } catch (err) {
            // Handle errors during the query execution
            console.error("Error during database operation: ", err);
    
            // Attempt to roll back the transaction if there is a failure
            if (con) {
                try {
                    await con.rollback();
                    console.log("Transaction rolled back due to error.");
                } catch (rollbackErr) {
                    console.error("Error during transaction rollback: ", rollbackErr);
                }
            }
    
            // Send the error response with more details
            res.status(500).json({ message: "Internal Server Error. Unable to register user.", error: err.message });
    
        } finally {
            // Ensure the connection is closed
            if (con) {
                try {
                    await con.close();
                    console.log("Database connection closed.");
                } catch (closeErr) {
                    console.error("Error closing the database connection: ", closeErr);
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
    
        const login_id = generateLoginId(username, password);  // Generate login_id in Node.js
        console.log('Generated Login ID:', login_id);
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Bind parameters for the stored procedure call
            const bindParams = {
                p_username: username,
                p_password: password,
                p_name: name,
                p_description: description,
                p_email: email,
                p_city: city,
                p_street: street,
                p_house: house,
                p_phone: phone,
                p_login_id: login_id, // Send login_id as input parameter
                p_merch_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } // Output parameter for MERCH_ID
            };
    
            // Execute the stored procedure
            const result = await con.execute(
                `BEGIN 
                    RegisterMerchandiser(
                      :p_username, :p_password, :p_name, :p_description, :p_email, :p_city, :p_street, :p_house, :p_phone, :p_login_id, :p_merch_id
                    ); 
                 END;`,
                bindParams
            );
    
            const merchId = result.outBinds.p_merch_id;  // Retrieve the MERCH_ID from the output bind
            console.log(`Merchandiser registered with Merch ID: ${merchId} and Login ID: ${login_id}`);
    
            // Send success response
            res.status(201).send("Merchandiser registered successfully");
    
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
    
            // Define the PL/SQL block with a cursor for checking the username
            const plsql = `
            DECLARE
                CURSOR username_cursor IS
                    SELECT COUNT(*) AS count FROM USERS WHERE USER_NAME = :username;
                username_count NUMBER;
            BEGIN
                OPEN username_cursor;
                FETCH username_cursor INTO username_count;

                IF username_count > 0 THEN
                    :result := 'exists';
                ELSE
                    :result := 'available';
                END IF;

                CLOSE username_cursor;

            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    :result := 'available';  -- Handle the case where no data is found
                WHEN OTHERS THEN
                    :result := 'error';  -- Generic error handling
                    RAISE_APPLICATION_ERROR(-20003, 'An unexpected error occurred while checking the username.');
            END;
            `;
    
            // Execute the PL/SQL block with bind variables
            const bindVars = {
                username,
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
            };
            console.log('cursor working');
    
            const result = await con.execute(plsql, bindVars);
    
            console.log('Cursor result:', result.outBinds.result);
    
            if (result.outBinds.result === 'exists') {
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
    
            // Define the PL/SQL block with a cursor for checking the username
            const plsql = `
            DECLARE
                CURSOR merch_cursor IS
                    SELECT COUNT(*) AS count FROM MERCHANDISER WHERE USER_NAME = :username;
                merch_count NUMBER;
            BEGIN
                OPEN merch_cursor;
                FETCH merch_cursor INTO merch_count;

                IF merch_count > 0 THEN
                    :result := 'exists';
                ELSE
                    :result := 'available';
                END IF;

                CLOSE merch_cursor;

            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    :result := 'available';  -- If no data is found, we assume the username is available (shouldn't happen with COUNT)
                WHEN OTHERS THEN
                    :result := 'error';  -- For any other exceptions, set result to 'error'
                    RAISE_APPLICATION_ERROR(-20002, 'An unexpected error occurred while checking merchandiser username.');
            END;
            `;
    
            // Execute the PL/SQL block with bind variables
            const bindVars = {
                username,  // Input bind for username
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }  // Output bind for result
            };
    
            const result = await con.execute(plsql, bindVars);
    
            console.log('Cursor result:', result.outBinds.result);
    
            // Return the appropriate response based on the cursor result
            if (result.outBinds.result === 'exists') {
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
    
            // Define the PL/SQL block with a cursor for checking the company username
            const plsql = `
            DECLARE
                CURSOR company_cursor IS
                    SELECT COUNT(*) AS count FROM COMPANY WHERE USER_NAME = :username;
                company_count NUMBER;
            BEGIN
                OPEN company_cursor;  -- Open the cursor
                FETCH company_cursor INTO company_count;  -- Fetch the count into company_count

                IF company_count > 0 THEN
                    :result := 'exists';  -- Set output result if username exists
                ELSE
                    :result := 'available';  -- Set output result if username is available
                END IF;

                CLOSE company_cursor;  -- Close the cursor

            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    :result := 'available';  -- Handle case where no data is found (shouldn't occur with COUNT)
                WHEN OTHERS THEN
                    :result := 'error';  -- Handle any other exceptions
                    RAISE_APPLICATION_ERROR(-20001, 'An unexpected error occurred while checking username.');
            END;
            `;
    
            // Execute the PL/SQL block with bind variables
            const bindVars = {
                username,  // Input bind for username
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }  // Output bind for result
            };
    
            const result = await con.execute(plsql, bindVars);
    
            console.log('Cursor result:', result.outBinds.result);
    
            // Return the appropriate response based on the cursor result
            if (result.outBinds.result === 'exists') {
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
    
        const login_id = generateLoginId(username, password);  // Generate login_id in Node.js
        console.log('Generated Login ID:', login_id);
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Bind parameters for the stored procedure call
            const bindParams = {
                p_username: username,
                p_password: password,
                p_name: name,
                p_img: imageUrl,
                p_email: email,
                p_description: description,
                p_login_id: login_id, // Send the login_id as input
                p_com_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } // Output parameter for COM_ID
            };
    
            // Execute the stored procedure
            const result = await con.execute(
                `BEGIN 
                    RegisterCompany(
                      :p_username, :p_password, :p_name, :p_img, :p_email, :p_description, :p_login_id, :p_com_id
                    ); 
                 END;`,
                bindParams
            );
    
            const comId = result.outBinds.p_com_id;  // Retrieve the COM_ID from the output bind
            console.log(`Company registered with Company ID: ${comId} and Login ID: ${login_id}`);
    
            // Send success response
            res.status(201).send("Company registered successfully");
    
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
        // Get connection from the pool
        con = await pool.getConnection();
        if (!con) {
            return res.status(500).send("Connection Error");
        }

        // Execute the query to get user details
        const result = await con.execute(
            `SELECT USER_NAME, 
                    NAME, 
                    DOB, 
                    EMAIL, 
                    PHONE, 
                    TREAT(ADDRESS AS address_type).city AS CITY,
                    TREAT(ADDRESS AS address_type).street AS STREET,
                    TREAT(ADDRESS AS address_type).house AS HOUSE
             FROM USERS WHERE USER_ID = :user_id`,
            { user_id } // Named bind variables
        );

        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            // Send back the user data
            res.json(result.rows[0]);
            console.log("User Data sent");
        } else {
            // If no user was found, return 404
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        // Close the connection after the request is handled
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
    // route for USER PROFILE UPDATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/profile/user/update', async (req, res) => {
        const { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
        console.log('Received user profile update request:', { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE });
    
        // Validate that all fields are provided
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
    
            // Update the USERS table and set the ADDRESS column using the address_type object constructor
            const query = `
                UPDATE USERS 
                SET NAME = :NAME, 
                    DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), 
                    EMAIL = :EMAIL, 
                    PHONE = :PHONE, 
                    ADDRESS = address_type(:CITY, :STREET, :HOUSE)  -- Update the address object
                WHERE USER_ID = :user_id
            `;
    
            const result = await con.execute(query, {
                NAME, 
                DOB: formattedDOB, 
                EMAIL, 
                PHONE, 
                CITY, 
                STREET, 
                HOUSE, 
                user_id
            });
            console.log(`Query Result: ${JSON.stringify(result)}`);
    
            await con.commit();
    
            // Return the updated profile
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
    
        const rating = 0; // Default rating
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Fetch the next MEDIA_ID from the MEDIA_SEQ sequence
            const mediaIdResult = await con.execute(`SELECT MEDIA_SEQ.NEXTVAL AS media_id FROM dual`);
            const media_id = mediaIdResult.rows[0].MEDIA_ID;
    
            console.log('Generated Media ID:', media_id);
    
            // Insert media data into the database
            const result = await con.execute(
                `INSERT INTO MEDIA (MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE)
                VALUES (:media_id, :title, :description, :rating, 0, :type, :genres, :trailer, :poster, :duration, TO_DATE(:releaseDate, 'YYYY-MM-DD'), :episode)`,
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
    
            // const mediaList = result.rows.map(data => ({
            //     id: data.MEDIA_ID,
            //     img: data.POSTER,
            //     title: data.TITLE,
            //     description: data.DESCRIPTION,
            //     companyName: data.COMPANY_NAME
            // }));
    
            res.send(result.rows);
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

        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        // Insert news into NEWSANDUPDATES table, generating NEWS_ID using sequence
        const newsResult = await con.execute(
            `INSERT INTO NEWSANDUPDATES (NEWS_ID, DESCRIPTION, HEADLINE)
             VALUES (NEWSANDUPDATES_SEQ.NEXTVAL, :description, :headline)`,
            {
                description,
                headline: topic
            }
        );
        console.log(`News Insert Result: ${JSON.stringify(newsResult)}`);

        // Get the newly generated NEWS_ID
        const newsIdResult = await con.execute(
            `SELECT NEWSANDUPDATES_SEQ.CURRVAL AS news_id FROM dual`
        );
        const news_id = newsIdResult.rows[0].NEWS_ID;
        console.log('Generated News ID:', news_id);

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
    
            // Fetch company details
            const companyQuery = `SELECT * FROM COMPANY WHERE COM_ID = :companyID`;
            const companyResult = await con.execute(companyQuery, { companyID });
    
            // Fetch company news from the COMPANY_NEWS_DETAILS view
            const newsQuery = `
                SELECT MEDIA_TITLE, NEWS_ID, DESCRIPTION, HEADLINE, NEWS_DATE
                FROM COMPANY_NEWS_DETAILS
                WHERE COM_ID = :companyID
            `;
            const newsResult = await con.execute(newsQuery, { companyID });
    
            if (!companyResult.rows.length) {
                res.status(404).send("Company not found");
                return;
            }
    
            const companyData = companyResult.rows[0];
            companyData.news = newsResult.rows;
    
            res.send(companyData);
            console.log("Company Data sent", companyData);
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


    app.post('/user/order', async (req, res) => {
        const { user_id, items, order_date, order_time } = req.body;
        console.log('Received order request:', { user_id, items, order_date, order_time });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            for (const item of items) {
                const result = await con.execute(
                    `INSERT INTO USERORDERSPRODUCT (USER_ID, PRO_ID, DELIVERY_STATUS, ORDER_DATE, ORDER_TIME, ORDER_QUANTITY)
                     VALUES (:user_id, :pro_id, 'PENDING', TO_DATE(:order_date, 'DD-MM-YYYY'), :order_time, :quantity)`,
                    { user_id, pro_id: item.PRO_ID, order_date, order_time, quantity: item.quantity }
                );
                console.log(`Order Insert Result for Product ${item.PRO_ID}: ${JSON.stringify(result)}`);
            }
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Order placed successfully");
            console.log("Order placed successfully");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                con.close();
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
            console.log('Received media request');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            const result = await con.execute(
                `SELECT * FROM MEDIA_VIEW`
            );
    
            const transformData = (data) => ({
                id: data.MEDIA_ID,
                img: data.POSTER,
                title: data.TITLE,
                description: data.DESCRIPTION,
                rating: data.RATING, // Assuming the rating is in the required scale
                releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                type: data.TYPE,
                episodes: data.EPISODE || 0,
                duration: data.DURATION,
                genre: data.GENRE ? data.GENRE.split(',').map(g => g.trim()) : [],
                companyName: 'Example Productions',
                role: [],
                news: [],
                review: []
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
                SELECT * FROM MEDIA_SEARCH
                WHERE LOWER(TITLE) LIKE LOWER(:searchTerm)
                ${genreFilter}
                ${mediaTypeFilter}
                ORDER BY RATING DESC
            `;
    
            // Execute the query with the search term and selected media type
            const result = await con.execute(query, { searchTerm: `%${searchTerm}%`, selectedMediaType });
    
            const transformData = (data) => ({
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
            });
    
            const transformedData = result.rows.map(transformData);
    
            res.send(transformedData);
            console.log("Search Data sent:", transformedData);
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
                `SELECT * FROM MEDIA WHERE UPPER(TITLE) LIKE UPPER(:searchTerm) ${genreFilter} ORDER BY RATING DESC`,
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
    
            // Fetch media details using the MEDIA_COMPANY_DETAILS view
            const mediaResult = await con.execute(
                `SELECT * FROM MEDIA_COMPANY_DETAILS WHERE MEDIA_ID = :id`, 
                { id }
            );
    
            if (!mediaResult.rows.length) {
                res.status(404).send("Media not found");
                return;
            }
    
            // Fetch associated roles using the MEDIA_ROLE_DETAILS view
            const roleResult = await con.execute(
                `SELECT * FROM MEDIA_ROLE_DETAILS WHERE MEDIA_ID = :id`,
                { id }
            );
    
            // Fetch news related to the media using the MEDIA_NEWS_DETAILS view
            const newsResult = await con.execute(
                `SELECT * FROM MEDIA_NEWS_DETAILS WHERE MEDIA_ID = :id`,
                { id }
            );
    
            // Fetch reviews for the media using the MEDIA_REVIEW_DETAILS view
            const reviewResult = await con.execute(
                `SELECT * FROM MEDIA_REVIEW_DETAILS WHERE MEDIA_ID = :id`,
                { id }
            );
    
            // Transform the data
            const mediaData = mediaResult.rows[0];
            const transformedData = {
                id: mediaData.MEDIA_ID,
                img: mediaData.POSTER,
                title: mediaData.TITLE,
                description: mediaData.DESCRIPTION,
                rating: mediaData.RATING,
                releaseDate: new Date(mediaData.RELEASE_DATE).toISOString().split('T')[0],
                type: mediaData.TYPE,
                episodes: mediaData.EPISODE || 0,
                duration: mediaData.DURATION,
                genre: mediaData.GENRE ? mediaData.GENRE.split(',').map(g => g.trim()) : [],
                trailer: mediaData.TRAILER,
                companyName: mediaData.COMPANY_NAME,
                role: roleResult.rows, // Roles from MEDIA_ROLE_DETAILS
                news: newsResult.rows.map(row => ({
                    topic: row.HEADLINE,
                    description: row.DESCRIPTION,
                    date: row.NEWS_DATE
                })),
                review: reviewResult.rows.map(row => ({
                    name: row.REVIEWER_NAME,
                    id: row.R_ID,
                    description: row.DESCRIPTION,
                    rating: row.RATING,
                    date: row.REVIEW_DATE
                }))
            };
    
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
    // ROUTE FOR MEDIA add review
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/review/add', async (req, res) => {
        const { user_id, media_id, rating, description } = req.body;
        console.log('Received add review request:', { user_id, media_id, description, rating });

        if (!media_id || !user_id || !rating || !description) {
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

            const review_id = generateReviewId(description);
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

            // Insert review into REVIEWRATING table
            await con.execute(
                `INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
                VALUES (:review_id, :description, :rating, 'MEDIA', TO_DATE(:review_date, 'YYYY-MM-DD'))`,
                { review_id, description, rating, review_date: currentDate }, { autoCommit: true }
            );
            console.log(`Review Insert time: ${currentDate}`);
            // Insert into USERGIVEREVIEW table
            await con.execute(
                `INSERT INTO USERGIVEREVIEW (R_ID, USER_ID)
                VALUES (:review_id, :user_id)`,
                { review_id, user_id }, { autoCommit: true }
            );

            // Insert into REVIEWABOUTMEDIA table
            await con.execute(
                `INSERT INTO REVIEWABOUTMEDIA (MEDIA_ID, R_ID)
                VALUES (:media_id, :review_id)`,
                { media_id, review_id }, { autoCommit: true }
            );

            //get previous rating_count and rating
            const previousRating = await con.execute(
                `SELECT RATING, RATING_COUNT FROM MEDIA WHERE MEDIA_ID = :media_id`,
                { media_id }
            );
            const previousRatingCount = previousRating.rows[0].RATING_COUNT;
            const previousRatingValue = previousRating.rows[0].RATING;
            //calculate new rating
            const newRating = ((previousRatingValue * previousRatingCount) + rating) / (previousRatingCount + 1);
            //update rating and rating_count
            await con.execute(
                `UPDATE MEDIA SET RATING = :newRating, RATING_COUNT = RATING_COUNT + 1 WHERE MEDIA_ID = :media_id`,
                { newRating, media_id } , { autoCommit: true }
            );

            // Commit the transaction
            await con.commit();
            res.status(201).send("Review added successfully");
            console.log("Review added successfully");
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
    // ROUTE FOR MEDIA REVIEW
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/media/review', async (req, res) => {
        const { id } = req.body;
        console.log('Received media review request:', id);

        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT REVIEWRATING.R_ID, REVIEWRATING.DESCRIPTION, REVIEWRATING.RATING, USERS.NAME
                FROM REVIEWRATING
                JOIN USERGIVEREVIEW ON REVIEWRATING.R_ID = USERGIVEREVIEW.R_ID
                JOIN REVIEWABOUTMEDIA ON REVIEWRATING.R_ID = REVIEWABOUTMEDIA.R_ID
                JOIN USERS ON USERGIVEREVIEW.USER_ID = USERS.USER_ID
                WHERE REVIEWABOUTMEDIA.MEDIA_ID = :id
                ORDER BY REVIEWRATING.REVIEW_DATE DESC`,
                { id }, { autoCommit: true }
            );
            console.log(`Query Result: `, result.rows);

            if (!result.rows.length) {
                res.status(404).send("No reviews found for the given media");
                return;
            }

            const transformData = (data) => ({
                id: data.R_ID,
                name: data.NAME,
                description: data.DESCRIPTION,
                rating: data.RATING
            });

            const transformedData = result.rows.map(transformData);

            res.send(transformedData);
            console.log("Review Data sent");
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
    // ROUTE FOR product review fetch
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/products/review', async (req, res) => {
        const { id } = req.body;
        console.log('Received product review request:', id);

        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT REVIEWRATING.R_ID, REVIEWRATING.DESCRIPTION, REVIEWRATING.RATING, USERS.NAME
                FROM REVIEWRATING
                JOIN USERGIVEREVIEW ON REVIEWRATING.R_ID = USERGIVEREVIEW.R_ID
                JOIN REVIEWABOUTPRODUCT ON REVIEWRATING.R_ID = REVIEWABOUTPRODUCT.R_ID
                JOIN USERS ON USERGIVEREVIEW.USER_ID = USERS.USER_ID
                WHERE REVIEWABOUTPRODUCT.PRO_ID = :id
                ORDER BY REVIEWRATING.REVIEW_DATE DESC`,
                { id }, { autoCommit: true }
            );
            console.log(`Query Result: `, result.rows);

            if (!result.rows.length) {
                res.status(404).send("No reviews found for the given product");
                return;
            }

            const transformData = (data) => ({
                id: data.R_ID,
                name: data.NAME,
                description: data.DESCRIPTION,
                rating: data.RATING
            });

            const transformedData = result.rows.map(transformData);
            
            res.send(transformedData);
            console.log("Review Data sent");
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
    // ROUTE FOR PRODUCT ADD REVIEW
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/products/review/add', async (req, res) => {
        const { user_id, product_id, rating, description } = req.body;
        console.log('Received add review request:', { user_id, product_id, description, rating });
    
        if (!product_id || !user_id || !rating || !description) {
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
    
            const review_id = generateReviewId(description);
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
            // Insert review into REVIEWRATING table
            await con.execute(
                `INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
                VALUES (:review_id, :description, :rating, 'PRODUCT', TO_DATE(:review_date, 'YYYY-MM-DD'))`,
                { review_id, description, rating, review_date: currentDate }
            );
    
            // Insert into USERGIVEREVIEW table
            await con.execute(
                `INSERT INTO USERGIVEREVIEW (R_ID, USER_ID)
                VALUES (:review_id, :user_id)`,
                { review_id, user_id }
            );
    
            // Insert into REVIEWABOUTPRODUCT table
            await con.execute(
                `INSERT INTO REVIEWABOUTPRODUCT (PRO_ID, R_ID)
                VALUES (:product_id, :review_id)`,
                { product_id, review_id }
            );
    
            // Step 1: Retrieve current rating and rating count from PRODUCTS table
            const productResult = await con.execute(
                `SELECT RATING, RATING_COUNT FROM PRODUCTS WHERE PRO_ID = :product_id`,
                { product_id }
            );
    
            if (productResult.rows.length === 0) {
                throw new Error("Product not found");
            }
    
            // Access the first row from the result (as an array)
            const currentRating = productResult.rows[0][0]; // RATING
            const ratingCount = productResult.rows[0][1];   // RATING_COUNT
    
            // Step 2: Calculate the new average rating
            const newRatingCount = (ratingCount || 0) + 1;  // Increment rating count
            const newRating = ((currentRating || 0) * (ratingCount || 0) + rating) / newRatingCount;
    
            // Step 3: Update the PRODUCTS table with the new rating and rating count
            await con.execute(
                `UPDATE PRODUCTS 
                 SET RATING = :newRating, 
                     RATING_COUNT = :newRatingCount 
                 WHERE PRO_ID = :product_id`,
                { newRating, newRatingCount, product_id }
            );
    
            // Commit the transaction
            await con.commit();
            res.status(201).send("Review added successfully and product rating updated");
            console.log("Review added and product rating updated successfully");
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
    // ROUTE for all products
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.get('/products', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            console.log('Received product request');
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT * FROM PRODUCTS
                ORDER BY RATING DESC`
            );

            // const transformData = (data) => ({
            //     id: data.PRO_ID,
            //     img: data.IMG_SRC,
            //     title: data.TITLE,
            //     description: data.DESCRIPTION,
            //     rating: data.RATING,
            //     price: data.PRICE,
            //     stock: data.STOCK,
            //     category: data.CATEGORY,
            //     review: []
            // });

            // const transformedData = result.rows.map(transformData);

            // res.send(transformedData);
            res.send(result.rows);
            console.log("Product Data sent");
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

    app.post('/media/featured1', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            
            const mediaIds = req.body.mediaIds; // Assuming mediaIds is an array of IDs sent in the request body
            
            if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
                res.status(400).send("Invalid media IDs");
                return;
            }
            
            console.log('Received media IDs:', mediaIds);
            
            // Create a SQL query to fetch media details for the given IDs
            const query = `
                SELECT *
                FROM MEDIA
                WHERE MEDIA_ID IN (${mediaIds.map(id => `'${id}'`).join(',')})
            `;
            
            const result = await con.execute(query);
            
            const transformData = (data) => ({
                id: data.MEDIA_ID,
                title: data.TITLE,
                description: data.DESCRIPTION,
                rating: data.RATING,
                ratingCount: data.RATING_COUNT,
                type: data.TYPE,
                genre: data.GENRE,
                trailer: data.TRAILER,
                poster: data.POSTER, 
                duration: data.DURATION,
                releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                episodes: data.EPISODE || 0,
                
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
                SELECT MEDIA_ID, TITLE, IMG_SRC, DESCRIPTION
                FROM MEDIA_FEATURED
            `;
            const result = await con.execute(query);
        
            const transformData = (data) => ({
                id: data.MEDIA_ID,
                title: data.TITLE,
                imgSrc: data.IMG_SRC,
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
    // ROUTE FOR FEATURED PRODUCTS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/media/products', async (req, res) => {
        let { media_id } = req.body;
        console.log('Received media product request:', media_id);
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT * FROM PRODUCTS
                WHERE PRO_ID IN (
                    SELECT PRO_ID FROM PRODUCTBASEDONMEDIA
                    WHERE MEDIA_ID = :media_id
                )`,
                { media_id }
            );
            // console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Product Data sent");
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
    
            
            
            const checkResult = await con.execute(
                `SELECT * FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );
            if(checkResult.rows.length === 0){
                const result = await con.execute(
                    `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, STATUS)
                    VALUES (:user_id, :media_id, :status)`,
                    { user_id, media_id, status }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Media added to list successfully");
            }
            else {
                const result = await con.execute(
                    `UPDATE USERWATCHANDFAVORITE 
                    SET STATUS = :status
                    WHERE USER_ID = :user_id
                    AND MEDIA_ID = :media_id`,
                    { user_id, media_id, status }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Media added to list successfully");
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
        console.log('Received WATCHED request:', { user_id });
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
            console.log("Watched Data sent");
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
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR FAVORITE for my list
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    app.post('/media/favorite/mylist', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received favorite request:', { user_id });
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
                    AND FAVORITE = 'Y'
                )`,
                { user_id }
            );
            // console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("Favorite Data sent");
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



    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR FAVORITE
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
    app.post('/media/favorite', async (req, res) => {
        const { user_id , media_id , is_favorite } = req.body;
        console.log('Received favorite request:', { user_id, media_id, is_favorite });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            let status = is_favorite ? 'Y' : 'N';
            

            const checkResult = await con.execute(
                `SELECT * FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );
            if(checkResult.rows.length === 0){
                    
                const result = await con.execute(
                    `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE)
                    VALUES (:user_id, :media_id, :status)`,
                    { user_id, media_id, status }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Favorite status updated successfully");
            }
            else {
                const result = await con.execute(
                    `UPDATE USERWATCHANDFAVORITE 
                    SET FAVORITE = :status
                    WHERE USER_ID = :user_id
                    AND MEDIA_ID = :media_id`,
                    { user_id, media_id, status }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Favorite status updated successfully");
            }
            console.log("Favorite status updated successfully");
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
    // ROUTE FOR FAVORITE STATUS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/media/favorite/status', async (req, res) => {
        const { user_id, media_id } = req.body;
        console.log('Received favorite status request:', { user_id, media_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `SELECT FAVORITE FROM USERWATCHANDFAVORITE
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );
            // console.log(`Query Result: `, result.rows);
            // if favorite is 'Y' then it is favorite else not favorite
            // if favorite then send status 200 else 404
            if (result.rows.length === 0) {
                res.status(404).send("Not found");
            } else {
                if(result.rows[0].FAVORITE === 'Y'){
                    res.status(200).send("Favorite");
                }
                else{
                    res.status(404).send("Not favorite");
                }
            }
            console.log("Favorite Status Data sent");


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
    // ROUTE FOR DELETE FROM FAVORITE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/favorite/delete', async (req, res) => {
        const { user_id, media_id } = req.body;
        console.log('Received delete request for favorite:', { user_id, media_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const checkResult = await con.execute(
                `SELECT * FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );

            console.log(`Query Result: `, checkResult.rows);

            if(checkResult.rows.length === 0){
                res.status(404).send("Record not found or already deleted");
            }
            else {
                if(checkResult.rows[0].STATUS === 'WATCHED' || checkResult.rows[0].STATUS === 'PLAN_TO_WATCH'){
                    const result = await con.execute(
                        `UPDATE USERWATCHANDFAVORITE
                        SET FAVORITE = NULL
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                } else{
                    //delete the row
                    const result = await con.execute(
                        `DELETE FROM USERWATCHANDFAVORITE
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                }

                console.log(`Query Result: `, result);
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
          
            const checkResult = await con.execute(
                `SELECT * FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );

            console.log(`Query Result: `, checkResult.rows);

            if(checkResult.rows.length === 0){
                res.status(404).send("Record not found or already deleted");
            } else {


                if(checkResult.rows[0].FAVORITE === 'Y'){
                    
                    const result = await con.execute(
                        `UPDATE USERWATCHANDFAVORITE
                        SET STATUS = NULL
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                } else{
                    //delete teh row
                    const result = await con.execute(
                        `DELETE FROM USERWATCHANDFAVORITE
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                }
                console.log(`Query Result: `, result);
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

            const checkResult = await con.execute(
                `SELECT * FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = :user_id
                AND MEDIA_ID = :media_id`,
                { user_id, media_id }
            );

            console.log(`Query Result: `, checkResult.rows);

            if(checkResult.rows.length === 0){
                res.status(404).send("Record not found or already deleted");
            }
            else {
                if(checkResult.rows[0].FAVORITE === 'Y'){
                    
                    const result = await con.execute(
                        `UPDATE USERWATCHANDFAVORITE
                        SET STATUS = NULL
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                } else{
                    //delete the row
                    const result = await con.execute(
                        `DELETE FROM USERWATCHANDFAVORITE
                        WHERE USER_ID = :user_id
                        AND MEDIA_ID = :media_id`,
                        { user_id, media_id }, { autoCommit: true }
                    );
                }

                console.log(`Query Result: `, result);
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
    // ROUTE FOR LIST OF ROLES
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/favorite/roles', async (req, res) => {
        const { user_id } = req.body;
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received roles request');
            const result = await con.execute(
                `SELECT ROLE.ROLE_ID, ROLE.NAME, ROLE.IMG, ROLE.ROLE_TYPE FROM 
                ROLE JOIN PREFERENCEFORROLE
                ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
                where PREFERENCEFORROLE.USER_ID = :user_id
                ORDER BY ROLE.NAME ASC`,
                { user_id }
            );
            // console.log(`Query Result: `, result.rows);
            res.send(result.rows);
            console.log("----------Roles Data sent");
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
    // ROUTE FOR ROLE delete
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/favorite/roles/delete', async (req, res) => {
        const { user_id, role_id } = req.body;
        console.log('Received delete request for role:', { user_id, role_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const checkResult = await con.execute(
                `SELECT * FROM PREFERENCEFORROLE
                WHERE USER_ID = :user_id
                AND ROLE_ID = :role_id`,
                { user_id, role_id }
            );

            console.log(`Query Result: `, checkResult.rows);

            if(checkResult.rows.length === 0){
                res.status(404).send("Record not found or already deleted");
            }
            else {
                const result = await con.execute(
                    `DELETE FROM PREFERENCEFORROLE
                    WHERE USER_ID = :user_id
                    AND ROLE_ID = :role_id`,
                    { user_id, role_id }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
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
    // ROUTE FOR favorite toggle
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/media/favorite/role', async (req, res) => {
        const { user_id, role_id, is_favorite } = req.body;
        console.log('Received favorite request:', { user_id, role_id, is_favorite });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            let status = is_favorite ? 'Y' : 'N';
            if(status === 'Y'){
                const result = await con.execute(
                    `INSERT INTO PREFERENCEFORROLE (USER_ID, ROLE_ID)
                    VALUES (:user_id, :role_id)`,
                    { user_id, role_id }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Role added to favorite successfully");
            }
            else {
                const result = await con.execute(
                    `DELETE FROM PREFERENCEFORROLE
                    WHERE USER_ID = :user_id
                    AND ROLE_ID = :role_id`,
                    { user_id, role_id }, { autoCommit: true }
                );
                console.log(`Query Result: `, result);
                res.send("Role removed from favorite successfully");
            }
            console.log("Favorite status updated successfully");
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
    // ROUTE FOR ROLE FAVORITE STATUS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

    app.post('/media/favorite/role/status', async (req, res) =>{
        const { user_id , role_id } = req.body;
        console.log('------------\nReceived favorite status request:', { user_id, role_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `SELECT * FROM PREFERENCEFORROLE
                WHERE USER_ID = :user_id
                AND ROLE_ID = :role_id
                `,
                { user_id, role_id }
            );
            console.log("-----------Favorite Status Data of Role sent");

            if(result.rows.length === 0){
                res.status(404).send("Not favorite");
            } else {
                res.status(200).send("Favorite");
            }

        } catch (err) {
            console.error("Error during database query:", err);
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
    // ROUTE FOR DISCUSSION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
                `SELECT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT , DISCUSSIONABOUTMEDIA.DIS_DATE ,MEDIA.POSTER
                FROM DISCUSSION JOIN DISCUSSIONABOUTMEDIA 
                    ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
                JOIN MEDIA 
                    ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
                ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC`
            );
            // console.log(`Query Result: `,result.rows);
            
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
    // ROUTE FOR my DISCUSSION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.post('/discussions/my', async (req, res) => {
        const { user_id } = req.body;
        console.log('Fetching discussions for user:', user_id);
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log(user_id);
            const result = await con.execute(
                `SELECT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT, DISCUSSIONABOUTMEDIA.DIS_DATE ,MEDIA.POSTER
                FROM DISCUSSION JOIN DISCUSSIONABOUTMEDIA 
                    ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
                JOIN MEDIA 
                    ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
                JOIN USERSTARTDISCUSSION 
                    ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
                WHERE USERSTARTDISCUSSION.USER_ID = :user_id
                ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC`,
                { user_id }
            );
            console.log(`Query Result: `, result.rows);
            res.status(200).send(result.rows);
            console.log("User Discussions Data sent");
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
                FROM DISCUSSION
                JOIN USERSTARTDISCUSSION ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
                JOIN USERS ON USERSTARTDISCUSSION.USER_ID = USERS.USER_ID
                WHERE DISCUSSION.PARENT_TOPIC = :discussion_id
                ORDER BY DISCUSSION.REPLY_COUNT ASC`,
                { discussion_id }
            );
            // console.log(`Query Result: `, result.rows);
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
                `SELECT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT , DISCUSSIONABOUTMEDIA.DIS_DATE
                FROM DISCUSSION
                JOIN DISCUSSIONABOUTMEDIA ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID
                JOIN MEDIA ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
                WHERE MEDIA.MEDIA_ID = :id
                `,
                { id }
            );
            // console.log(`Query Result: `, result.rows);
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
    // ROUTE FOR ADD DISCUSSION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/discussions/add', async (req, res) => { 
        const { user_id, media_id, topic, description } = req.body;
        console.log('Received add discussion request:', { user_id, media_id, topic, description });
        const dis_id = generateDiscussionId(topic);
        console.log('Generated Discussion ID:', dis_id);
        const dis_date = new Date().toISOString().split('T')[0]; 
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, TOPIC, REPLY_COUNT, PARENT_TOPIC)
                VALUES (:dis_id, :description, :topic, 0, NULL)`,
                { dis_id, description, topic }
            );
            console.log(`Discussion Insert Result: ${JSON.stringify(result)}`);
            const userDiscussionResult = await con.execute(
                `INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
                VALUES (:dis_id, :user_id)`,
                { user_id, dis_id }
            );
            console.log(`User-Discussion Insert Result: ${JSON.stringify(userDiscussionResult)}`);
            const mediaDiscussionResult = await con.execute(
                `INSERT INTO DISCUSSIONABOUTMEDIA (DIS_ID, MEDIA_ID,DIS_DATE)
                VALUES (:dis_id, :media_id, TO_DATE(:dis_date, 'YYYY-MM-DD'))`,
                { dis_id, media_id, dis_date }
            );
            console.log(`Media-Discussion Insert Result: ${JSON.stringify(mediaDiscussionResult)}`);
            await con.commit();
            res.status(201).send("Discussion added successfully");
            console.log("Discussion added successfully");
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
    // ROUTE FOR ADD DISCUSSION REPLY
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/discussions/add/reply', async (req, res) => {
        let { user_id, discussion_id, description, replyCount} = req.body;
        console.log('Received add discussion reply request:', { user_id, discussion_id, description, replyCount });
        const dis_id = generateDiscussionId(description);
        console.log('Generated Discussion ID:', dis_id);
        const dis_date = new Date().toISOString().split('T')[0];
        replyCount = replyCount + 1;
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            const result = await con.execute(
                `INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, REPLY_COUNT, PARENT_TOPIC)
                VALUES (:dis_id, :description, :replyCount, :discussion_id)`,
                { dis_id, description, replyCount, discussion_id }
            );
            console.log(`Discussion Insert Result: ${JSON.stringify(result)}`);
            const userDiscussionResult = await con.execute(
                `INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
                VALUES (:dis_id, :user_id)`,
                { dis_id, user_id }
            );
            console.log(`User-Discussion Insert Result: ${JSON.stringify(userDiscussionResult)}`);
            await con.execute(
                `UPDATE DISCUSSION SET REPLY_COUNT= (
                    select REPLY_COUNT from DISCUSSION WHERE DIS_ID = :dis_id
                    ) 
                WHERE DIS_ID = :discussion_id`,
                { dis_id, discussion_id }
            );
            console.log(`Reply Count Updated`);
            await con.commit();
            res.status(201).send("Discussion reply added successfully");
            console.log("Discussion reply added successfully");
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
                    MEDIA.TITLE AS MEDIA_TITLE,
                    MEDIA.MEDIA_ID AS MEDIA_ID,
                    MEDIA.POSTER AS MEDIA_POSTER
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
                media_title: row.MEDIA_TITLE,
                media_id: row.MEDIA_ID,
                media_poster: row.MEDIA_POSTER
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

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // route for add role
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.post('/admin/addrole', async (req, res) => {
        const {
            name,
            roleType,
            img,
            imgUrl
        } = req.body;
    
        console.log('Received add role request:', { name, roleType, img, imgUrl });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Insert role data into the ROLE table with auto-generated ROLE_ID from ROLE_SEQ
            const roleResult = await con.execute(
                `INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE)
                 VALUES (ROLE_SEQ.NEXTVAL, :name, :imgUrl, :roleType)`,
                {
                    name,
                    imgUrl,
                    roleType
                }
            );
            console.log(`Role Insert Result: ${JSON.stringify(roleResult)}`);
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Role added successfully");
            console.log("Role added successfully");
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
    // route for fetch medias
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    app.get('/medias', async (req, res) => {
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received Media request');
            const result = await con.execute(
                `SELECT * FROM MEDIA`
            );
            console.log(`Query Result: `,result.rows);

            

            res.send(result.rows);
            console.log("MEDIA Data sent");
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
    // ROUTE FOR ADD PRODUCT
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/addproduct', async (req, res) => {
        const {
            name,
            description,
            price,
            quantity,
            image,
            imageUrl,
            media,
            merchId
        } = req.body;
    
        console.log('Received add product request:', { name, description, price, quantity, imageUrl, media, merchId });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Fetch the next PRO_ID from the PRODUCTS_SEQ sequence
            const productIdResult = await con.execute(`SELECT PRODUCTS_SEQ.NEXTVAL AS pro_id FROM dual`);
            const pro_id = productIdResult.rows[0].PRO_ID;
            console.log('Generated Product ID:', pro_id);
    
            // Insert product data into the PRODUCTS table
            const productResult = await con.execute(
                `INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY)
                 VALUES (:pro_id, :name, :description, :image, :price, :quantity)`,
                {
                    pro_id,
                    name,
                    description,
                    image: imageUrl,
                    price,
                    quantity
                }
            );
            console.log(`Product Insert Result: ${JSON.stringify(productResult)}`);
    
            // Insert product and media association into PRODUCTBASEDONMEDIA
            for (const mediaItem of media) {
                try {
                    const mediaResult = await con.execute(
                        `INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID)
                         VALUES (:pro_id, :media_id)`,
                        {
                            pro_id,
                            media_id: mediaItem
                        }
                    );
                    console.log(`Media Insert Result for Media ID ${mediaItem.media_id}: ${JSON.stringify(mediaResult)}`);
                } catch (mediaErr) {
                    console.error(`Error inserting media ID ${mediaItem.media_id}: `, mediaErr);
                    throw mediaErr;
                }
            }
    
            // Insert product and merch association into MERCHPRODUCEPROD
            const merchProductResult = await con.execute(
                `INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID)
                 VALUES (:pro_id, :merchId)`,
                {
                    pro_id,
                    merchId
                }
            );
            console.log(`Merch-Product Insert Result: ${JSON.stringify(merchProductResult)}`);
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Product added successfully");
            console.log("Product added successfully");
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
    // route for MERCHANDISER HOME MY PRODUCT
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/home/myproduct', async (req, res) => {
        const { mer_id } = req.body;
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Get all product details 

            const result = await con.execute(
                `SELECT PRODUCTS.* 
                FROM MERCHANDISER, MERCHPRODUCEPROD ,PRODUCTS 
                WHERE MERCHANDISER.MER_ID = MERCHPRODUCEPROD.MER_ID
                AND PRODUCTS.PRO_ID = MERCHPRODUCEPROD.PRO_ID
                AND MERCHANDISER.MER_ID = :mer_id`,
                { mer_id }
            );
            console.log(`Query Result: `, result.rows);

            const List = result.rows.map(data => ({
                PRO_ID: data.PRO_ID,
                NAME: data.NAME,
                DESCRIPTION: data.DESCRIPTION,
                IMAGE: data.IMAGE,
                PRICE: data.PRICE,
                QUANTITY: data.QUANTITY
            }));
    
            res.send(List);
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
    // ROUTE FOR MERCHANDISER COLLABORATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/merchandiser/collaborate', async (req, res) => {
        const {
            com_id,
            mer_id,
            description,
            status
        } = req.body;
    
        console.log('Received merchandiser collaborate request:', { com_id, mer_id, description, status });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Check if there are any existing entries with the same com_id
            const existingEntriesQuery = await con.execute(
                `SELECT COUNT(*) AS COUNT FROM COLLABORATE WHERE COM_ID = :com_id AND MER_ID = :mer_id`,
                { com_id, mer_id }
            );
    

            const count = existingEntriesQuery.rows[0].COUNT;
            console.log(`Existing entries with COM_ID ${com_id} and MER_ID ${mer_id}: ${count}`);
    
            // If there are existing entries, delete them
            if (count > 0) {
                await con.execute(
                    `DELETE FROM COLLABORATE WHERE COM_ID = :com_id AND MER_ID = :mer_id`,
                    { com_id, mer_id }
                );
                console.log(`Deleted existing entries with COM_ID ${com_id} and MER_ID ${mer_id}`);
            }
    
            // Fetch all products associated with the merchandiser
            const productQuery = await con.execute(
                `SELECT PRO_ID FROM MERCHPRODUCEPROD WHERE MER_ID = :mer_id`,
                { mer_id }
            );
            console.log(`Query Result: `, productQuery.rows);
    
            // Insert product associated with the merchandiser into collaborate
            for (const prod of productQuery.rows) { // Use productQuery.rows to iterate
                try {
                    const result = await con.execute(
                        `INSERT INTO COLLABORATE (PRO_ID, COM_ID, MER_ID, DESCRIPTION, C_STATUS)
                        VALUES (:pro_id, :com_id, :mer_id, :description, :status)`,
                        {
                            pro_id: prod.PRO_ID, // Use the correct column name in uppercase
                            com_id,
                            mer_id,
                            description,
                            status
                        }
                    );
                    console.log(`Product Insert Result for product ID ${prod.PRO_ID}: ${JSON.stringify(result)}`);
                } catch (prodErr) {
                    console.error(`Error inserting product ID ${prod.PRO_ID}: `, prodErr);
                    throw prodErr; // Correct the error thrown
                }
            }
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Collaborate requested successfully");
            console.log("Collaborate requested successfully");
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
    // ROUTE FOR MERCHANDISER SHOW ALL COLLABORATE STATUS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/merchandiser/collaborate/status', async (req, res) => {
        const { mer_id } = req.body;
        console.log('Received merchandiser collaborate status request:', { mer_id });
        if (!mer_id) {
            return res.status(400).send("Merchandiser ID is required");
        }
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Get all collaborate details
            const result = await con.execute(
                `SELECT C.NAME,
                        COL.MER_ID,
                        COL.COM_ID,
                        COL.DESCRIPTION,
                        COL.C_STATUS,
                        (SELECT COUNT(P.PRO_ID)
                         FROM PRODUCTS P
                         JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                         JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                         WHERE CHM.COM_ID = COL.COM_ID
                         AND P.PRO_ID IN (
                             SELECT PRO_ID
                             FROM MERCHPRODUCEPROD
                             WHERE MER_ID = COL.MER_ID
                         )
                        ) AS PRODUCT_COUNT
                 FROM COLLABORATE COL
                 JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
                 WHERE COL.MER_ID = :mer_id
                 GROUP BY C.NAME, COL.MER_ID, COL.COM_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID`,
                { mer_id }
            );
            
    
            console.log(`Query Result: `, result.rows);
    
            const List = result.rows.map(data => ({
                MER_ID: data.MER_ID,
                COM_ID: data.COM_ID,
                MER_NAME: data.NAME,
                DESCRIPTION: data.DESCRIPTION,
                C_STATUS: data.C_STATUS,
                PRODUCT_COUNT: data.PRODUCT_COUNT,
            }));
    
            res.send(List);
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
    // ROUTE FOR MERCHANDISER/COMPANY DELETE COLLABORATE STATUS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/collaborate/delete', async (req, res) => {
        const {
            com_id,
            mer_id
        } = req.body;
    
        console.log('Received delete collaborate request:', { com_id, mer_id });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Check if there are any existing entries with the same com_id
            const existingEntriesQuery = await con.execute(
                `SELECT COUNT(*) AS COUNT FROM COLLABORATE WHERE COM_ID = :com_id AND MER_ID = :mer_id`,
                { com_id, mer_id }
            );
    

            const count = existingEntriesQuery.rows[0].COUNT;
            console.log(`Existing entries with COM_ID ${com_id} and MER_ID ${mer_id}: ${count}`);
    
            // If there are existing entries, delete them
            if (count > 0) {
                await con.execute(
                    `DELETE FROM COLLABORATE WHERE COM_ID = :com_id AND MER_ID = :mer_id`,
                    { com_id, mer_id }
                );
                console.log(`Deleted existing entries with COM_ID ${com_id} and MER_ID ${mer_id}`);
            }
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Collaborate Deleted successfully");
            console.log("Collaborate Deleted successfully");
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
    // ROUTE FOR COMPANY SHOW COLLABORATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/company/collaborate/show', async (req, res) => {
        const { com_id } = req.body;
    
        if (!com_id) {
            return res.status(400).send("Company ID is required");
        }
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Get all collaborate details
            const result = await con.execute(
                `SELECT C.NAME,
                        COL.MER_ID,
                        COL.DESCRIPTION,
                        COL.C_STATUS,
                        (SELECT COUNT(P.PRO_ID)
                         FROM PRODUCTS P
                         JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                         JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                         WHERE CHM.COM_ID = COL.COM_ID
                         AND P.PRO_ID IN (
                             SELECT PRO_ID
                             FROM MERCHPRODUCEPROD
                             WHERE MER_ID = COL.MER_ID
                         )
                        ) AS PRODUCT_COUNT
                 FROM COLLABORATE COL
                 JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
                 WHERE COL.COM_ID = :com_id
                 AND COL.C_STATUS = 'WAITING'
                 GROUP BY C.NAME, COL.MER_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID`,
                { com_id }
            );
            
    
            console.log(`Query Result: `, result.rows);
    
            const List = result.rows.map(data => ({
                MER_ID: data.MER_ID,
                MER_NAME: data.NAME,
                DESCRIPTION: data.DESCRIPTION,
                C_STATUS: data.C_STATUS,
                PRODUCT_COUNT: data.PRODUCT_COUNT,
            }));
    
            res.send(List);
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
    // ROUTE FOR COMPANY SHOW COLLABORATE STATUS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/company/collaborate/status', async (req, res) => {
        const { com_id } = req.body;
    
        if (!com_id) {
            return res.status(400).send("Company ID is required");
        }
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Get all collaborate details
            const result = await con.execute(
                `SELECT C.NAME,
                        COL.MER_ID,
                        COL.COM_ID,
                        COL.DESCRIPTION,
                        COL.C_STATUS,
                        (SELECT COUNT(P.PRO_ID)
                         FROM PRODUCTS P
                         JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                         JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                         WHERE CHM.COM_ID = COL.COM_ID
                         AND P.PRO_ID IN (
                             SELECT PRO_ID
                             FROM MERCHPRODUCEPROD
                             WHERE MER_ID = COL.MER_ID
                         )
                        ) AS PRODUCT_COUNT
                 FROM COLLABORATE COL
                 JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
                 WHERE COL.COM_ID = :com_id
                 AND COL.C_STATUS = 'ACCEPTED'
                 OR COL.C_STATUS = 'REJECTED'
                 GROUP BY C.NAME, COL.MER_ID, COL.COM_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID`,
                { com_id }
            );
            
    
            console.log(`Query Result: `, result.rows);
    
            const List = result.rows.map(data => ({
                MER_ID: data.MER_ID,
                COM_ID: data.COM_ID,
                MER_NAME: data.NAME,
                DESCRIPTION: data.DESCRIPTION,
                C_STATUS: data.C_STATUS,
                PRODUCT_COUNT: data.PRODUCT_COUNT,
            }));
    
            res.send(List);
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
    // ROUTE FOR COMPANY SHOW COLLABORATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/company/collaborate/show', async (req, res) => {
        const { com_id } = req.body;
    
        if (!com_id) {
            return res.status(400).send("Company ID is required");
        }
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Get all collaborate details
            const result = await con.execute(
                `SELECT C.NAME,
                        COL.MER_ID,
                        COL.DESCRIPTION,
                        COL.C_STATUS,
                        (SELECT COUNT(P.PRO_ID)
                         FROM PRODUCTS P
                         JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                         JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                         WHERE CHM.COM_ID = COL.COM_ID
                         AND P.PRO_ID IN (
                             SELECT PRO_ID
                             FROM MERCHPRODUCEPROD
                             WHERE MER_ID = COL.MER_ID
                         )
                        ) AS PRODUCT_COUNT
                 FROM COLLABORATE COL
                 JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
                 WHERE COL.COM_ID = :com_id
                 GROUP BY C.NAME, COL.MER_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID`,
                { com_id }
            );
            
    
            console.log(`Query Result: `, result.rows);
    
            const List = result.rows.map(data => ({
                MER_ID: data.MER_ID,
                MER_NAME: data.NAME,
                DESCRIPTION: data.DESCRIPTION,
                C_STATUS: data.C_STATUS,
                PRODUCT_COUNT: data.PRODUCT_COUNT,
            }));
    
            res.send(List);
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
    // ROUTE FOR COMPANY COLLABORATE UPDATE
    //----------------------------------------------------------------
    
    app.post('/company/collaborate/update', async (req, res) => {
        const { com_id, mer_id, status } = req.body;
      
        console.log('Updating collaboration status:', { com_id, mer_id, status });
      
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            res.status(500).send("Connection Error");
            return;
          }
      
          // Update the status for all products related to the given merchandiser and company
          const result = await con.execute(
            `UPDATE COLLABORATE
             SET C_STATUS = :status
             WHERE COM_ID = :com_id AND MER_ID = :mer_id`,
            { status, com_id, mer_id }
          );
      
          if (result.rowsAffected === 0) {
            res.status(404).send("No collaboration request found to update");
            return;
          }
      
          // Commit the transaction
          await con.commit();
      
          res.status(200).send("Collaboration status updated successfully");
          console.log("Collaboration status updated successfully");
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
    // ROUTE FOR COMPANY COLLABORATE DETAILS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/company/collaborate/details', async (req, res) => {
        const { com_id, mer_id } = req.body;
        console.log('Received collaboration details request:', { com_id, mer_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Get collaboration details for the specified merchandiser, ensuring no duplicates
            const result = await con.execute(
                `SELECT  P.PRO_ID, P.NAME AS PRODUCT_NAME, P.DESCRIPTION AS PRODUCT_DESCRIPTION, P.IMAGE AS PRODUCT_IMAGE, P.PRICE AS PRODUCT_PRICE,
                         M.NAME, M.DESCRIPTION, M.MER_ID
                         FROM PRODUCTS P
                         JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                         JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                         JOIN MERCHPRODUCEPROD MP ON P.PRO_ID = MP.PRO_ID
                         JOIN MERCHANDISER M ON MP.MER_ID = M.MER_ID
                         WHERE CHM.COM_ID = :com_id
                         AND MP.MER_ID = :mer_id`,
                { mer_id, com_id }
            );
    
            console.log(`Query Result: `, result.rows);
    
            if (result.rows.length === 0) {
                return res.status(404).send("No details found for the specified merchandiser");
            }
    
            // Format the response
            const formattedDetails = {
                MER_ID: mer_id,
                MER_NAME: result.rows[0].NAME,
                DESCRIPTION: result.rows[0].DESCRIPTION,
                PRODUCTS: result.rows.filter(row => row.PRO_ID).map(row => ({
                    PRODUCT_ID: row.PRO_ID,
                    NAME: row.PRODUCT_NAME,
                    IMAGE: row.PRODUCT_IMAGE,
                    PRICE: row.PRODUCT_PRICE
                })),
            };
    
            res.send(formattedDetails);
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
    // ROUTE FOR COMPANY DETAILS PAGE ADVERTISEMENT PRODUCT
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/companydetailspage/advertisement', async (req, res) => {
        const { com_id } = req.body;
        console.log('Received company details page advertisement request:', { com_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    

            const result = await con.execute(
                `
                SELECT P.PRO_ID, P.NAME, P.DESCRIPTION, P.IMAGE, P.PRICE, P.QUANTITY
                FROM PRODUCTS P
                JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
                JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
                JOIN COLLABORATE COL ON P.PRO_ID = COL.PRO_ID AND CHM.COM_ID = COL.COM_ID
                WHERE COL.COM_ID = :com_id
                AND COL.C_STATUS = 'ACCEPTED'`,
                { com_id }
            );
    
            console.log(`Query Result: `, result.rows);
    
            if (result.rows.length === 0) {
                return res.status(404).send("No details found for the specified merchandiser");
            }
    
            res.send(result.rows);
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
    // ROUTE FOR COMPANY DETAILS PAGE MEDIA
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    app.post('/companydetailspage/medias', async (req, res) => {
        const { com_id } = req.body;
        console.log('Received company details page media request:', { com_id });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }

            const result = await con.execute(
                `SELECT *
                FROM MEDIA
                JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
                WHERE COMPANYHASMEDIA.COM_ID = :com_id
                ORDER BY MEDIA.RELEASE_DATE DESC`,
                { com_id }
            );

            console.log(`Query Result: `, result.rows);

            if (result.rows.length === 0) {
                return res.status(404).send("No media found for the specified company");
            }

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
            const mediaList = result.rows.map(transformData);
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
    // ROUTE FOR USER CONFIRMATION ORDER
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/user/order/confirm', async (req, res) => {
        const { user_id, items, order_date, order_time } = req.body; // 'order_date' and 'order_time' are sent separately
        console.log('Received order request:', { user_id, items, order_date, order_time });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            for (const item of items) {
                const result = await con.execute(
                    `INSERT INTO USERORDERSPRODUCT (USER_ID, PRO_ID, DELIVERY_STATUS, ORDER_DATE, ORDER_TIME, ORDER_QUANTITY)
                     VALUES (:user_id, :pro_id, 'PENDING', TO_DATE(:order_date, 'DD-MM-YYYY'), :order_time, :quantity)`,
                    { user_id, pro_id: item.PRO_ID, order_date, order_time, quantity: item.quantity }
                );
                console.log(`Order Insert Result for Product ${item.PRO_ID}: ${JSON.stringify(result)}`);
            }
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Order placed successfully");
            console.log("Order placed successfully");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (con) {
                con.close();
            }
        }
    });
    


    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR USER ORDER LIST
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/user/orderlist', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received order list request:', { user_id });
        
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            const query = `
                SELECT 
                    TO_CHAR(ORDER_DATE, 'DD-MM-YYYY') AS ORDER_DATE,
                    ORDER_TIME,  
                    USER_ID, 
                    ORDER_DETAILS, 
                    DELIVERY_STATUS
                FROM USER_ORDER_LIST
                WHERE USER_ID = :user_id
            `;
    
            const result = await con.execute(query, { user_id });
            console.log(`Query Result: `, result.rows);
    
            if (result.rows.length === 0) {
                return res.status(404).send("No order list found");
            }
    
            res.send(result.rows);
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
    // ROUTE FOR USER ORDER LIST PRODUCT
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/merchandiser/orderlist/products', async (req, res) => {
        const { productIds } = req.body;
        console.log('Received product details request:', { productIds });
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            return res.status(500).send("Connection Error");
          }
      
          // Convert productIds array to a comma-separated string for SQL query
          const idsString = productIds.map(id => `'${id}'`).join(', ');
      
          const query = `
            SELECT 
              PRO_ID, 
              NAME, 
              PRICE, 
              IMAGE
            FROM PRODUCTS
            WHERE PRO_ID IN (${idsString})
          `;
      
          const result = await con.execute(query);
      
          console.log(`Query Result: `, result.rows);
      
          if (result.rows.length === 0) {
            return res.status(404).send("No products found");
          }
      
          res.send(result.rows);
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
    // ROUTE FOR USER ORDER USER DETAILS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/merchandiser/order/user/details', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received user_id details request:', { user_id });
        let con;
        try {
            // Get connection from pool
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // SQL query to fetch user details
            const query = `
                SELECT NAME, EMAIL, PHONE, 
                    TREAT(ADDRESS AS address_type).city AS CITY, 
                    TREAT(ADDRESS AS address_type).street AS STREET, 
                    TREAT(ADDRESS AS address_type).house AS HOUSE
                FROM USERS 
                WHERE USER_ID = :user_id
            `;

            
            // Execute the query
            const result = await con.execute(query, { user_id });
    
            console.log(`Query Result: `, result.rows);
    
            // Check if no user data was found
            if (result.rows.length === 0) {
                return res.status(404).send("No user found");
            }
    
            // Send user details
            res.send(result.rows[0]);
            
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        } finally {
            // Ensure the connection is closed
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
    // ROUTE FOR MERCHANDISER ORDER LIST
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/merchandiser/orderlist', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received order list request:', { user_id });
        
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            const query = `
                SELECT 
                    TO_CHAR(ORDER_GROUP.ORDER_DATE, 'DD-MM-YYYY') AS ORDER_DATE,
                    ORDER_GROUP.ORDER_TIME,  
                    ORDER_GROUP.USER_ID, 
                    ORDER_GROUP.ORDER_DETAILS, 
                    ORDER_GROUP.DELIVERY_STATUS
                FROM (
                    SELECT 
                        ORDER_DATE, 
                        ORDER_TIME,
                        USER_ID, 
                        LISTAGG(PRO_ID || ' (x' || ORDER_QUANTITY || ')', ', ') WITHIN GROUP (ORDER BY PRO_ID) AS ORDER_DETAILS, 
                        DELIVERY_STATUS
                    FROM USERORDERSPRODUCT
                    WHERE PRO_ID IN (
                        SELECT PRO_ID
                        FROM MERCHPRODUCEPROD
                        WHERE MER_ID = :user_id)   
                    GROUP BY ORDER_DATE, ORDER_TIME, USER_ID, DELIVERY_STATUS
                    ORDER BY ORDER_DATE DESC, ORDER_TIME DESC
                ) ORDER_GROUP
            `;
    
            const result = await con.execute(query, { user_id });
            console.log(`Query Result: `, result.rows);
    
            if (result.rows.length === 0) {
                return res.status(404).send("No order list found");
            }
    
            res.send(result.rows);
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
    // ROUTE FOR MERCHANDISER ORDER LIST PRODUCT
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
    app.post('/merchandiser/orderlist/products', async (req, res) => {
        const { productIds } = req.body;
        console.log('Received product details request:', { productIds });
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            return res.status(500).send("Connection Error");
          }
      
          // Convert productIds array to a comma-separated string for SQL query
          const idsString = productIds.map(id => `'${id}'`).join(', ');
      
          const query = `
            SELECT 
              PRO_ID, 
              NAME, 
              PRICE, 
              IMAGE
            FROM PRODUCTS
            WHERE PRO_ID IN (${idsString})
          `;
      
          const result = await con.execute(query);
      
          console.log(`Query Result: `, result.rows);
      
          if (result.rows.length === 0) {
            return res.status(404).send("No products found");
          }
      
          res.send(result.rows);
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
    // ROUTE FOR MERCHANDISER ORDER USER DETAILS
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/merchandiser/order/user/details', async (req, res) => {
        const { user_id } = req.body;
        console.log('Received user_id details request:', { user_id });
        let con;
        try {
          con = await pool.getConnection();
          if (!con) {
            return res.status(500).send("Connection Error");
          }

          const query = 
          `  SELECT NAME, EMAIL, PHONE, CITY, STREET, HOUSE 
             FROM USERS 
             WHERE USER_ID = :user_id `;
      
          const result = await con.execute(query, { user_id });
      
          console.log(`Query Result: `, result.rows[0]);
      
          if (result.rows[0].length === 0) {
            return res.status(404).send("No user found");
          }
      
          res.send(result.rows[0]);
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
    // ROUTE FOR MERCHANDISER ORDER UPDATE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/merchandiser/order/update', async (req, res) => {
        const { order_date, order_time, user_id, status } = req.body;
        
        if (!order_date || !order_time || !user_id || !status) {
            return res.status(400).send("Order date, order time, user ID, and status are required");
        }
        
        
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                return res.status(500).send("Connection Error");
            }
    
            // Execute the SQL query
            const result = await con.execute(
                `UPDATE USERORDERSPRODUCT 
                 SET DELIVERY_STATUS = :status 
                 WHERE USER_ID = :user_id
                 AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
                 AND ORDER_TIME = :order_time`,
                { status, user_id, order_date, order_time }
            );
            
            if (result.rowsAffected === 0) {
                return res.status(404).send("No Order request found to update");
            }
      
            // Commit the transaction
            await con.commit();
      
            res.status(200).send("Order status updated successfully");
            console.log("Order status updated successfully");
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
    // ROUTE FOR USER/MERCHANDISER ORDER DELETE
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/order/delete', async (req, res) => {
        const { order_date, order_time, user_id } = req.body;
    
        console.log('Received order cancel request:', { order_date, order_time, user_id });
    
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }
    
            // Check if there are any existing entries with the same order_date and user_id
            const existingEntriesQuery = await con.execute(
                `SELECT COUNT(*) AS COUNT 
                FROM USERORDERSPRODUCT 
                WHERE USER_ID = :user_id
                AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
                AND ORDER_TIME = :order_time`,
                { user_id, order_date, order_time }
            );
    
            const count = existingEntriesQuery.rows[0].COUNT;
            console.log(`Existing entries with USER_ID ${user_id} and ORDER_DATE ${order_date}: ${count}`);
    
            // If there are existing entries, delete them
            if (count > 0) {
                await con.execute(
                    `DELETE 
                    FROM USERORDERSPRODUCT
                    WHERE USER_ID = :user_id
                    AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
                    AND ORDER_TIME = :order_time`,
                    { user_id, order_date, order_time }
                );
                console.log(`Deleted existing entries with USER_ID ${user_id} and ORDER_DATE ${order_date}`);
            }
    
            // Commit the transaction
            await con.commit();
    
            res.status(201).send("Order canceled successfully");
            console.log("Order canceled successfully");
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
// RECOMMENDATION Part
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/media/foryou', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received recommendation request:', { user_id });
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            return res.status(500).send("Connection Error");
        }

        const query = `
            SELECT 
                M.MEDIA_ID, 
                M.TITLE, 
                M.DESCRIPTION, 
                M.RATING, 
                M.RATING_COUNT, 
                M.TYPE, 
                M.GENRE, 
                M.TRAILER, 
                M.POSTER, 
                M.DURATION, 
                M.RELEASE_DATE, 
                M.EPISODE
            FROM 
                MEDIA M
            JOIN 
                PREFERREDGENRE P ON INSTR(P.GENRES, M.GENRE) > 0
            WHERE 
                P.USER_ID = :USER_ID
                AND NOT EXISTS (
                    SELECT 1 
                    FROM USERWATCHANDFAVORITE UWF 
                    WHERE UWF.USER_ID = P.USER_ID 
                    AND UWF.MEDIA_ID = M.MEDIA_ID
                )
            ORDER BY 
                M.RATING DESC

        `;

        const result = await con.execute(query, { user_id });
        console.log(`Query Result: `, result.rows);

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

        const List = result.rows.map(transformData);


        if (result.rows.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(List);
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
// ROUTE FOR USER /media/favRole
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/media/favRole', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received FAV ROLE request:', { user_id });
    let con;

    try {
        con = await pool.getConnection();
        if (!con) {
            return res.status(500).send("Connection Error");
        }
        /* top 3 fav role from actor */
        const favrole = `
            SELECT *
            FROM ROLE 
            JOIN PREFERENCEFORROLE ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
            WHERE PREFERENCEFORROLE.USER_ID = :user_id
        `;
        const result = await con.execute(favrole, { user_id });
        console.log(`Query Result: `, result.rows);

        if (result.rows.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(result.rows);
    }
    catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    }
    finally {
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
// ROUTE FOR USER Role MEDIA
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/media/rolemedia', async (req, res) => {
    const { role_ids } = req.body;  // Expecting role_ids as an array
    console.log('Received ROLE recommendation request:', { role_ids });
    let con;

    try {
        con = await pool.getConnection();
        if (!con) {
            return res.status(500).send("Connection Error");
        }

        let List = [];

        // Loop through each role_id to fetch its details and media
        for (const role_id of role_ids) {
            // Fetch role details for current role_id
            const roleDetailQuery = await con.execute(
                `SELECT * 
                FROM ROLE
                WHERE ROLE_ID = :role_id`,
                { role_id: role_id }
            );

            // Fetch media details associated with the current role_id
            const mediaQuery = await con.execute(
                `SELECT * 
                FROM MEDIA
                JOIN MEDIAHASROLE ON MEDIA.MEDIA_ID = MEDIAHASROLE.MEDIA_ID
                WHERE ROLE_ID = :role_id`,
                { role_id: role_id }
            );

            const roleDetail = roleDetailQuery.rows[0];

            const mediaByRoleId = mediaQuery.rows.map((media) => ({
                id: media.MEDIA_ID,
                title: media.TITLE,
                description: media.DESCRIPTION,
                rating: media.RATING,
                ratingCount: media.RATING_COUNT,
                type: media.TYPE,
                genre: media.GENRE,
                trailer: media.TRAILER,
                img: media.POSTER,
                duration: media.DURATION,
                releaseDate: media.RELEASE_DATE,
                episodes: media.EPISODE  || 0
            }));

            // Push the role and its media to the final list
            List.push({
                image: roleDetail.IMG,
                name: roleDetail.NAME,
                movies: mediaByRoleId
            });
        }

        // Log the final result
        console.log(`roleMedia Result: `, List);

        if (List.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(List);
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
// ROUTE FOR USER HOME NEWS
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Backend route
app.get('/home/news', async (req, res) => {
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        // Fetch latest news with associated media and poster
        const newsQuery = `
            SELECT MEDIA.MEDIA_ID,MEDIA.TITLE, MEDIA.POSTER, NEWSANDUPDATES.NEWS_ID, 
                   NEWSANDUPDATES.DESCRIPTION, NEWSANDUPDATES.HEADLINE, 
                   NEWSTOMEDIA.NEWS_DATE
            FROM NEWSANDUPDATES
            JOIN NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
            JOIN MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            ORDER BY NEWSTOMEDIA.NEWS_DATE DESC`;

        const newsResult = await con.execute(newsQuery);
        
        // Assume top 2 news for left section, next 6 for right section
        const topNews = newsResult.rows.slice(0, 2);  // Top 2 news for the left side
        const latestNews = newsResult.rows.slice(2, 8); // Next 6 news for the right side

        res.send({
            topNews,
            latestNews
        });

    } catch (err) {
        console.error("Error fetching news: ", err);
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
// ROUTE FOR USER HOME NEWS
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Backend route
app.get('/home/news', async (req, res) => {
    let con;
    try {
        con = await pool.getConnection();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        // Fetch latest news with associated media and poster
        const newsQuery = `
            SELECT MEDIA.MEDIA_ID,MEDIA.TITLE, MEDIA.POSTER, NEWSANDUPDATES.NEWS_ID, 
                   NEWSANDUPDATES.DESCRIPTION, NEWSANDUPDATES.HEADLINE, 
                   NEWSTOMEDIA.NEWS_DATE
            FROM NEWSANDUPDATES
            JOIN NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
            JOIN MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            ORDER BY NEWSTOMEDIA.NEWS_DATE DESC`;

        const newsResult = await con.execute(newsQuery);
        
        // Assume top 2 news for left section, next 6 for right section
        const topNews = newsResult.rows.slice(0, 2);  // Top 2 news for the left side
        const latestNews = newsResult.rows.slice(2, 8); // Next 6 news for the right side

        res.send({
            topNews,
            latestNews
        });

    } catch (err) {
        console.error("Error fetching news: ", err);
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







    // Start the server
    app.listen(5000, () => {
        console.log('Server started on http://localhost:5000');
    });
}).catch(err => {
    console.error('Error starting connection pool', err);
});
