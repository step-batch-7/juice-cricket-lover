const chai = require("chai");
const assert = chai.assert;
const getQueryMessage = require("../src/queryUtilities.js").getQueryMessage;
const getTransactionDetailsOfAPerson = require("../src/queryUtilities.js")
  .getTransactionDetailsOfPerson;

describe("getQueryMessage", function() {
  it("should give query message to be displayed", function() {
    const date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const fields = [["22222", "orange", "2", date]];
    const totalBeverages = 4;
    const expectedResult = `Employee ID,Beverage,Quantity,Date\n22222,orange,2,2019-11-26T07:30:23.453Z
Total: 4 Juices`;
    assert.deepStrictEqual(
      getQueryMessage(fields, totalBeverages),
      expectedResult
    );
  });
});

describe("getTransactionDetailsOfAPerson", function() {
  it("should give transaction details of requested emloyee ID", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const userArgs = {
      operation: "--query",
      transactionDetails: {
        "--empId": "11111"
      }
    };
    const record = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        Date: date
      }
    ];
    const filePath = "./assets/transactions.json";
    const expectedResult = `Employee ID,Beverage,Quantity,Date
11111,orange,1,2019-11-26T07:30:23.453Z
Total: 1 Juices`;
    assert.deepStrictEqual(
      getTransactionDetailsOfAPerson(userArgs, filePath, record),
      expectedResult
    );
  });
});
