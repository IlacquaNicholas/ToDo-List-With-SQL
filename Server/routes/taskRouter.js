const express = require('express');
const router = express.Router();
// Require the pg module:
const pg = require('pg');

// Create a pool object constructor.
const Pool = pg.Pool;

// Create our pool object using the above constructor:
const pool = new Pool({
    database: 'todo list', // the name of database, This can change!
    host: 'localhost', // where is your database?
});

// Log to our console when our pool object makes a connection:
pool.on('connect', () => {
    console.log('Postgresql connected');
});

// Log to our console when something makes our pool error out:
pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
});

router.get('/', (req, res)=>{
    console.log('in Get /tasks');
    const sqtText = 'SELECT * FROM toDoList;';
    pool.query (sqtText)
    .then ((dbResult)=>{
        console.log(`${dbResults.rows.length} rows to send`);
        res.send(dbResult.rows);
    })
    .catch((dbErr)=>{
        console.log(dbErr);
        res.sendStatus(500);
    });
});


module.exports = require;