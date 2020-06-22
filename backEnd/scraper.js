const jsdom = require("jsdom");
const fetch = require('isomorphic-fetch')
const { JSDOM } = jsdom;
const baseURL = "https://en.wikibooks.org/wiki/Cookbook:Recipes";
var recipesNames = [];
var index = 0;
recipeNamerIDKwhoKnows();

function recipeNamerIDKwhoKnows()
{
	(async () => {
		const response = await fetch(baseURL);
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
			index++;
			console.log(name.textContent)
		}		
	})()
}


function recipeScraper(recipe){
	(async () => {
		var result = baseURL.concat(recipe);
		const response = await fetch(result);
		const text = await response.text();
		const dom = await new JSDOM(text);
		if (dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.className == "thumb tright")
			console.log(dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.nextElementSibling.textContent);
		else
			console.log(dom.window.document.getElementById("Ingredients").parentNode.nextElementSibling.textContent);

		if (dom.window.document.getElementById("Procedure").parentNode.nextElementSibling.className == "thumb tright")
			console.log(dom.window.document.getElementById("Procedure").parentNode.nextElementSibling.nextElementSibling.textContent);
		else
			console.log(dom.window.document.getElementById("Procedure").parentNode.nextElementSibling.textContent);
	})()
}
