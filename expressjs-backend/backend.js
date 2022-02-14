const express = require("express"); // import express
const cors = require("cors");

<<<<<<< HEAD
const userServices = require('./models/user-services');

=======
const app = express(); // make express instance
const port = 5000; // constant to listen on port 5000
>>>>>>> 13b774c74f1f590251d3aef239997c972eabca0a

app.use(express.json()); // process in json format
app.use(cors());

<<<<<<< HEAD
=======
// temporary hard-coded values for user login attempts, will link to db when set up
const users = new Map();
users.set("jxmurill@calpoly.edu", { password: "test0" });
users.set("test@test.com", { password: "tester1" });
users.set("simplyrented@gmail.com", { password: "test4" });

// For sending users to database
// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/simply-rented");

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// var nameSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   username: String,
//   password: String
//  });

// var User = mongoose.model("User", nameSchema);

// app.post("/addedUser", (req, res) => {
//   var myData = new User(req.body);
//  myData.save()
//  .then(item => {
//  res.send("item saved to database");
//  })
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  });
// });

>>>>>>> 13b774c74f1f590251d3aef239997c972eabca0a
// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

function verifyUser(email, password) {
  if (users.has(email)) {
    return users.get(email).password === password;
  }
  return false;
}

// Verify login info with backend (right now just sends 200 if fields exist)
app.post("/login", (req, res) => {
  const { body } = req;
  if (body.email && body.password && verifyUser(body.email, body.password)) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
<<<<<<< HEAD
})


app.get('/users', async (req, res) => {
  const name = req.query['firstName'];
  try {
      const result = await userServices.getUsers(name);
      res.send({users_list: result});         
  } catch (error) {
      console.log(error);
      res.status(500).send('An error ocurred in the server.');
  }
});


app.post('/signup', (req, res) => {
  const userToAdd = req.body;
  const savedUser = userServices.addUser(userToAdd);
  if (savedUser)
    res.status(201).send(savedUser);
  else
    res.status(500).end();
});

=======
});

app.get("/users", (req, res) => {
  res.send(users);
});

function addUser(user) {
  try {
    users.set(user.email, { password: user.password });
    console.log("user added", user);
    return true;
  } catch (error) {
    return false;
  }
}
>>>>>>> 13b774c74f1f590251d3aef239997c972eabca0a

app.post("/signup", (req, res) => {
  const userToAdd = req.body;
  if (users.has(userToAdd.email)) {
    res.status(200).send("email exists");
  } else if (addUser(userToAdd)) res.status(201).end();
  else res.status(400).end();
});

// make app listen to requests at port number
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
