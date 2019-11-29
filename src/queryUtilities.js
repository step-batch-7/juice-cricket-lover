const getTransactionsOfEmployeeId = function(employeeId) {
  return function(transactions) {
    return transactions.empId == employeeId;
  };
};

const getTransactionsOnBeverage = function(beverage) {
  return function(transactions) {
    return transactions.beverage == beverage;
  };
};

const getTotalBeverages = function(sum, transactions) {
  return sum + +transactions["qty"];
};

const getFieldsOfTransactions = function(transactionDetails) {
  return Object.values(transactionDetails);
};

const getQueryMessage = function(fields, totalBeverages) {
  const totalFields = fields.join("\n");
  const message = `Employee ID,Beverage,Quantity,Date\n${totalFields}\nTotal: ${totalBeverages} Juices`;

  return message;
};

const getTransactionDetailsOfPerson = function(args, filePath, record) {
  const details = args["transactionDetails"];
  const empId = +details["--empId"];
  const beverage = details["--beverage"];
  const transactionsOfEmpId = record.filter(getTransactionsOfEmployeeId(empId));
  const transactionsOnBeverage = record.filter(
    getTransactionsOnBeverage(beverage)
  );

  const totalBeverages = transactionsOfEmpId.reduce(getTotalBeverages, 0);
  const fields = transactionsOfEmpId.map(getFieldsOfTransactions);
  //const totalBeverages = transactionsOnBeverage.reduce(getTotalBeverages, 0);
  //const fields = transactionsOnBeverage.map(getFieldsOfTransactions);

  const message = getQueryMessage(fields, totalBeverages);
  return message;
};

exports.getTransactionDetailsOfPerson = getTransactionDetailsOfPerson;
exports.getQueryMessage = getQueryMessage;
