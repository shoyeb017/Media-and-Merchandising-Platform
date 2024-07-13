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
    //will generate a login id based on the username and password
    return Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
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
            `INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID) VALUES (:login_id, :password, 'USER', :user_id)`,
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
                `INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID) VALUES (:login_id, :password, 'MERCHANDISER', :user_id)`,
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




    // Login route
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
                `SELECT USER_NAME, PASSWORD FROM LOGIN JOIN MERCHANDISER ON LOGIN.ID = MERCHANDISER.MER_ID WHERE USER_NAME = :username AND PASSWORD = :password`,
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
                `SELECT USER_NAME, PASSWORD FROM LOGIN JOIN COMPANY ON LOGIN.ID = COMPANY.COM_ID WHERE USER_NAME = :username AND PASSWORD = :password`,
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
    // user data for profile page

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

    app.post('/profile/user/update', async (req, res) => {
        const {user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
        console.log('Received user profile update request:', { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE });
        let con;
        try {
            con = await pool.getConnection();
            if (!con) {
                res.status(500).send("Connection Error");
                return;
            }

            const result = await con.execute(
                `UPDATE USERS SET NAME = :NAME, DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), EMAIL = :EMAIL, CITY = :CITY, STREET = :STREET, HOUSE = :HOUSE, PHONE = :PHONE WHERE USER_ID = :user_id`,
                { NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE, user_id }
            );
            console.log(`Query Result: ${JSON.stringify(result)}`);

            res.status(200).send("Profile updated successfully");
            console.log("Profile updated successfully");

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

    

    // company route
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
                `SELECT * FROM MEDIA WHERE MEDIA_ID = :id`,
                { id } // Named bind variables
            );
            console.log(`Query Result: `, result.rows);
            if (!result.rows.length) {
                res.status(404).send("Media not found");
                return;
            }
    
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
                    companyName: 'Example Productions',
                    role: [],
                    news: [],
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


    // product page details

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

    // retrieving featured items
    

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
    
    
      

    // Start the server
    app.listen(5000, () => {
        console.log('Server started on http://localhost:5000');
    });
}).catch(err => {
    console.error('Error starting connection pool', err);
});
















