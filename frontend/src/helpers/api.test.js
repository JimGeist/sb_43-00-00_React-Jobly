// const JoblyApi = require("./api");
import JoblyApi from "./api";

// describe("#unroll", function () {

//   it("is a function", function () {
//     expect(typeof unroll).toEqual("function");
//   });

// });

describe("ERROR: add an existing user", () => {

  const user = {
    username: "testuser",
    password: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "i@j.com",
    isAdmin: false
  }

  async function signUpWrapper() {
    const res = await JoblyApi.signUp(user);
  }


  test("receive an error because the user already exists", () => {
    expect(signUpWrapper).toThrowError(new Error("ERROR: Array is empty."));
  });


});


