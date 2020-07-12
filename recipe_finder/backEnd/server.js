// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => 
// {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// app.listen(5000); // start Node + Express server on port 5000

const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 const uri = process.env.ATLAS_URI;
 const client = new MongoClient(uri, { useUnifiedTopology: true });
 client.connect();


 app.post('/api/login', async (req, res, next) => 
 {
   // incoming: login, password
   // outgoing: id, firstName, lastName, error
 
  var error = '';
 
   const { email, password } = req.body;
  
   const db = client.db("maindb");
   //var dbo = db.db("maindb");
   const results = await db.collection('Users').find({email:email,password:password}).toArray();
 
   var id = -1;
   var fn = '';
   var ln = '';
 
   if( results.length > 0 )
   {
     id = results[0].userID;
     fn = results[0].firstName;
     ln = results[0].lastName;
   }
   else
   {
    error = "Invalid email and password combination";
    var ret = { error: error };
    res.status(500).json(ret);
   }
 
   //db.close("maindb");
   var ret = { id:id, firstName:fn, lastName:ln, error:''};
   res.status(200).json(ret);
 });

 app.post('/api/register', async (req, res, next) =>
{
  // incoming: firstName, lastName, email, password, 
  // outgoing: error

  const { firstName, lastName, email, password } = req.body;
  var validation = false;

  const newUser = {email:email, password:password, firstName:firstName, lastName:lastName, validated:validation}; //temporarytoken: jwt.sign(payload, keys.secretOrKey, {expiresIn: 12000})};
  var error = '';

  const db = client.db("maindb");
  //var dbo = db("maindb");
  const check = await db.collection('Users').find({email:email}).toArray();

  if (check.length > 0)
  {
    error = "The email you have entered is already linked to an account.";
    var ret = { error: error };
    res.status(500).json(ret);
  }
  else
  {
    try
    {
      const result = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
      error = e.toString();
    }
    
    var ret = { error: error };
    res.status(200).json(ret);
  }
});

app.post('/api/searchIngredients', async (req, res, next) => 
{
  // incoming: An array of ingredients
  // outgoing: results[], error


  var error = '';

  const {ingredients} = req.body;

  for (ingredient of ingredients)
  {
    ingredient = ingredient.trim();
  }
  
  final_results = [];

  const db = client.db("maindb");
  //var dbo = db.db("maindb");
  for (ingredient of ingredients)
  {
    //console.log(ingredient);
    db.collection("Recipes").find({Ingredients:{$regex : ingredient, $options : 'i'}},
    { projection: { Recipe: 1} }).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      for(r of result)
      {
        if(final_results.includes(r))
        {
          continue;
        }
        else
        {
          final_results.push(r);
        }
      }
      if (final_results.length == 0)
      {
        error = "No recipes found."
      }
      
      //db.close();
      var ret = {results:final_results, error:error};
      res.status(200).json(ret);  
  });  
  } 
});

app.post('/api/searchRecipe', async (req, res, next) => 
{
  // incoming: String containing Recipe Name
  // outgoing: results[], error

  var error = '';

  const { Recipe } = req.body;
  console.log(Recipe);

  const finalRecipe = Recipe.trim();
  
  const db = client.db("maindb");
  //var dbo = db.db("maindb");

 db.collection("Recipes").find({Recipe:{$regex:finalRecipe, $options : 'i'}},
  { projection: { Recipe: 1} }).toArray(function(err, result) {
    if (err) throw err;
    
    console.log(result);

    if (result.length == 0)
    {
      error = "No recipes found."
    }
    var ret = {results:result, error:error};
    res.status(200).json(ret);
  });

  //db.close();
  
});

app.post('/api/addRecipe', async (req, res, next) =>
{
  // incoming: Recipe, Ingredients, Procedures, UserId 
  // outgoing: error

  const { Recipe, Ingredients, Procedure, userId } = req.body;

  const newRecipe = {Recipe:Recipe, Ingredients:Ingredients, Procedure:Procedure, userId:userId};
  console.log(newRecipe);
  var error = '';

 
  const db = client.db("maindb");
  //var dbo = db.db("maindb");
  const check = await db.collection('Recipes').find({Recipe:Recipe}).toArray();

  if (check.length > 0)
  {
    error = "The recipe you wish to enter already exists.";
    var ret = { error: error };
    res.status(500).json(ret);
  }
  else
  {
    try
    {
      const result = db.collection('Recipes').insertOne(newRecipe);
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error };
      res.status(500).json(ret);
    }

    //db.close();
    var ret = { error: error };
    res.status(200).json(ret);
  }
});

app.delete('/api/deleteRecipe', async (req, res, next) =>
{
  // incoming: Recipe, userId 
  // outgoing: error

  const { Recipe, userId } = req.body;

  var error = '';

  var deleteQuery = { Recipe: Recipe, userId: userId };
 
  const db = client.db("maindb");
  //var dbo = db.db("maindb");
  // const check = await dbo.collection('Recipes').find({userId: userId, Recipe: recipe }).toArray();

    try
    {
      const result = db.collection('Recipes').remove(deleteQuery);
    }
    catch(e)
    {
      error = e.toString();
    }

   // db.close();

    if (error.localeCompare("") == 0)
    {
      var ret = { error: error };
      res.status(200).json(ret);
    }
    else
    {
      var ret = { error: error };
      res.status(500).json(ret);
    }
});

app.post('/api/viewRecipe', async (req, res, next) => 
{
  // incoming: Recipe
  // outgoing: Recipe, ingredients, procedure, error

  var error = '';

  const {Recipe} = req.body;
  
  const db = client.db("maindb");
 // var dbo = db.db("maindb");

 db.collection("Recipes").find({Recipe: Recipe},
  { projection: { Recipe: 1, Ingredients: 1 , Procedure: 1}}).toArray(function(err, result) {
    if (err) throw err;
    var ret = {results:result[0], error:error};
    res.status(200).json(ret);
  });

  //db.close();

});


//const recipesRouter = require('./routes/recipes');
//const usersRouter = require('./routes/users');

//app.use('/recipes', recipesRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});