const express = require("express"); // import express
const cors = require("cors");

const userServices = require('./models/user-services');


app.use(express.json()); // process in json format
app.use(cors());

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
