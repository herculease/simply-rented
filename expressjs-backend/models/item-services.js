const mongoose = require("mongoose");
const uri =
  "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/items?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";
const conn = mongoose.createConnection(uri);

const ItemModel = conn.model("ItemModel", require("./item"));

async function addItem(item) {
  try {
    const itemToAdd = new ItemModel(item);
    const saveditem = await itemToAdd.save();
    return saveditem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function checkItem(item) {
  return ItemModel.find({ item }).count() > 0;
}

async function findItemByName(item) {
  const result = await ItemModel.find({ itemName: item });
  return result;
}

async function findItemsByOwner(email) {
  const result = await ItemModel.find({ owner: email });
  return result;
}

async function findItemByIDAndDelete(id) {
  try {
    return await ItemModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getItems(itemName) {
  let result;
  if (itemName === undefined) {
    result = await ItemModel.find();
  } else if (itemName) {
    result = await findItemByName(itemName);
  }
  return result;
}

async function findItemById(id) {
  try {
    return await ItemModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getItems = getItems;
exports.findItemById = findItemById;
exports.finditemByIDAndDelete = findItemByIDAndDelete;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
exports.findItemsByOwner = findItemsByOwner;
exports.checkItem = checkItem;
