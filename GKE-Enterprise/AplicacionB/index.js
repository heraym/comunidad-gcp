const http = require('http');
const hostname = '0.0.0.0';
const port = process.env.PORT || 8080; 
var express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const server = http.createServer(app);

app.get('/', function(req,res,next) {
    res.send("<html><body><h1>Aplicacion B</h1></body></html>");
}); 

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});