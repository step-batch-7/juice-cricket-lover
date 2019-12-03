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
    return transaction.date.includes(date);
  };
};

const getTotalBeverages = function(sum, transactions) {
  return +transactions["qty"] + sum;
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

const filterTransactionsOnEmpId = function(filteredTransactions, empId) {
  const detailsOnEmpId =
    empId && filteredTransactions.filter(getTransactionsOnEmpId(empId));
  filteredTransactions = detailsOnEmpId || filteredTransactions;
  return filteredTransactions;
};

const filterTransactionsOnDate = function(filteredTransactions, date) {
  const detailsOnDate =
    date && filteredTransactions.filter(getTransactionsOnDate(date));
  filteredTransactions = detailsOnDate || filteredTransactions;
  return filteredTransactions;
};

const filterTransactionsOnBeverage = function(filteredTransactions, beverage) {
  const detailsOnBeverage =
    beverage &&
    filteredTransactions.filter(getTransactionsOnBeverage(beverage));
  filteredTransactions = detailsOnBeverage || filteredTransactions;
  return filteredTransactions;
};

const getTransactionDetailsOfPerson = function(args, record) {
  const details = args["transactionDetails"];
  const empId = details["--empId"];
  const beverage = details["--beverage"];
  const date = details["--date"];

  const transactionsOnEmpId = filterTransactionsOnEmpId(record, empId);
  const transactionsOnDate = filterTransactionsOnDate(
    transactionsOnEmpId,
    date
  );
  const transactionsOnBeverage = filterTransactionsOnBeverage(
    transactionsOnDate,
    beverage
  );

  const totalBeverages = transactionsOnBeverage.reduce(getTotalBeverages, 0);
  const fields = transactionsOnBeverage.map(getFieldsOfTransactions);

  const message = getQueryMessage(fields, totalBeverages);
  return message;
};

module.exports = {
  getTransactionDetailsOfPerson,
  getQueryMessage,
  getTransactionsOnEmpId,
  getTransactionsOnBeverage,
  getTransactionsOnDate,
  getFieldsOfTransactions,
  filterTransactionsOnBeverage,
  filterTransactionsOnDate,
  filterTransactionsOnEmpId
};
