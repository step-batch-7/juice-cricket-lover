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
        "--empId": "22222",
        date: undefined,
        "--beverage": undefined
      }
    };
    assert.deepStrictEqual(readArguments(args), expectedUserArgs);
  });

  it("should give the query operation with transaction details when asked for query", function() {
    const args = "node beverage.js --query --empId 22222 --date 29-12-2019 --beverage orange".split(
      " "
    );
    const expectedUserArgs = {
      operation: "--query",
      transactionDetails: {
        "--empId": "22222",
        date: "29-12-2019",
        "--beverage": "orange"
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
        "--empId": "22222",
        date: undefined,
        "--beverage": undefined
      }
    };
    assert.deepStrictEqual(getArgsForQuery(args), expectedResult);
  });
});

describe("readExistingTransactions", function() {
  it("should read the existing transactions in the given file path", function() {
    const filePath = "";
    const fileExists = function(filePath) {
      return true;
    };
    const fileData = JSON.stringify({
      11111: [{ beverage: "orange", empId: 11111, qty: 2 }]
    });
    const fileReader = function(filePath) {
      return fileData;
    };

    const expectedResult = {
      11111: [{ beverage: "orange", empId: 11111, qty: 2 }]
    };
    assert.deepStrictEqual(
      readExistingTransactions({
        isExist: fileExists,
        readFile: fileReader,
        path: filePath
      }),
      expectedResult
    );
  });
  it("should give an empty object when there are no existing transactions in the given file path", function() {
    const filePath = "";
    const fileExists = function(filePath) {
      return false;
    };
    const fileData = [];
    const fileReader = function(filePath) {
      return fileData;
    };
    const expectedResult = [];
    assert.deepStrictEqual(
      readExistingTransactions({
        isExist: fileExists,
        readFile: fileReader,
        path: filePath
      }),
      expectedResult
    );
  });
});
