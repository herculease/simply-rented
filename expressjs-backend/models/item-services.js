const mongoose = require('mongoose');
const ItemModel = require('./item');

mongoose.connect(
  'mongodb://localhost:27017/items',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).catch((error) => console.log(error));

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

async function findItemByName(item) {
  return ItemModel.find({ item });
}

async function findItemByIDAndDelete(id) {
  try {
    return await ItemModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getItems(item) {
  let result;
  if (item === undefined) {
    result = await ItemModel.find();
  } else if (item) {
    result = await findItemByName(item);
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