const mongoose = require("mongoose");

const uri =
  "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/users?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";
const conn = mongoose.createConnection(uri);

const UserModel = conn.model("UserModel", require("./user"));

const dotenv = require("dotenv");

const bcrypt = require("bcrypt");
const UserSchema = require("./user");
const res = require("express/lib/response");

dotenv.config();

// var uri = "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/users?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";
// mongoose.connect(uri).catch((error) => console.log(error));

// mongoose
//   .connect(
//     "mongodb+srv://" +
//       process.env.MONGO_USER +
//       ":" +
//       process.env.MONGO_PWD +
//       "@cluster0.6f9re.mongodb.net/" +
//       process.env.MONGO_DB +
//       "?retryWrites=true&w=majority",
//     // "mongodb://localhost:27017/users",
//     {
//       useNewUrlParser: true, //useFindAndModify: false,
//       useUnifiedTopology: true,
//     }
//   )
//   .catch((error) => console.log(error));

async function findUserByName(firstName) {
  const result = await UserModel.find({ firstName });
  return result;
}

async function findUserByEmail(email) {
  const result = await UserModel.find({ email });
  return result;
}

async function checkUserByEmail(email) {
  return UserModel.find({ email }).count() > 0;
}

async function getUsers(email) {
  // Look at example of job and name to check for both so can get users by any field
  let result;
  if (email === undefined) {
    result = await UserModel.find();
  } else {
    result = await findUserByEmail(email);
  }
  return result;
}

async function checkUserByEmailPassword(email, password) {
  const check = (await UserModel.find({ email, password }).count()) > 0;
  return check;
}

async function verifyUser(email, password) {
  let result;
  if (email === undefined || password === undefined) {
    result = false;
  } else {
    result = checkUserByEmailPassword(email, password);
  }
  return result;
}

async function addUser(user) {
  try {
    const userToAdd = new UserModel(user);
    userToAdd.password = await bcrypt.hash(userToAdd.password, 10);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByIDAndDelete(id) {
  return UserModel.findByIdAndDelete(id);
}

exports.getUsers = getUsers;
exports.findUserByIDAndDelete = findUserByIDAndDelete;
exports.findUserByName = findUserByName;
exports.findUserByEmail = findUserByEmail;
exports.checkUserByEmail = checkUserByEmail;
exports.addUser = addUser;
exports.verifyUser = verifyUser;