const io = require("./io");
const alert = require("./alert");
const { getTime } = require("./time");
const parseHtml = require("./html");
const areEqual = require("./compare");
const { getTestResultsAsHtml } = require("./request");

const processCovidResults = async (config) => {
  const html = await getTestResultsAsHtml(config);
  const fields = parseHtml(html);
  const lastResults = await io.getLastResults();

  if (!areEqual(fields, lastResults)) {
    await io.updateResults(fields);
    console.log("__STATUS_CHANGE__", fields, "\n");
    await alert();
  } else {
    console.log(`Found same results at`, getTime(), "\n");
  }
};

module.exports = processCovidResults;
