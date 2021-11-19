const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('server/public'));

const taskRouter = require('./routes/taskRouter.js')

app.use('/tasks', taskRouter);


app.listen(PORT, () => {
    console.log('listening on port', PORT);
});