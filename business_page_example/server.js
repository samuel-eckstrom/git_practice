const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
})
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const port = process.env.PORT || 3001;

app.post('/customers', (req, res) => {
    const body = req.body;
    console.log(body)
    pool.query(`insert into users values ('${body.firstName}', '${body.lastName}', '${body.email}', '${body.password}');`,
            (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200)
    })
})

app.post('/customers/login', (req, res) => {
    const body = req.body;
    console.log(body)
    pool.query(`select * from users where email='${body.email}' and password='${body.password}';`, 
            (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results.rows);
    })
})

app.post('/businesses', (req, res) => {
    const body = req.body;
    console.log(body)
    pool.query(`insert into businesses values ('${body.name}', '${body.email}', '${body.password}',
    '${body.specialOne}', '${body.specialTwo}', '${body.specialThree}', '${body.specialFour}', 
    '${body.specialFive}', '${body.eventOne}', '${body.eventTwo}', '${body.eventThree}', 
    '${body.briefDescription}', '${body.hours}', '${body.location}', '${body.state}', '${body.city}', 
    '${body.phone}', '${body.website}');`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200)
    })
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})