const jsdom = require("jsdom");
const fetch = require('isomorphic-fetch')
const { JSDOM } = jsdom;
const baseURL = "https://en.wikibooks.org/wiki/Cookbook:";
var recipeNames = [];
var recipeIngredients = [];
var recipeProcedures = [];
var badIndeces = [563];
badIndeces.fill(0)
var index = 0;
recipeNamerIDKwhoKnows();


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
		name.textContent = name.textContent.replace("(p)","");
		name.textContent = name.textContent.replace("(pt)","");
		if (index > 562)
			break;
		name.textContent = name.textContent.split("(")[0];
		console.log(name.textContent)
		
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
		console.log(temp.textContent);
		
		
		var temp2 = dom.window.document.querySelector('[id^=Procedure]').parentNode.nextElementSibling;
		while (temp2.className == "thumb tright")
		{
			temp2 = temp2.nextElementSibling;
		}
		console.log(temp2.textContent);

	}
	catch (err)
	{
		console.log(err);
	}
	//return;
}

const doSomething = async () => {
  await sleep(3000)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
