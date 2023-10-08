const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
require('express-async-errors');

const db = require('./db');
const todoRoutes = require('./controllers/list_controller');

app.use('/api/todo', todoRoutes);

app.use((err, req, res, next) => {
    console.log(err)
    res.this.status(err.status||500).send("Something went wrong!")
})

db.query("SELECT 1")
.then(() => {
    console.log("DB CONNECTED!");
    app.listen(3000, () => console.log('server started at port 3000'));
})
.catch(err => console.log(err))
