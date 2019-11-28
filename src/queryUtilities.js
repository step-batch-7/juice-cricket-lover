const getTotalBeverages = function(sum, transactions) {
  return sum + parseInt(transactions["qty"]);
};

const getTransactionsOfEmpId = function(transactionDetails) {
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
  const empData = record[empId];

  const totalBeverages = empData.reduce(getTotalBeverages, 0);
  const headings = Object.keys(empData[0]);
  const fields = empData.map(getTransactionsOfEmpId);

  const message = getQueryMessage(fields, totalBeverages);
  return message;
};

exports.getTransactionDetailsOfPerson = getTransactionDetailsOfPerson;
exports.getQueryMessage = getQueryMessage;
