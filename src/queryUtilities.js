const getTransactionsOnEmpId = function(employeeId) {
  return function(transactions) {
    return transactions.empId == +employeeId;
  };
};

const getTransactionsOnBeverage = function(beverage) {
  return function(transactions) {
    return transactions.beverage == beverage;
  };
};

const getTransactionsOnDate = function(date) {
  return function(transaction) {
    return transaction.date.slice(0, 10) == date;
  };
};

const getTotalBeverages = function(sum, transactions) {
  return sum + +transactions["qty"];
};

const getFieldsOfTransactions = function(transactionDetails) {
  return [
    transactionDetails.empId,
    transactionDetails.beverage,
    transactionDetails.qty,
    transactionDetails.date
  ];
};

const getQueryMessage = function(fields, totalBeverages) {
  const message = [
    `Employee ID, Beverage, Quantity, Date`,
    ...fields,
    `Total: ${totalBeverages} Juices`
  ].join("\n");

  return message;
};

const getTransactionDetailsOfPerson = function(args, filePath, record) {
  let filteredTransactions = record;
  const details = args["transactionDetails"];
  const empId = details["--empId"];
  const beverage = details["--beverage"];
  const date = details["--date"];

  let isEmpIdDefined =
    empId && filteredTransactions.filter(getTransactionsOnEmpId(empId));
  filteredTransactions = isEmpIdDefined || filteredTransactions;

  let isBeverageDefined =
    beverage &&
    filteredTransactions.filter(getTransactionsOnBeverage(beverage));
  filteredTransactions = isBeverageDefined || filteredTransactions;

  let isDateDefined =
    date && filteredTransactions.filter(getTransactionsOnDate(date));
  filteredTransactions = isDateDefined || filteredTransactions;

  const totalBeverages = filteredTransactions.reduce(getTotalBeverages, 0);
  const fields = filteredTransactions.map(getFieldsOfTransactions);

  const message = getQueryMessage(fields, totalBeverages);
  return message;
};

exports.getTransactionDetailsOfPerson = getTransactionDetailsOfPerson;
exports.getQueryMessage = getQueryMessage;
