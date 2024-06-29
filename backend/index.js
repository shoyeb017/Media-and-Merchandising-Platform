const express = require('express');
const { getConnection } = require('./DB/connection');
const router = express.Router();
const app = express();

async function initialize(){
    let con;

    try{
        con = await getConnection();
    
        const result = await con.execute(
            `SELECT * FROM Users`
        );
    }
    catch(err){
        console.error("Error: ", err);
    }
    finally{
        if(con){
            try{
                await con.close();
            }
            catch(err){
                console.error("Error: ", err);
            }
        }
    }
}
initialize();