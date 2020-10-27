const cheerio = require('cheerio');

const re = new RegExp('[1345]');
const parseHtml = (html) => {
    const $ = cheerio.load(html);
    const trs = $('#result-card > div > table > tbody > tr');

    const results = [];
    trs.each((trIdx, tr) => {
        const tds = $('td', tr);
        
        if (re.test(trIdx)) {
            if (tds.length === 2) {
                const kvPair = [];
                tds.each((tdIdx, td) => {
                    kvPair.push(getText(td));
                });

                results.push(kvPair);
            } else console.log('Found too many tds', tds);
        }
    });

    return results;
}

function getText(node) {
    const getTextRecursively = (currentNode) => {
        const { type, data, children } = currentNode;

        if (type === 'text') {
            return data.replace(/  /g, '').replace(/\n/g, '');
        } else if (type === 'tag' && children) {
            let childrenText = '';
            children.forEach(child => {
                childrenText += getTextRecursively(child);
            });

            return childrenText;
        } else return '';
    };

    return getTextRecursively(node);
}

module.exports = parseHtml;