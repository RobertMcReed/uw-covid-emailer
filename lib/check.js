const io = require("./io");
const alert = require("./alert");
const time = require("./time");
const areEqual = require("./compare");
const { getAppointmentResultsAsJSON } = require("./request");

const checkAvailableTimes = async (config) => {
  const mom = time.getMoment(config.start);
  const start = time.prettyDate(mom);
  const numDays = config.numDays || 1;
  console.log({ start });

  let daysChecked = 0;

  const results = [];
  const errs = [];
  // hacky way to counter that first add
  mom.subtract(1, "days");
  while (daysChecked < numDays) {
    mom.add(1, "days");

    if (!time.isValidDay(mom)) {
      continue;
    }

    daysChecked++;
    const date = time.formatDate(mom);
    const prettyDate = time.prettyDate(mom);
    // console.log("Checking date:", prettyDate);

    const { data, errors } = await getAppointmentResultsAsJSON({
      date,
      ...config,
    });

    if (errors) {
      console.log("\nERRORS:", errors, "\n");
      errs.push(errors);
    }

    const dateRes = {
      date: prettyDate,
      appointments: [],
    };

    data.forEach((appt) => {
      if (appt.availability) {
        dateRes.appointments.push({
          time: time.prettyTime(appt.appointment_date),
          availability: appt.availability,
        });
      }
    });

    if (dateRes.appointments.length) {
      console.log("__FOUND_APPOINTMENTS_ON__", prettyDate);
      results.push(dateRes);
    }
  }

  if (errs.length) {
    await alert({
      subject: "ERRORS IN VACCINE SCRIPT",
      text: JSON.stringify(errs),
      to: process.env.TO?.split?.(',')?.[0], // send to first person only
    });
  }

  if (results.length) {
    const jsonResults = JSON.stringify(results, null, 2);
    console.log(jsonResults, "\n");
    await alert({
      subject: "COVID VACCINATION AVAILABILITY!!!",
      text: jsonResults,
    });
  } else {
    console.log(
      "__SAD_GOVERNMENT__",
      "Did not find any available appointments between",
      start,
      "and",
      time.prettyDate(mom),
      "\n"
    );
  }
};

module.exports = checkAvailableTimes;
