const updateAndGetTransactionDetails = require("./saveUtilities.js")
  .updateAndGetTransactionDetails;
const getTransactionDetailsOfPerson = require("./queryUtilities.js")
  .getTransactionDetailsOfPerson;

const readExistingTransactions = function(fileExists, fileReader, filePath) {
  if (!fileExists(filePath)) {
    return {};
  }
  return JSON.parse(fileReader(filePath, "utf8"));
};

const getArgsForSave = function(args, date) {
  let userArgs = {};
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--beverage": args[2],
      "--empId": args[4],
      "--qty": args[6],
      date: date()
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

exports.getArgsForSave = getArgsForSave;
exports.getArgsForQuery = getArgsForQuery;
exports.readArguments = readArguments;
exports.readExistingTransactions = readExistingTransactions;
