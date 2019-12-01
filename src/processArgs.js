const updateAndGetTransactionDetails = require("./saveUtilities.js")
  .updateAndGetTransactionDetails;
const getTransactionDetailsOfPerson = require("./queryUtilities.js")
  .getTransactionDetailsOfPerson;
const readExistingTransactions = require("./readArgs.js")
  .readExistingTransactions;
const readArguments = require("./readArgs").readArguments;

const processArgs = function(processingArgs) {
  const {
    isExist,
    readFile,
    path,
    userArgs,
    fileWriter,
    date
  } = processingArgs;
  const argsListForReadingExistingTransactions = {
    isExist: isExist,
    readFile: readFile,
    path: path
  };
  const existingTransactions = readExistingTransactions(
    argsListForReadingExistingTransactions
  );
  const args = readArguments(userArgs, date);
  const operation = args["operation"];
  const listOfOperations = {
    "--save": updateAndGetTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };

  let result = listOfOperations[operation](
    args,
    path,
    existingTransactions,
    fileWriter
  );
  return result;
};

exports.processArgs = processArgs;
