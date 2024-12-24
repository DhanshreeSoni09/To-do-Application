// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// In-memory task storage
let tasks = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

app.post('/delete-task', (req, res) => {
    const taskToDelete = req.body.task;
    tasks = tasks.filter(task => task !== taskToDelete);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
