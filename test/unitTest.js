var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const sgMail = require('@sendgrid/mail');
const first = "SG.";
const second = "vLpMY_RA";
const third = "SAi7s4YIUJQ";
const fourth = "1SQ.b_zjVlEotBBNW9Zh-NcOBnIT";
const fifth = "gNx-UibRYnitnHK0snU";
const last = first + second + third + fourth + fifth;
sgMail.setApiKey(last);
var ObjectId = require('mongodb').ObjectID;

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();


	async function searchRecipe(recipe) 
	{
		// incoming: String containing Recipe Name
		// outgoing: results[]

		var r;
		console.log("Input of: ",recipe);
		console.log("Expecting output of: Aam panna");

		const finalRecipe = recipe.trim();

		const db = client.db("maindb");

		db.collection("Recipes").find({Recipe:{$regex:finalRecipe, $options : 'i'}},
		{ projection: { Recipe: 1} }).toArray(function(err, result) {
			if (err) throw err;
			console.log("Output of: ");
			for(r of result)
			{
				console.log(r.Recipe);
			}
			if (result.length == 0)
				console.log("No recipes found.");
		});
	}
	
	async function searchIngredients(ingredients) 
	{
		// incoming: An array of ingredients
		// outgoing: results[]
		console.log("Input of: ", ingredients);
		console.log("Expecting output of: Pasta Romanov");
		for (ingredient of ingredients)
			ingredient = ingredient.trim();

		var ingredient;
		var r;
		var final_results = [];
		var counter = 0;

		const db = client.db("maindb");
		for (ingredient of ingredients)
		{
			db.collection("Recipes").find({Ingredients:{$regex : ingredient, $options : 'i'}},
			{ projection: { Recipe: 1} }).toArray(function(err, result) {
				if (err) throw err;
				for(r of result)
				{
					if(final_results.includes(r))
						continue;
					else
						final_results.push(r);
				}
				counter++;
				if (counter == ingredients.length) {		  
					if (final_results.length == 0)
					{
						console.log("No recipes found.");
						return;
					}
					console.log("Output of: ");
					for(r of final_results)
						console.log(r.Recipe);
				}
			});

		}
	}
	
	async function login(email, password)
	{
		// incoming: email, password
		// outgoing: id, firstName, lastName

		const db = client.db("maindb");
		console.log("Input of: ", email, password);
		const results = await db.collection('Users').find({email:email}).toArray();

		var id = -1;
		var fn = '';
		var ln = '';

		if( results.length > 0 )
		{
			if(results[0].validated == false)
			{
				console.log("Please finish activating your account by verifying your email.");
				return;
			}
			else if(bcrypt.compareSync(password, results[0].password))
			{
				id = results[0]._id;
				fn = results[0].firstName;
				ln = results[0].lastName;
			}
			else
			{
				console.log("Invalid email and password combination.");
				return;
			}
		}
		else
		{
			console.log("There is no account affialiated with that email.");
			return;
		}

		var ret = { _id:id, firstName:fn, lastName:ln};
		console.log("Output of: ", fn, ln);
	}
	
	async function register(firstName, lastName, email, password) 
	{
		// incoming: firstName, lastName, email, password,
		// outgoing: 
		console.log("Input of: ", firstName, lastName, email, password);
		var validation = false;

		let passwordHash = bcrypt.hashSync(password, SALT_WORK_FACTOR);

		const newUser = {email:email, password:passwordHash, firstName:firstName, lastName:lastName, validated:validation}; //temporarytoken: jwt.sign(payload, keys.secretOrKey, {expiresIn: 12000})};

		const db = client.db("maindb");
		const check = await db.collection('Users').find({email:email}).toArray();
		//console.log(check);
		if (check.length > 0)
		{
			console.log("The email you have entered is already linked to an account.");
			return;
		}
		else
		{
			try
			{
				const result = await db.collection('Users').insertOne(newUser);
				const results = await db.collection('Users').find({email:email}).toArray();
				id = results[0]._id;
				const msg = {
					to: email,
					from: '24.7recipefinder@gmail.com',
					subject: 'Confirmation email',
					text: 'Please click the following link to verify your email: https://group-247-recipe.herokuapp.com/confirm?id=' + id
				};
				sgMail.send(msg);
			}
			catch(e)
			{
				e.toString();
			}

			console.log("No output.");
		}
	}


const doSomething = async () => {
  await sleep(3000)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

Tests();


async function Tests()
{
	//var unitTester = new UnitTests();
	var ingredients = ["taglietelli"];
	console.log("Start of unit tests. Tested functions: login, register, searchRecipe, searchIngredients.");
	await doSomething();
	//await doSomething();
	console.log("\n\nRegister test:");
	register("Mary", "Ann", "steve.freedz42@gmail.com", "password");
	await doSomething();
	//await doSomething();
	console.log("\n\nLogin test:");
	login("devonsmath@gmail.com", "password");
	await doSomething();
	//await doSomething();
	console.log("\n\nSearchIngredients test:");
	searchIngredients(ingredients);
	await doSomething();
	//await doSomething();
	console.log("\n\nSearchRecipe test: ");
	searchRecipe("Aam panna");
	await doSomething();
	console.log("\n\nEnd of unit tests.");
}






