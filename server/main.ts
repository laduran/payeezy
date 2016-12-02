
import {Express, Router} from 'express';
import mainRoute from './routes/main-route';
import open = require('open');
import bodyParser = require('body-parser');
import express = require('express');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router:Router = express.Router(); 

app.use('/api', router);
app.get('/', function(req, res) {	
    res.sendFile(__dirname + '/index.html');
});

var server = app.listen(7777, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log('API is listening at http://localhost:'+ port);
	open("http://localhost:" + port);
	
});
	

mainRoute(router);
