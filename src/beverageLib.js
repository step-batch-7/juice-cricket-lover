const fs = require("fs");

const readExistingTransactions = function(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const updateTransactions = function(filePath, updatedTransactions) {
  fs.writeFileSync(filePath, updatedTransactions, "utf8");
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

const getSaveMessage = function(newTransaction) {
  const message =
    "Transaction Recorded:" +
    "\n" +
    Object.keys(newTransaction) +
    "\n" +
    Object.values(newTransaction);
  return message;
};

const addTransactionDetails = function(userArgs, filePath, record, date) {
  let newTransaction = getNewTransaction(userArgs, date);
  const empIds = Object.keys(record);
  const EmployeeID = userArgs["transactionDetails"]["--empId"];
  record = addPresentTransaction(EmployeeID, empIds, record, newTransaction);

  const updatedTransactions = JSON.stringify(record);
  updateTransactions(filePath, updatedTransactions);
  let message = getSaveMessage(newTransaction);
  return message;
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

const getArgsForQuery = function(args) {
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--empId": args[2]
    }
  };
  return userArgs;
};

const readArguments = function(totalArgs, date) {
  const args = totalArgs.slice(2);
  let operation = args[0];
  let listOfOperations = {
    "--save": getArgsForSave,
    "--query": getArgsForQuery
  };

  let userArgs = listOfOperations[operation](args, date);
  return userArgs;
};
const getTotalBeverages = function(sum, transactions) {
  return sum + parseInt(transactions["Quantity"]);
};

const getTransactionsOfEmpId = function(transactionDetails) {
  return Object.values(transactionDetails);
};

const getQueryMessage = function(headings, fields, totalBeverages) {
  const message =
    headings +
    "\n" +
    fields.join("\n") +
    "\n" +
    "Total: " +
    totalBeverages +
    " Juices";
  return message;
};

const getTransactionDetailsOfPerson = function(args, filePath, record) {
  const details = args["transactionDetails"];
  const EmployeeID = +details["--empId"];
  const empData = record[EmployeeID];

  const totalBeverages = empData.reduce(getTotalBeverages, 0);
  const headings = Object.keys(empData[0]);
  const fields = empData.map(getTransactionsOfEmpId);

  const message = getQueryMessage(headings, fields, totalBeverages);
  return message;
};

const processArgs = function(args, filePath, previousDetails, date) {
  const operation = args["operation"];
  const listOfOperations = {
    "--save": addTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };
  let result = listOfOperations[operation](
    args,
    filePath,
    previousDetails,
    date
  );
  return result;
};

exports.readArguments = readArguments;
exports.processArgs = processArgs;
exports.readExistingTransactions = readExistingTransactions;
exports.getNewTransaction = getNewTransaction;
exports.addPresentTransaction = addPresentTransaction;
exports.getSaveMessage = getSaveMessage;
