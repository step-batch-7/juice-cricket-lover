const assert = require("assert");
const readArguments = require("../src/beverageLib.js").readArguments;
const processArgs = require("../src/beverageLib.js").processArgs;

describe("readArguments", function() {
  it("should give the save operation with transaction details when asked for save", function() {
    const date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const args = "node beverage.js --save --beverage orange --empId 11111 --qty 1".split(
      " "
    );
    const expectedUserArgs = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1",
        date: date
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

describe("processArgs", function() {
  it("should give the transaction status when asked for save ", function() {
    let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
    const args = {
      operation: "--save",
      transactionDetails: {
        "--beverage": "orange",
        "--empId": "11111",
        "--qty": "1"
      }
    };
    const expectedResult =
      `Transaction Recorded:\nEmployeeID,Beverage,Quantity,Date\n11111,orange,1,` +
      date;
    assert.deepStrictEqual(
      processArgs(
        args,
        "./assets/transactions.json",
        {
          "11201": [
            {
              EmployeeID: "11201",
              Beverage: "apple",
              Quantity: "9",
              Date: date
            }
          ]
        },
        date
      ),
      expectedResult
    );
  });
  it("should give the transaction details for requested employee ID", function() {
    const args = {
      operation: "--query",
      transactionDetails: {
        "--empId": 11111
      }
    };
    const expectedResult =
      "EmployeeID,Beverage,Quantity,Date" +
      "\n" +
      "11111,orange,2,2019-11-26T05:23:14.988Z" +
      "\n" +
      "Total: 2 Juices";
    assert.deepStrictEqual(
      processArgs(args, "./assets/transactions.json", {
        "11111": [
          {
            EmployeeID: "11111",
            Beverage: "orange",
            Quantity: "2",
            Date: "2019-11-26T05:23:14.988Z"
          }
        ]
      }),
      expectedResult
    );
  });
});
