const path = require('path');
const fs = require('fs-extra');

const ROOT = path.resolve(`${__dirname}/..`);
const RESULTS = `${ROOT}/results.json`;

if (!fs.pathExistsSync(RESULTS)) {
    fs.writeJSONSync(RESULTS, []);
}

const getResults = async () => fs.readJSON(RESULTS);

const getLastResults = async () => {
    const results = await getResults();

    return results[results.length - 1] || null;
};

const updateResults = async (row) => {
    let results = await getResults();
    results.push(row);
    await fs.writeJSON(RESULTS, results, { spaces: 2 });

    return results;
};

module.exports = {
    getResults,
    getLastResults,
    updateResults,
};
