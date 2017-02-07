var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose");

//body parser permite parsear JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//nos permite implementar y personazizar los metodos HTTP
app.use(methodOverride());


var router = express.Router();

router.get("/", function (req, res) {
	res.send("hello world");
});

app.use(router);

app.listen(3000,function(){
	console.log("Node server is running on http://localhost:3000");
});

