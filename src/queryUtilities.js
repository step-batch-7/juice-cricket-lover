const getArgsForQuery = function(args) {
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--empId": args[2]
    }
  };
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

exports.getArgsForQuery = getArgsForQuery;
exports.getTransactionDetailsOfPerson = getTransactionDetailsOfPerson;
exports.getQueryMessage = getQueryMessage;
