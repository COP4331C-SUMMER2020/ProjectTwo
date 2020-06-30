var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
	if (err) throw err;
	var dbo = db.db("24-7_Recipes");
	//var query = {  $text: { $search: "\"vanilla\"" }  };
	// " .* " means 0 or more characters, so pad the search with /..../, then use .* as wildcard
	// projection is which fields to show, default is all
	dbo.collection("Recipe Docs").find({Ingredients: /.*vanilla.*/}, { projection: { _id: 1, Recipe: 1} }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
});
