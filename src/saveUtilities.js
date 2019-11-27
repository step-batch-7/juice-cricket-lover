const fs = require("fs");

const updateTransactions = function(filePath, updatedTransactions) {
  fs.writeFileSync(filePath, updatedTransactions, "utf8");
};

const getArgsForSave = function(args, date) {
  let userArgs = {};
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--beverage": args[2],
      "--empId": args[4],
      "--qty": args[6],
      date: date
    }
  };
  return userArgs;
};

const getSaveMessage = function(newTransaction) {
  const message =
    "Transaction Recorded:" +
    "\n" +
    Object.keys(newTransaction) +
    "\n" +
    Object.values(newTransaction);
  return message;
};

const addPresentTransaction = function(
  EmployeeID,
  empIds,
  record,
  newTransaction
) {
  if (empIds.includes(EmployeeID)) {
    record[EmployeeID].push(newTransaction);
    return record;
  }
  record[EmployeeID] = [newTransaction];
  return record;
};

const getNewTransaction = function(userArgs, date) {
  const details = userArgs["transactionDetails"];
  const EmployeeID = details["--empId"];
  const newTransaction = {
    EmployeeID: details["--empId"],
    Beverage: details["--beverage"],
    Quantity: details["--qty"],
    Date: date
  };
  return newTransaction;
};

const updateAndGetTransactionDetails = function(
  userArgs,
  filePath,
  record,
  date
) {
  let newTransaction = getNewTransaction(userArgs, date);
  const empIds = Object.keys(record);
  const EmployeeID = userArgs["transactionDetails"]["--empId"];
  record = addPresentTransaction(EmployeeID, empIds, record, newTransaction);

  const updatedTransactions = JSON.stringify(record);
  updateTransactions(filePath, updatedTransactions);
  let message = getSaveMessage(newTransaction);
  return message;
};

exports.getArgsForSave = getArgsForSave;
exports.updateAndGetTransactionDetails = updateAndGetTransactionDetails;
exports.getNewTransaction = getNewTransaction;
exports.addPresentTransaction = addPresentTransaction;
exports.getSaveMessage = getSaveMessage;
