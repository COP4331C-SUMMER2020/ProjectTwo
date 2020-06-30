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
  
   const db = client.db();
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
 
   var ret = { id:id, firstName:fn, lastName:ln, error:''};
   res.status(200).json(ret);
 });

 app.post('/api/register', async (req, res, next) =>
{
  // incoming: firstName, lastName, email, password, 
  // outgoing: error

  const { firstName, lastName, email, password } = req.body;

  const newUser = {email:email, password:password, firstName:firstName, lastName:lastName};
  var error = '';

 
  const db = client.db();
  const check = await db.collection('Users').find({email:email}).toArray();

  if (check.length > 0)
  {
    error = "The email you have entered is already linked to an account."
    var ret = { error: error };
    res.status(500).json(ret);
  }
  else
  {
    try
    {
      const db = client.db();
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
  // incoming: 
  // outgoing: results[], error

  // TODO: Finish this endpoint (change from cards stuff to our project)

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db();
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});


 


//const recipesRouter = require('./routes/recipes');
//const usersRouter = require('./routes/users');

//app.use('/recipes', recipesRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});