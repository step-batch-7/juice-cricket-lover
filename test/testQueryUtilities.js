const chai = require("chai");
const assert = chai.assert;

const {
  getQueryMessage,
  getTransactionDetailsOfPerson,
  getTransactionsOnEmpId,
  getTransactionsOnBeverage,
  getTransactionsOnDate,
  getFieldsOfTransactions,
  filterTransactionsOnBeverage,
  filterTransactionsOnDate,
  filterTransactionsOnEmpId
} = require("../src/queryUtilities");

describe("testQueryUtilities", function() {
  describe("getQueryMessage", function() {
    it("should give query message to be displayed", function() {
      const date = new Date("2019-11-26T07:30:23.453Z").toJSON();
      const fields = [["22222", "orange", "2", date]];
      const totalBeverages = 4;
      const expectedResult = `Employee ID, Beverage, Quantity, Date\n22222,orange,2,2019-11-26T07:30:23.453Z
Total: 4 Juices`;
      assert.deepStrictEqual(
        getQueryMessage(fields, totalBeverages),
        expectedResult
      );
    });
  });

  describe("getTransactionDetailsOfPerson", function() {
    it("should give transaction details of requested employee ID", function() {
      let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
      const userArgs = {
        operation: "--query",
        transactionDetails: {
          "--empId": "11111",
          date: undefined,
          beverage: undefined
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
      const filePath = "./assets/transactions.json";
      const expectedResult = `Employee ID, Beverage, Quantity, Date
11111,orange,1,2019-11-26T07:30:23.453Z
Total: 1 Juices`;
      assert.deepStrictEqual(
        getTransactionDetailsOfPerson(userArgs, filePath, record),
        expectedResult
      );
    });
    it("should give transaction details of requested employee ID", function() {
      let date = new Date("2019-11-26T07:30:23.453Z").toJSON();
      const userArgs = {
        operation: "--query",
        transactionDetails: {
          "--empId": "11111",
          date: undefined,
          beverage: undefined
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
      const filePath = "./assets/transactions.json";
      const expectedResult = `Employee ID, Beverage, Quantity, Date
11111,orange,1,2019-11-26T07:30:23.453Z
Total: 1 Juices`;
      assert.deepStrictEqual(
        getTransactionDetailsOfPerson(userArgs, filePath, record),
        expectedResult
      );
    });
  });

  describe("getTrasactionsOnDate", function() {
    it("should filter and give transactions in a given date", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnDate("2019-12-02"));

      const expectedResult = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give empty array when there are no matching transactions", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnDate("2019-11-02"));

      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("getTrasactionsOnBeverage", function() {
    it("should filter and give transactions of a given beverage", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnBeverage("orange"));

      const expectedResult = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give empty array when there are no matching transactions", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnBeverage("panipuri"));

      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("getTrasactionsOnEmpId", function() {
    it("should filter and give transactions of a given empId", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnEmpId("11111"));

      const expectedResult = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give empty array when there are no matching transactions", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = record.filter(getTransactionsOnEmpId("25311"));

      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("filterTransactionsOnBeverage", function() {
    it("should filter the given transactions on beverage", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnBeverage(record, "mango");
      const expectedResult = [
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back the transactions as they are when there are no existing transactions on beverage", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnBeverage(record, "apple");
      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back the transactions as they are when beverage is undefined", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnBeverage(record, undefined);
      const expectedResult = record;
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("filterTransactionsOnEmpId", function() {
    it("should filter the given transactions on empId", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnEmpId(record, "22222");
      const expectedResult = [
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back an empty array when there are no existing transactions on empId", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnEmpId(record, "33333");
      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back the transactions as they are when empId is undefined", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnEmpId(record, undefined);
      const expectedResult = record;
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("filterTransactionsOnDate", function() {
    it("should filter the given transactions on date", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnDate(record, "2019-12-01");
      const expectedResult = [
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back an empty array when there are no existing transactions on date", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnDate(record, "2019-12-03");
      const expectedResult = [];
      assert.deepStrictEqual(actualResult, expectedResult);
    });
    it("should give back the transactions as they are when date is undefined", function() {
      const record = [
        {
          empId: "11111",
          beverage: "orange",
          qty: "1",
          date: "2019-12-02T11:37:26.750Z"
        },
        {
          empId: "22222",
          beverage: "mango",
          qty: "2",
          date: "2019-12-01T11:37:26.750Z"
        }
      ];
      const actualResult = filterTransactionsOnDate(record, undefined);
      const expectedResult = record;
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe("getFieldsOfTransactions", function() {
    it("should give the fields of trasactions in an array", function() {
      const record = {
        empId: "11111",
        beverage: "orange",
        qty: "1",
        date: "2019-12-02T11:37:26.750Z"
      };
      const actualResult = getFieldsOfTransactions(record);
      const expectedResult = "11111,orange,1,2019-12-02T11:37:26.750Z".split(
        ","
      );
      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });
});
