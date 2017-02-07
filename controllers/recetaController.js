var mongoose = require("mongoose");
var Receta = mongoose.model("Receta");


exports.findAllRecetas = function(req, res){
	Receta.find(function(err, recetas){
		if(err){
			return res.status(500).send(err.message);
		}

		console.log("GET /recetas");
		res.status(200).jsonp(recetas);
	});
}

exports.findById = function(req, res){
	Receta.findById(req.params.id,function(err,receta){
		if(err){
			return res.status(500).send(err.message);
		}

		console.log("GET /recetas/"+req.params.id);
		res.status(200).jsonp(receta);
	})
}

exports.addReceta = function(req, res){
	console.log(req.body);

	var receta = new Receta({
		nombre: 	   req.body.nombre,
		descripcion:   req.body.descripcion,
		fechaCreacion: req.body.fechaCreacion,
		visitas: 	   req.body.visitas
 	})

 	receta.save(function(err, receta){
 		if(err){
 			return res.status(500).send(err.message);
 		}
 		res.status(200).jsonp(receta);
 	});
}


exports.updateReceta = function(req, res){
	console.log(req.body);

	Receta.findById(req.params.id,function(err, receta){

		if(err) return res.send(500,err.message);				

		receta.nombre = req.body.nombre,
		receta.descripcion = req.body.descripcion,
		receta.fechaCreacion = req.body.fechaCreacion,
		receta.visitas = req.body.visitas;

		receta.save(function(errr){
			if(err) return res.send(500,err.message);

			res.status(200).jsonp(receta);
		});
	});

}

exports.deleteReceta = function(req, res){
	Receta.findById(req.params.id,function(err, receta){
		if(err) return res.send(500,err.message);

		receta.remove(function(err){
			if(err) return res.send(500,err.message);

		});
		res.status(200);
	});
}