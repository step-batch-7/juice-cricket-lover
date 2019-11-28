const chai = require("chai");
const assert = chai.assert;
const readArguments = require("../src/readArgs.js").readArguments;

const readExistingTransactions = require("../src/readArgs.js")
  .readExistingTransactions;
const getArgsForSave = require("../src/readArgs.js").getArgsForSave;
const getArgsForQuery = require("../src/readArgs.js").getArgsForQuery;

describe("readArguments", function() {
  it("should give the save operation with transaction details when asked for save", function() {
    const date = function() {
      return new Date("2019-11-26T07:30:23.453Z");
    };
    const args = "node beverage.js --save --beverage orange --empId 11111 --qty 1".split(
      " "
    );
    const expectedUserArgs = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1",
        date: date()
      }
    };
    assert.deepStrictEqual(readArguments(args, date), expectedUserArgs);
  });

  it("should give the query operation with transaction details when asked for query", function() {
    const args = "node beverage.js --query --empId 22222".split(" ");
    const expectedUserArgs = {
      operation: "--query",
      transactionDetails: {
        "--empId": "22222"
      }
    };
    assert.deepStrictEqual(readArguments(args), expectedUserArgs);
  });
});

describe("getArgsForSave", function() {
  it("should get the required arguments for save operation", function() {
    const args = "--save --beverage orange --empId 11111 --qty 1".split(" ");
    let date = function() {
      return new Date("2019-11-26T07:30:23.453Z");
    };
    const expectedResult = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1",
        date: date()
      }
    };
    assert.deepStrictEqual(getArgsForSave(args, date), expectedResult);
  });
});

describe("getArgsForQuery", function() {
  it("should give the required arguments for query operation", function() {
    const args = "--query --empId 22222".split(" ");
    const expectedResult = {
      operation: "--query",
      transactionDetails: {
        "--empId": "22222"
      }
    };
    assert.deepStrictEqual(getArgsForQuery(args), expectedResult);
  });
});

describe("readExistingTransactions", function() {
  it("should read the existing transactions in the given file path", function() {
    const fileExists = function(fileData) {
      return true;
    };
    const fileReader = function(fileData) {
      return fileData;
    };
    const fileData = JSON.stringify({
      11111: [{ beverage: "orange", empId: 11111, qty: 2 }]
    });
    const expectedResult = {
      11111: [{ beverage: "orange", empId: 11111, qty: 2 }]
    };
    assert.deepStrictEqual(
      readExistingTransactions(fileExists, fileReader, fileData),
      expectedResult
    );
  });
  it("should give an empty object when there are no existing transactions in the given file path", function() {
    const fileExists = function(fileData) {
      return false;
    };
    const fileReader = function(fileData) {
      return fileData;
    };
    const fileData = {};
    const expectedResult = {};
    assert.deepStrictEqual(
      readExistingTransactions(fileExists, fileReader, fileData),
      expectedResult
    );
  });
});
