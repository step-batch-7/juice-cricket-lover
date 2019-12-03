const chai = require("chai");
const assert = chai.assert;
const readArguments = require("../src/readArgs.js").readArguments;

const readExistingTransactions = require("../src/readArgs.js")
  .readExistingTransactions;
const getArgsForSave = require("../src/readArgs.js").getArgsForSave;
const getArgsForQuery = require("../src/readArgs.js").getArgsForQuery;
const getPairedArgs = require("../src/readArgs").getPairedArgs;

describe("testReadArgs", function() {
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

    it("should give the query operation with transaction details when asked for query", function() {
      const args = "node beverage.js --query --empId 22222 --date 29-12-2019 --beverage orange".split(
        " "
      );
      const expectedUserArgs = {
        operation: "--query",
        transactionDetails: {
          "--empId": "22222",
          "--date": "29-12-2019",
          "--beverage": "orange"
        }
      };
      assert.deepStrictEqual(readArguments(args), expectedUserArgs);
    });
  });

  describe("getArgsForSave", function() {
    it("should give the required arguments for save operation with given parameters", function() {
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
      const date = function() {
        return new Date();
      };
      const expectedResult = {
        operation: "--query",
        transactionDetails: {
          "--empId": "22222"
        }
      };
      assert.deepStrictEqual(getArgsForQuery(args, date), expectedResult);
    });
  });

  describe("readExistingTransactions", function() {
    it("should read the existing transactions in the given file path", function() {
      const filePath = "somepath";
      const fileExists = function(filePath) {
        assert.strictEqual(filePath, "somepath");
        return true;
      };
      const fileData = JSON.stringify({
        11111: [{ beverage: "orange", empId: 11111, qty: 2 }]
      });
      const fileReader = function(filePath) {
        assert.strictEqual(filePath, "somepath");
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
      const filePath = "somepath";
      const fileExists = function(filePath) {
        assert.strictEqual(filePath, "somepath");
        return false;
      };
      const fileData = "[]";
      const fileReader = function(filePath) {
        assert.strictEqual(filePath, "somepath");
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

  describe("getPairedArgs", function() {
    it("should pair up every two elements and give the paired elements", function() {
      const args = "--empId,11111,--beverage,orange,--date,25-12-2019".split(
        ","
      );
      const expectedResult = {
        "--empId": "11111",
        "--beverage": "orange",
        "--date": "25-12-2019"
      };
      assert.deepStrictEqual(getPairedArgs(args), expectedResult);
    });
    it("should give an empty object for an empty array", function() {
      const args = [];
      const expectedResult = {};
      assert.deepStrictEqual(getPairedArgs(args), expectedResult);
    });
  });
});
