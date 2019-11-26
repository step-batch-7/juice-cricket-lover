const assert = require("assert");
const getNewTransaction = require("../src/saveUtilities.js").getNewTransaction;
const addPresentTransaction = require("../src/saveUtilities.js")
  .addPresentTransaction;
const getSaveMessage = require("../src/saveUtilities.js").getSaveMessage;

describe("getNewTransaction", function() {
  it("should give present transaction details for the given arguments ", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const args = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1"
      }
    };
    const expectedResult = {
      EmployeeID: "11111",
      Beverage: "orange",
      Quantity: "1",
      Date: date
    };
    assert.deepStrictEqual(getNewTransaction(args, date), expectedResult);
  });
});

describe("addPresentTransaction", function() {
  it("should add new transaction to previous details when empId is already included", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const empId = "11111";
    const record = {
      "11111": [
        {
          EmployeeID: "11111",
          Beverage: "orange",
          Quantity: "1",
          Date: date
        }
      ]
    };
    const newTransaction = {
      EmployeeID: "11111",
      Beverage: "apple",
      Quantity: "2",
      Date: date
    };
    const expectedResult = {
      "11111": [
        {
          EmployeeID: "11111",
          Beverage: "orange",
          Quantity: "1",
          Date: date
        },
        {
          EmployeeID: "11111",
          Beverage: "apple",
          Quantity: "2",
          Date: date
        }
      ]
    };
    assert.deepStrictEqual(
      addPresentTransaction(empId, ["11111", "22222"], record, newTransaction),
      expectedResult
    );
  });
  it("should add new transaction to previous details when empId is not included", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const empId = "33333";
    const record = {
      "11111": [
        {
          EmployeeID: "11111",
          Beverage: "orange",
          Quantity: "1",
          Date: date
        }
      ]
    };
    const newTransaction = {
      EmployeeID: "33333",
      Beverage: "apple",
      Quantity: "2",
      Date: date
    };
    const expectedResult = {
      "11111": [
        {
          EmployeeID: "11111",
          Beverage: "orange",
          Quantity: "1",
          Date: date
        }
      ],
      "33333": [
        {
          EmployeeID: "33333",
          Beverage: "apple",
          Quantity: "2",
          Date: date
        }
      ]
    };
    assert.deepStrictEqual(
      addPresentTransaction(empId, ["11111"], record, newTransaction),
      expectedResult
    );
  });
});
