const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const { getConnection } = require('./DB/connection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Create a connection pool
oracledb.createPool({
    user: "ADMIN",
    password: "admin",
    connectString: "Tone:1521/orclpdb",
    poolMin: 5,
    poolMax: 20,
    poolIncrement: 5
}).then(pool => {
    console.log('Connection pool started');

    // Login route
    app.post('/login', async (req, res) => {
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
                `SELECT * FROM LOGIN WHERE login_id = :username AND password = :password`,
                { username, password } // Named bind variables
            );
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                res.send(result.rows[0]);
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
    
    

    app.get('/media/genre', async (req, res) => {
        try {
            const { genre } = req.query; // Use req.query to get query parameters
            console.log('Received genre request', genre);
            
            const con = await pool.getConnection();
            if (!con) {
                throw new Error("Connection Error");
            }
            
            const result = await con.execute(
                `SELECT * FROM MEDIA WHERE UPPER(GENRE) = UPPER(:genre)`,
                { genre }
            );
            console.log(`Query Result: `, result.rows);
            
            
            res.send(result.rows);
            console.log("Media Data sent");
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        }
    });

    // Start the server
    app.listen(5000, () => {
        console.log('Server started on http://localhost:5000');
    });
}).catch(err => {
    console.error('Error starting connection pool', err);
});
















