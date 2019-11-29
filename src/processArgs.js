const updateAndGetTransactionDetails = require("../src/saveUtilities.js")
  .updateAndGetTransactionDetails;
const getTransactionDetailsOfPerson = require("../src/queryUtilities.js")
  .getTransactionDetailsOfPerson;

const processArgs = function(args, filePath, existingTransactions, fileWriter) {
  const operation = args["operation"];
  const listOfOperations = {
    "--save": updateAndGetTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };

  let result = listOfOperations[operation](
    args,
    filePath,
    existingTransactions,
    fileWriter
  );
  return result;
};

exports.processArgs = processArgs;
