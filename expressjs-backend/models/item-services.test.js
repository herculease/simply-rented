const myFunctions = require("./item-services.js");

test("Testing Find Item by Name -- Success", async () => {
  const result = await myFunctions.findItemByName("pie");
  console.log(result);
});
