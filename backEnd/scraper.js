const jsdom = require("jsdom");
const fetch = require('isomorphic-fetch')
const { JSDOM } = jsdom;
const baseURL = "https://en.wikibooks.org/wiki/Cookbook:";
var recipeNames = [];
var recipeIngredients = [];
var recipeProcedures = [];
var badIndeces = [563];
badIndeces.fill(0);
var index = 0;
recipeNamerIDKwhoKnows();
// we create 'users' collection in newdb database
var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;


//function will go through each recipe on main page, send each recipe name to recipeScraper to open
async function recipeNamerIDKwhoKnows()
{
	var recipeListPage = baseURL.concat("Recipes");
	const response = await fetch(recipeListPage);
	const text = await response.text();
	const dom = await new JSDOM(text);
	var recipes = dom.window.document.querySelectorAll("LI");
	//recipes.forEach(console.log(this.textContent));
	
	for (let name of recipes)
	{
		if (index <438)
		{
			index++;
			continue;
		}
		name.textContent = name.textContent.replace("(p)","");
		name.textContent = name.textContent.replace("(pt)","");
		if (index > 562)
			break;
		name.textContent = name.textContent.split("(")[0];
		console.log("Attemping insert ", name.textContent);
		
		await recipeScraper(name.textContent);
		await doSomething();
		console.log("\n");
		index++;
	}
	
}

//will take url/name and log the ingredients and procedure of that recipe
async function recipeScraper(recipe){
	var result = baseURL.concat(recipe);
	const response = await fetch(result);
	const text = await response.text();
	const dom = await new JSDOM(text);
	try
	{
		var temp = dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling;
		while (temp.className == "thumb tright")
		{
			temp = temp.nextElementSibling;
		}
		var tempIngredients = temp.textContent;
		
		
		var temp2 = dom.window.document.querySelector('[id^=Procedure]').parentNode.nextElementSibling;
		while (temp2.className == "thumb tright")
		{
			temp2 = temp2.nextElementSibling;
		}
		var tempProcedure = temp2.textContent;

	}
	catch (err)
	{
		console.log(err);
	}
	
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  var myobj = { Recipe: recipe, Ingredients: tempIngredients, Procedure: tempProcedure };
	  dbo.collection("Recipes").insertOne(myobj, function(err, res) {
		  console.log("inserted", recipe, "\n");
		if (err) throw err;
		db.close();
	  });
	}); 
	//return;
}

const doSomething = async () => {
  await sleep(3000)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
