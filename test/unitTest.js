var chai = require('chai');
var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
 // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
var firstResult;
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
var result;
console.log("Starting run");

class Searches
{  
  searchRecipes(recipe)  
  {     
		
		//firstResult = await result[0].Recipe.toString();
		//console.log(result);
		//if (err) throw err;
		return (result[0].Recipe);
	  
  
  }  
  searchIngredients(ingredient)  
  {    
    const db = client.db("maindb");
	  db.collection("Recipes").find({Ingredients:{$regex : ingredient, $options : 'i'}}, { projection: { Recipe: 1} }).toArray(async function(err, result) {
		//console.log("This is result of ingredient search:\n",result[0].Recipe.toString());
		//firstResult = await result[0].Recipe.toString();
		//console.log(result);
		//if (err) throw err;
		return (result[0].Recipe);
	  });
  }
}

const doSomething = async () => {
  await sleep(9000)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

setTimeout(function() {
  run()
}, 5000);

var calculations = new Searches();
var expect = chai.expect;
describe('Testing search functions', async function()
{
  before(function()
  {
	  const db = client.db("maindb");
		result = db.collection("Recipes").find({Recipe:{$regex:"Aam panna", $options : 'i'}},{ projection: { Recipe: 1} }).toArray();
		console.log(result);
		doSomething();
		
		//db.collection('user').remove({}, function (res) { done(); }); // It is now guaranteed to finish before 'it' starts.
  })
  it('should accurately sum two integers', async function()  
  {
	 console.log("hi");
     expect(result[0].Recipe).to.include("Aam panna");
    //console.log("Here is the return:\n", (calculations.searchRecipes("Aam panna")));  
  });
  
  it('should accurately subtract two integers', async function()  
  {
    await expect(await calculations.searchIngredients("mangoes")).to.have.string("Aam panna");
    //console.log("Here is the return:\n",await (calculations.searchIngredients("mangoes")).toString());  
  });
  
});