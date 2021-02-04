const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const getTestResultsAsHtml = async ({ dob, barcode }) => {
  if (!(dob && barcode)) {
    throw new Error("dob and code are required");
  }

  const METHOD = "POST";
  const URL = "https://securelink.labmed.uw.edu/result";
  const params = new URLSearchParams();
  params.append("dob", dob);
  params.append("barcode", barcode);

  console.log("Checking for updated results...\n");
  // using URLSearchParams, the Content-Type header is set automatically
  const res = await fetch(URL, { method: METHOD, body: params });

  return res.text();
};

const getAppointmentResultsAsJSON = async ({ date, token, location }) => {
  if (!(date && token && location)) {
    throw new Error("date and token and location are required");
  }

  const URL = `https://d2ez0zkh6r5hup.cloudfront.net/v1/locations/${location}/slots?on_date=${date}&origin=react_mobile_app`;

  const res = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

module.exports = {
  getTestResultsAsHtml,
  getAppointmentResultsAsJSON,
};
