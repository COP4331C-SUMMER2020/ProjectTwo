const jsdom = require("jsdom");
const fetch = require('isomorphic-fetch')
const { JSDOM } = jsdom;
const baseURL = "https://en.wikibooks.org/wiki/Cookbook:";
var recipesNames = [];
var index = 0;
recipeNamerIDKwhoKnows();

//TO-DO: need to deal with recipes who's names change slightly in url vs main page, as well as ones with multiple words (need '_')

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
		console.log(name.textContent)
		await recipeScraper(name.textContent);
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
	if (dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.className == "thumb tright")
		console.log(dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.nextElementSibling.textContent);
	else
		console.log(dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.textContent);

	if (dom.window.document.querySelector('[id^=Procedure]').parentNode.nextElementSibling.className == "thumb tright")
		console.log(dom.window.document.querySelector('[id^=Procedure]').parentNode.nextElementSibling.nextElementSibling.textContent);
	else
		console.log(dom.window.document.querySelector('[id^=Procedure]').parentNode.nextElementSibling.textContent);
	return;
}
