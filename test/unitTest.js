var chai = require('chai');
var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
 // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
	console.log("in connect");
	  if (err) throw err;
	  var dbo = db.db("maindb");
	  var finalRecipe = "butter";
	  dbo.collection("Recipes").find({Recipe:{$regex:finalRecipe, $options : 'i'}},{ projection: { Recipe: 1} }).toArray(function(err, result) {
		console.log(result);
		if (err) throw err;
	  });
}); 















/*
class AppCalculations
{  
  sum2Integers(one,two)  
  {     
    return one + two;  
  }  
  subtract2Integers(one, two)  
  {    
    return one - two;  
  }
}

var calculations = new AppCalculations();
var assert = chai.assert;
describe('Hello Jasmine',function()
{
  it('should accurately sum two integers', function()  
  {
    assert.equal(calculations.sum2Integers(3,2),5);
    //console.log(calculations.sum2Integers(3,2));  
  });  
  it('should accurately subtract two integers', function()  
  {
    assert.equal(calculations.subtract2Integers(3,2),1);
    //console.log(calculations.subtract2Integers(3,2));  
  });
});

*/