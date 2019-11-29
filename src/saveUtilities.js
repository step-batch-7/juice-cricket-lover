const updateTransactions = function(filePath, updatedTransactions, fileWriter) {
  fileWriter(filePath, updatedTransactions, "utf8");
};

const getSaveMessage = function(newTransaction) {
  const rows = [
    newTransaction.empId,
    newTransaction.beverage,
    newTransaction.qty,
    newTransaction.date.toJSON()
  ];
  const message = `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n${rows}`;
  return message;
};

const addPresentTransaction = function(record, newTransaction) {
  record.push(newTransaction);
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
  record = addPresentTransaction(record, newTransaction);

  const updatedTransactions = JSON.stringify(record);
  updateTransactions(filePath, updatedTransactions, fileWriter);
  let message = getSaveMessage(newTransaction);
  return message;
};

exports.updateAndGetTransactionDetails = updateAndGetTransactionDetails;
exports.getNewTransaction = getNewTransaction;
exports.addPresentTransaction = addPresentTransaction;
exports.getSaveMessage = getSaveMessage;
