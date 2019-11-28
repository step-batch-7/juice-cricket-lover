const fs = require("fs");

const updateTransactions = function(filePath, updatedTransactions, fileWriter) {
  fileWriter(filePath, updatedTransactions, "utf8");
};

const getSaveMessage = function(newTransaction) {
  const message =
    "Transaction Recorded:" +
    "\n" +
    "Employee ID,Beverage,Quantity,Date" +
    "\n" +
    Object.values(newTransaction);
  return message;
};

const addPresentTransaction = function(empId, empIds, record, newTransaction) {
  if (empIds.includes(empId)) {
    record[empId].push(newTransaction);
    return record;
  }
  record[empId] = [newTransaction];
  return record;
};

const getNewTransaction = function(userArgs) {
  const details = userArgs["transactionDetails"];
  const empId = details["--empId"];
  const newTransaction = {
    empId: details["--empId"],
    beverage: details["--beverage"],
    qty: details["--qty"],
    date: details["date"]
  };
  return newTransaction;
};

const updateAndGetTransactionDetails = function(
  userArgs,
  filePath,
  record,
  fileWriter
) {
  let newTransaction = getNewTransaction(userArgs);
  const empIds = Object.keys(record);
  const empId = userArgs["transactionDetails"]["--empId"];
  record = addPresentTransaction(empId, empIds, record, newTransaction);

  const updatedTransactions = JSON.stringify(record);
  updateTransactions(filePath, updatedTransactions, fileWriter);
  let message = getSaveMessage(newTransaction);
  return message;
};

exports.updateAndGetTransactionDetails = updateAndGetTransactionDetails;
exports.getNewTransaction = getNewTransaction;
exports.addPresentTransaction = addPresentTransaction;
exports.getSaveMessage = getSaveMessage;
