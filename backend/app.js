const express = require('express');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks-routes');

const app = express();

app.use('/api/tasks', tasksRoutes);

app.listen(5000);
