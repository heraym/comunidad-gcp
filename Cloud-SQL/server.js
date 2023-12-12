const { Client } = require('pg');

const http = require('http');
const hostname = '0.0.0.0';
const port = process.env.PORT || 8080; 

var express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;


app.get('/', async function(req,res,next) {
  const client = new Client({
    user: user,
    host: host,
    database: database,
    password: password,
    port: 5432,
  })
  client.connect(function(err) {
    if (err)  {
      console.error('connection error', err.stack);
     } else {
    console.log("Connected!"); }
  });
   
  const {rows} = await client.query('SELECT NOW()');
  console.table(rows); // prints returned time value from server
  res.send("Hello World DB");
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});

// await pool.end();
//connector.close();