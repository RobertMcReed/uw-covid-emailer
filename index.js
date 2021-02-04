require("dotenv").config();
const checkAvailableTimes = require("./lib/check");
const processCovidResults = require("./lib/process");

const DEFAULT_DELAY = 1;
const ENV_HRS = Number(process.env.DELAY_HRS);
const DELAY_HOURS = ENV_HRS > 0 ? ENV_HRS : DEFAULT_DELAY;
const DELAY_MS = DELAY_HOURS * 1000 * 60 * 60; // X hrs * 1000 ms/sec * 60 sec/min * 60 min/hr

const loop = async () => {
  try {
    if (!process.env.MODE) {
      await processCovidResults({
        dob: process.env.DOB,
        barcode: process.env.CODE,
      });
    } else {
      await checkAvailableTimes({
        start: process.env.START,
        numDays: Number(process.env.NUM_DAYS),
        token: process.env.TOKEN,
        location: process.env.LOCATION,
      });
    }
  } catch (error) {
    console.log(error);
  }

  setTimeout(loop, DELAY_MS);
};

const main = async () => {
  console.log(
    `Checking for ${
      process.env.MODE ? "vaccination" : "test"
    } results every ${DELAY_HOURS} hour${DELAY_HOURS === 1 ? "" : "s"}\n`
  );
  loop();
};

if (require.main === module) {
  main();
}
