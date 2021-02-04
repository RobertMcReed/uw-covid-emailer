const moment = require("moment");

const getTime = () => {
  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);

  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
};

const formatDate = (m) => m.format("YYYY-MM-DD");
const prettyDate = (m) => m.format("dddd, MMMM Do YYYY");

const _getMoment = (start) => (start ? moment(start) : moment());

const getMoment = (start) => {
  let m = _getMoment(start);
  const now = moment();

  if (m.diff(now) < 0) {
    console.log("__START_IN_PAST__ Setting start to today");

    return now;
  }

  return m;
};

const getMomentPlusDays = (m, days) => m.add(days, "days");

const isValidDay = (m) => true;

const prettyTime = (uglyDateTime) => moment(uglyDateTime).format("h:mm:ss a");

module.exports = {
  getTime,
  getMoment,
  formatDate,
  getMomentPlusDays,
  isValidDay,
  prettyDate,
  prettyTime,
};
