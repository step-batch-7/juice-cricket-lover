const assert = require("assert");
const readArguments = require("../src/beverageLib.js").readArguments;
const processArgs = require("../src/beverageLib.js").processArgs;

describe("readArguments", function() {
  it("should give the save operation with transaction details when asked for save", function() {
    const args = "node beverage.js --save --beverage orange --empId 11111 --qty 1".split(
      " "
    );
    const expectedUserArgs = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": 11111,
        "--qty": 1,
        date: JSON.stringify(new Date())
      }
    };
    assert.deepStrictEqual(readArguments(args), expectedUserArgs);
  });

  it("should give the query operation with transaction details when asked for query", function() {
    const args = "node beverage.js --query --empId 22222".split(" ");
    const expectedUserArgs = {
      operation: "--query",
      transactionDetails: {
        "--empId": 22222
      }
    };
    assert.deepStrictEqual(readArguments(args), expectedUserArgs);
  });
});

describe("processArgs", function() {
  it("should give the transaction status when asked for save ", function() {
    const args = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": 11111,
        "--qty": 1,
        date: JSON.stringify(new Date())
      }
    };
    const expectedResult = [
      "transaction recorded:",
      ["Employee ID", "Beverage", "Quantity", "Date"],
      [11111, "orange", 1, JSON.stringify(new Date())]
    ];
    assert.deepStrictEqual(processArgs(args), expectedResult);
  });
  it("should give the transaction details for requested employee ID", function() {
    const args = {
      operation: "--query",
      transactionDetails: {
        "--empId": 11111
      }
    };
    const expectedResult = [
      ["Employee ID", "Beverage", "Quantity", "Date"],
      [11111]
    ];
    assert.deepStrictEqual(processArgs(args), expectedResult);
  });
});
