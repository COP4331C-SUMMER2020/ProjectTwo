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

  const newUser = {email:email, password:password, firstName:firstName, lastName:lastName}; //temporarytoken: jwt.sign(payload, keys.secretOrKey, {expiresIn: 12000})};
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
  
  final_results = []

  const db = client.db();
  var dbo = db.db("maindb");
  for (ingredient of ingredients)
  {
    dbo.collection("Recipes").find({Recipe:{'$regex' : recipe, '$options' : 'i'}},
    { projection: { Recipe: 1} }).toArray(function(err, result) {
      if (err) throw err;
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
  });  
  }
  
  db.close();
  var ret = {results:final_results, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchRecipe', async (req, res, next) => 
{
  // incoming: String containing Recipe Name
  // outgoing: results[], error

  var error = '';

  const {recipe} = req.body;

  recipe = recipe.trim();
  
  const db = client.db();
  var dbo = db.db("maindb");

 dbo.collection("Recipes").find({Recipe:{'$regex' : recipe, '$options' : 'i'}},
  { projection: { Recipe: 1} }).toArray(function(err, result) {
    if (err) throw err;
  });

  db.close();
  var ret = {results:result, error:error};
  res.status(200).json(ret);
});

app.post('/api/addRecipe', async (req, res, next) =>
{
  // incoming: Recipe, Ingredients, Procedures, UserId 
  // outgoing: error

  const { recipe, ingredients, procedures, userId } = req.body;

  const newRecipe = {Recipe:recipe, Ingredients:ingredients, Procedures:procedures, userId:userId};
  var error = '';

 
  const db = client.db();
  var dbo = db.db("maindb");
  const check = await dbo.collection('Recipes').find({Recipe:recipe}).toArray();

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
      const result = dbo.collection('Recipes').insertOne(newRecipe);
    }
    catch(e)
    {
      error = e.toString();
    }

    db.close();
    var ret = { error: error };
    res.status(200).json(ret);
  }
});

app.delete('/api/deleteRecipe', async (req, res, next) =>
{
  // incoming: Recipe, userId 
  // outgoing: error

  const { recipe, userId } = req.body;

  var error = '';

  var myquery = { Recipe: recipe, userId: userId };
 
  const db = client.db();
  var dbo = db.db("maindb");
  // const check = await dbo.collection('Recipes').find({userId: userId, Recipe: recipe }).toArray();

    try
    {
      const result = dbo.collection('Recipes').deletetOne(myquery);
    }
    catch(e)
    {
      error = e.toString();
    }

    db.close();

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

  const {recipe} = req.body;
  
  const db = client.db();
  var dbo = db.db("maindb");

 dbo.collection("Recipes").find({Recipe: recipe},
  { projection: { Recipe: 1, Ingredients: 1 , Procedure: 1}}).toArray(function(err, result) {
    if (err) throw err;
  });

  db.close();
  var ret = {results:result, error:error};
  res.status(200).json(ret);
});


//const recipesRouter = require('./routes/recipes');
//const usersRouter = require('./routes/users');

//app.use('/recipes', recipesRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});