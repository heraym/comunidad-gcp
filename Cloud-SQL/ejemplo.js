import pg from 'pg';
import {Connector} from '@google-cloud/cloud-sql-connector';
const {Pool} = pg;

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: 'projectodemos:us-central1:demo',
  ipType: 'PRIVATE', 
});
const pool = new Pool({
  ...clientOpts,
  user: 'postgres',
  password: 'Academia.0706',
  database: 'postgres',
  max: 5
});

const http = require('http');
const hostname = '0.0.0.0';
const port = process.env.PORT || 8080; 
const { sleep } = require('sleep');
var express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const server = http.createServer(app);

app.get('/', async function(req,res,next) {
    
       const {rows} = await pool.query('SELECT NOW()');
       console.table(rows); // prints returned time value from server
       res.send("Hello World DB");
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});


// await pool.end();
//connector.close();