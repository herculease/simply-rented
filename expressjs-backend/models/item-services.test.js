const myFunctions = require("./item-services.js");

const testItem = {
  itemName: "jest_item",
  itemRate: 10,
  itemDescription: "Test Item",
  availability: "testingJesting",
  rating: 5,
  owner: "jest_owner",
  renter: "jest_renter"
};

const failItem = {};

test("Testing Add Item -- Success", async () => {
  const result = await myFunctions.addItem(testItem);
  const target = testItem;
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Add Item -- Failure", async () => {
  const result = await myFunctions.addItem(failItem);
  expect(result).toBeFalsy();
});

test("Testing Find Item by Name -- Success", async () => {
  const result_list = await myFunctions.findItemByName("jest_item");
  const target = testItem;
  const result = result_list[0];
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Find Item by ID and Delete -- Success", async () => {
  const item = await myFunctions.findItemByName("jest_item");
  const id = item[0].id;
  const result = await myFunctions.findItemByIDAndDelete(id);
  const target = testItem;
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});
