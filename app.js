var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose");

var models     = require('./models/Receta')(app, mongoose);
var RecetaCtrl = require("./controllers/recetaController");

//body parser permite parsear JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//nos permite implementar y personazizar los metodos HTTP
app.use(methodOverride());

mongoose.connect("mongodb://localhost/recetas",function(err, res){
	if(err){
		console.log("ERROR: conectando a ala base de datos "+err);
	}
});

var router = express.Router();

router.get("/", function (req, res) {
	res.send("hello world");
});

var recetasRouter = express.Router();

recetasRouter.route("/recetas")
	.get(RecetaCtrl.findAllRecetas)
	.post(RecetaCtrl.addReceta);

recetasRouter.route("/recetas/:id")
	.get(RecetaCtrl.findById)
	.put(RecetaCtrl.updateReceta)
	.delete(RecetaCtrl.deleteReceta);


app.use(router);
app.use("/api", recetasRouter);

app.listen(3000,function(){
	console.log("Node server is running on http://localhost:3000");
});

