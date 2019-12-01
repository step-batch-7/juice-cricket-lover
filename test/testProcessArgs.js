const fs = require("fs");
const chai = require("chai");
const assert = chai.assert;
const processArgs = require("../src/processArgs.js").processArgs;

describe("processArgs", function() {
  it("should give the transaction status when asked for save ", function() {
    const filePath = "";
    const date = function() {
      return new Date("2019-11-26T07:30:23.453Z");
    };
    const fileData = JSON.stringify([
      { beverage: "orange", empId: 11111, qty: 2, date: date }
    ]);
    const fileWriter = function() {
      return;
    };
    const fileExists = function(filePath) {
      return true;
    };
    const fileReader = function(filePath) {
      return fileData;
    };
    const userArgs = "node beverage.js --save --beverage orange --empId 11111 --qty 1".split(
      " "
    );

    const args = {
      isExist: fileExists,
      readFile: fileReader,
      fileWriter: fileWriter,
      path: filePath,
      date: date,
      userArgs: userArgs
    };
    const expectedResult = `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-26T07:30:23.453Z`;
    assert.deepStrictEqual(processArgs(args), expectedResult);
  });

  it("should give the transaction details for requested employee ID", function() {
    const filePath = "";
    const date = function() {
      return new Date("2019-11-26T07:30:23.453Z");
    };
    const fileData = JSON.stringify([
      { beverage: "orange", empId: 11111, qty: 2, date: date() }
    ]);
    const fileWriter = function() {
      return;
    };
    const fileExists = function(filePath) {
      return true;
    };
    const fileReader = function(filePath) {
      return fileData;
    };
    const userArgs = "node beverage.js --query --empId 11111".split(" ");

    const args = {
      isExist: fileExists,
      readFile: fileReader,
      fileWriter: fileWriter,
      path: filePath,
      date: date,
      userArgs: userArgs
    };

    const expectedResult = `Employee ID, Beverage, Quantity, Date\n11111,orange,2,2019-11-26T07:30:23.453Z\nTotal: 2 Juices`;
    assert.deepStrictEqual(processArgs(args), expectedResult);
  });
});
