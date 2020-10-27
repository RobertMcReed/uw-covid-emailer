const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const METHOD = 'POST';
const URL = 'https://securelink.labmed.uw.edu/result';

const getTestResultsAsHtml = async ({ dob, barcode }) => {
    if (!(dob && barcode)) {
        throw new Error('dob and code are required');
    }

    const params = new URLSearchParams();
    params.append('dob', dob);
    params.append('barcode', barcode);

    console.log('Checking for updated results...\n');
    // using URLSearchParams, the Content-Type header is set automatically
    const res = await fetch(URL, { method: METHOD, body: params });

    return res.text();
}

module.exports = getTestResultsAsHtml;