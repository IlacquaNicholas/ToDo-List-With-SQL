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
    const sqlText = 'SELECT * FROM toDoList;';
    pool.query (sqlText)
    .then ((dbResult)=>{
        console.log(`${dbResult.rows.length} rows to send`)
        res.send(dbResult.rows);
    })
    .catch((dbErr)=>{
        console.log(dbErr);
        res.sendStatus(500);
    });
});

router.post('/', (req, res)=>{
    console.log('in POST /tasks');
    console.log('req.body:', req.body);
    const newTask = req.body;
    const sqlText = `
    INSERT INTO toDoList
     ("category", "task", "completed")
    VALUES
     ($1, $2, $3);
    `;
    const sqlValues = [
        newTask.category,
        newTask.task,
        newTask.completed
    ];
    pool.query(sqlText, sqlValues)
    .then((dbResult)=>{
        console.log('INSERT success');
        res.sendStatus(200);
        
    })
    .catch ((dbErr)=>{
        console.log(dbErr);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res)=>{
    console.log('DELETE /tasks/:id');
    console.log('req.params', req.params);
    const taskIdToDelete = req.params.id;
    const sqlTable = `
    DELETE FROM toDoList
      WHERE "id"=$1;
    `;
    const sqlValues = [taskIdToDelete]
    pool.query(sqlTable, sqlValues)
    .then((dbResult)=>{
        res.sendStatus(200);
    })
    .catch((dbErr)=>{
        console.log(dbErr);
        res.sendStatus(500);
    });
});
router.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    const tasksSetToComplete = req.params.id;
    const complete = "Yeppers";
    const sqlText = `
    UPDATE toDoList
      SET "completed"= $1
      WHERE "id" = $2;
    `;
    const sqlValues = [complete, tasksSetToComplete,]
    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
            res.sendStatus(200)
        })
        .catch((dbErr) => {
            console.log(dbErr);
            res.sendStatus(500);
        });
});



module.exports = router;