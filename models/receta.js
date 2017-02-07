exports = module.exports = function(app, mongoose) {

	var recetaSchema = new mongoose.Schema({
		nombre: {type:String}	,
		descripcion : {type:String},
		fechaCreacion :{type:Date},
		visitas:{type:Number}
	});

	mongoose.model("Receta",recetaSchema);
}