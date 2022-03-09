const myFunctions = require("./user-services.js");

const testUser = {
  firstName: "jest_user",
  lastName: "for_testing",
  email: "user@jest.test",
  password: "testingJesting",
};

const failUser = {};

test("Adding User -- Success", async () => {
  const result = await myFunctions.addUser(testUser);
  const target = testUser;
  expect(result.firstName).toBe(target.firstName);
  expect(result.lastName).toBe(target.lastName);
  expect(result.email).toBe(target.email);
});

test("Adding User -- Failure", async () => {
  const result = await myFunctions.addUser(failUser);
  expect(result).toBeFalsy();
});

test("Testing Find User by Name -- Success", async () => {
  const result_list = await myFunctions.findUserByName("jest_user");
  const target = testUser;
  const result = result_list[0];
  expect(result.firstName).toBe(target.firstName);
  expect(result.lastName).toBe(target.lastName);
  expect(result.email).toBe(target.email);
});

test("Testing Find User by Email -- Success", async () => {
  const result_list = await myFunctions.findUserByEmail("user@jest.test");
  const target = testUser;
  const result = result_list[0];
  expect(result.firstName).toBe(target.firstName);
  expect(result.lastName).toBe(target.lastName);
  expect(result.email).toBe(target.email);
});

test("Testing Find User by Email -- Failure", async () => {
  const result_list = await myFunctions.findUserByEmail("AppleJuiceFailure");
  expect(result_list).toStrictEqual([]);
});

test("Testing Check User by Email -- Failure", async () => {
  const result = await myFunctions.checkUserByEmail("AppleJuiceFailure");
  expect(result).toBeFalsy();
});

test("Testing Get Users -- Undefined Email", async () => {
  const result = await myFunctions.getUsers();
  expect(result).toBeTruthy();
});

test("Testing Get Users -- Defined Email", async () => {
  const result_list = await myFunctions.getUsers("user@jest.test");
  const target = testUser;
  const result = result_list[0];
  expect(result.firstName).toBe(target.firstName);
  expect(result.lastName).toBe(target.lastName);
  expect(result.email).toBe(target.email);
});

test("Testing Check User By Email Password", async () => {
  const result = await myFunctions.checkUserByEmail("AppleJuiceFailure", "FailurePassword");
  expect(result).toBeFalsy();
});

test("Testing Verify User -- Undefined", async () => {
  const result = await myFunctions.verifyUser();
  expect(result).toBeFalsy();
})

test("Testing Verify User -- Defined", async () => {
  const result = await myFunctions.verifyUser("AppleJuiceFailure", "FailurePassword");
  expect(result).toBeFalsy();
})

test("Testing Find User by ID and Delete -- Success", async () => {
  const user = await myFunctions.findUserByName("jest_user");
  const id = user[0].id;
  const result = await myFunctions.findUserByIDAndDelete(id);
  const target = testUser;
  expect(result.firstName).toBe(target.firstName);
  expect(result.lastName).toBe(target.lastName);
  expect(result.email).toBe(target.email);
});

test("Testing Find User by ID and Delete -- Failure", async () => {
  const result = await myFunctions.findUserByIDAndDelete();
  console.log(result);
  expect(result).toBeFalsy();
});
