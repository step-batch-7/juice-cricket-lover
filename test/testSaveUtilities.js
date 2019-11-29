const chai = require("chai");
const assert = chai.assert;
const saveUtilities = require("../src/saveUtilities");
const {
  getNewTransaction,
  addPresentTransaction,
  getSaveMessage,
  updateAndGetTransactionDetails
} = saveUtilities;

describe("getNewTransaction", function() {
  it("should give present transaction details for the given arguments ", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const args = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1",
        date: date
      }
    };
    const expectedResult = {
      empId: "11111",
      beverage: "orange",
      qty: "1",
      date: date
    };
    assert.deepStrictEqual(getNewTransaction(args), expectedResult);
  });
});

describe("addPresentTransaction", function() {
  it("should add new transaction to previous details when empId is already included", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const empId = "11111";
    const record = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: date
      }
    ];
    const newTransaction = {
      empId: "11111",
      beverage: "apple",
      qty: "2",
      date: date
    };
    const expectedResult = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: date
      },
      {
        empId: "11111",
        beverage: "apple",
        qty: "2",
        date: date
      }
    ];
    assert.deepStrictEqual(
      addPresentTransaction(record, newTransaction),
      expectedResult
    );
  });
  it("should add new transaction to previous details when empId is not included", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const empId = "33333";
    const record = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: date
      }
    ];
    const newTransaction = {
      empId: "33333",
      beverage: "apple",
      qty: "2",
      date: date
    };
    const expectedResult = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: date
      },
      {
        empId: "33333",
        beverage: "apple",
        qty: "2",
        date: date
      }
    ];
    assert.deepStrictEqual(
      addPresentTransaction(record, newTransaction),
      expectedResult
    );
  });
});

describe("getSaveMessage", function() {
  it("should give save message to be displayed", function() {
    let date = new Date("2019-11-26T07:30:23.453Z");
    const args = {
      empId: "33333",
      beverage: "apple",
      qty: "2",
      date: date
    };
    const message = `Transaction Recorded:
Employee ID,Beverage,Quantity,Date
33333,apple,2,2019-11-26T07:30:23.453Z`;
    assert.deepStrictEqual(getSaveMessage(args), message);
  });
});

describe("updateAndGetTransactionDetails", function() {
  it("should update and get transaction details", function() {
    const fileWriter = function() {
      return;
    };
    let date = new Date("2019-11-26T07:30:23.453Z");
    const userArgs = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1",
        date: date
      }
    };
    const record = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: date
      }
    ];
    const message = `Transaction Recorded:
Employee ID,Beverage,Quantity,Date
11111,orange,1,2019-11-26T07:30:23.453Z`;
    const filePath = "./assets/transactions.json";
    assert.deepStrictEqual(
      updateAndGetTransactionDetails(userArgs, filePath, record, fileWriter),
      message
    );
  });
});
