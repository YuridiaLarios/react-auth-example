const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');



mongoose.connect(process.env.DB_MONGODBURI, {
  useNewUrlParser: true
}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to mongo database yay!")
  }
});




let userSchema = new mongoose.Schema({
  authId: String,
  username: String,
  email: String,
  thumbnailFile: String,
});


let User = mongoose.model("User", userSchema);


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());
app.use(express.json());
app.use(morgan('API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'));

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// const checkScopes = jwtAuthz([ 'openid profile email read:messages' ]);

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated  to see this." });
});

app.get('/api/allusers', function(req, res) {
  User.find({}, function(error, users){
    if(error){
      console.log("problem finding data");
      res.send("something went really wrong!!!");
      next();
    } 
    console.log(users);
    res.json(users);
  });
})




app.post('/api/user', function(req,res) {
  User.findOne({authId: req.body.sub}).then((currentUser) => {
    if (currentUser) {
      // already have user
      console.log('User is ', currentUser);
    } else {
      // if not, create user in our db
      User.create({
        authId: req.body.sub,
        username: req.body.name,
        email: req.body.email,
        thumbnailFile: req.body.picture
      }, function(error, data){
        if(error){
          console.log("There was a problem adding a document to the collection.");
          console.log(error);
          res.sendStatus(500)
        } else {
          console.log("Data added to collection: ");
          console.log(data);
          res.sendStatus(200)
        }
      })
    }
  })
});


app.listen(3001);
console.log(`${process.env.DB_MONGODBURI} Server listening on http://localhost:3001. The React app will be built and served at http://localhost:3000.`);
