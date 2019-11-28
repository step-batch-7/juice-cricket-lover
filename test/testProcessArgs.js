const chai = require("chai");
const assert = chai.assert;
const processArgs = require("../src/processArgs.js").processArgs;

describe("processArgs", function() {
  it("should give the transaction status when asked for save ", function() {
    const fileWriter = function() {
      return;
    };
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
    const expectedResult =
      `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,` +
      date;
    assert.deepStrictEqual(
      processArgs(
        args,
        "./assets/transactions.json",
        {
          "11201": [
            {
              empId: "11201",
              beverage: "apple",
              qty: "9",
              date: date
            }
          ]
        },
        fileWriter
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
      "Employee ID,Beverage,Quantity,Date" +
      "\n" +
      "11111,orange,2,2019-11-26T05:23:14.988Z" +
      "\n" +
      "Total: 2 Juices";
    assert.deepStrictEqual(
      processArgs(args, "./assets/transactions.json", {
        "11111": [
          {
            empId: "11111",
            beverage: "orange",
            qty: "2",
            date: "2019-11-26T05:23:14.988Z"
          }
        ]
      }),
      expectedResult
    );
  });
});
