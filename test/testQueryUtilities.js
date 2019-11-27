const assert = require("assert");
const getArgsForQuery = require("../src/queryUtilities.js").getArgsForQuery;
const getQueryMessage = require("../src/queryUtilities.js").getQueryMessage;
const getTransactionDetailsOfAPerson = require("../src/queryUtilities.js")
  .getTransactionDetailsOfPerson;

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

describe("getQueryMessage", function() {
  it("should give query message to be displayed", function() {
    const date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const headings = ["EmployeeID", "Beverage", "Quantity", "Date"];
    const fields = [["22222", "orange", "2", date]];
    const totalBeverages = 4;
    const expectedResult = `EmployeeID,Beverage,Quantity,Date\n22222,orange,2,2019-11-26T07:30:23.453Z
Total: 4 Juices`;
    assert.deepStrictEqual(
      getQueryMessage(headings, fields, totalBeverages),
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
    const filePath = "./assets/transactions.json";
    const expectedResult = `EmployeeID,Beverage,Quantity,Date
11111,orange,1,2019-11-26T07:30:23.453Z
Total: 1 Juices`;
    assert.deepStrictEqual(
      getTransactionDetailsOfAPerson(userArgs, filePath, record),
      expectedResult
    );
  });
});
