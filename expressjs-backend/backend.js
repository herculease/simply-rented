const express = require("express"); // import express
const cors = require("cors");

const userServices = require("./models/user-services");
const itemServices = require("./models/item-services");

const app = express();
const port = 5000;

app.use(express.json()); // process in json format
app.use(cors());

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function verifyUserPassword(email, password) {
  // Need to update further as this isn't checking password
  const user = await userServices.verifyUser(email, password);
  return user;
}

// Verify login info with backend (right now just sends 200 if fields exist)
app.post("/login", async (req, res) => {
  const { body } = req;
  if (body.email && body.password) {
    const credCheck = await verifyUserPassword(body.email, body.password);
    if (credCheck) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }
});

function verifyUser(email) {
  // Need to update further as this isn't checking password!!
  const user = userServices.getUsers(email);
  if (user) return true;
  return false;
}

app.post("/login", (req, res) => {
  const { body } = req;
  if (body.email && body.password && verifyUser(body.email)) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.get("/users", async (req, res) => {
  const name = req.query.firstName;
  try {
    const result = await userServices.getUsers(name);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server");
  }
});

app.get("/items", async (req, res) => {
  const name = req.query.itemName;
  try {
    const result = await itemServices.getItems(name);
    res.send({ items_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.post("/delete", async (req, res) => {
  const userToDeleteEmail = req.body.email;
  const check = await userServices.checkUserByEmail(userToDeleteEmail);
  if (check) {
    res.status(200).send("user does not exists");
  } else {
    const userToDelete = await userServices.findUserByEmail(userToDeleteEmail);
    const deletedUser = await userServices.findUserByIDAndDelete(
      userToDelete[0].id
    );
    if (deletedUser) {
      res.status(201).send(deletedUser);
    } else res.status(400).end();
  }
});

app.post("/deleteItem", async (req, res) => {
  console.log("BACKEND")
  const userEmail = req.body.email;
  const itemName = req.body.item;
  console.log(itemName);
  const check = await userServices.checkUserByEmail(userEmail);
  const check2 = await itemServices.checkItem(itemName);
  if (check && check2) {
    res.status(200).send("user or item does not exists");
  } else {
    const itemToDelete = await itemServices.findItemByName(itemName);
    console.log(itemToDelete);
    const deletedItem = await itemServices.findItemByIDAndDelete(
      itemToDelete[0].id
    );
    if (deletedItem) {
      res.status(201).send(deletedItem);
    } else res.status(400).end();
  }
});

app.get("/searchItems", async (req, res) => {
  const query = {
    itemName: req.query["query"],
  };
  if (query.itemName === undefined) {
    const result = await itemServices.getItems(query.itemName);
    res.send({ items_list: result });
  } else {
    try {
      const result = await itemServices.findItemByName(query.itemName);
      res.send({ result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    }
  }
});

app.post("/signup", async (req, res) => {
  const userToAdd = req.body;
  const check = await userServices.checkUserByEmail(userToAdd.email);
  if (check) {
    res.status(200).send("email exists");
  } else {
    const savedUser = await userServices.addUser(userToAdd);
    if (savedUser) {
      res.status(201).send(savedUser);
    } else res.status(400).end();
  }
});

app.post("/create-listing", (req, res) => {
  const itemToAdd = req.body;
  const savedItem = itemServices.addItem(itemToAdd);
  if (savedItem) res.status(201).send(savedItem);
  else res.status(500).end();
});

app.post("/listings", async (req, res) => {
  const userEmail = req.body;
  try {
    const result = await itemServices.findItemsByOwner(userEmail.email);
    res.send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// make app listen to requests at port number
// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Example app listening at http://localhost:${port}`);
// });

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
