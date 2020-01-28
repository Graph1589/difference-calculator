import _ from 'lodash';

const fs = require('fs');

export default (firstData, secondData) => {
    const firstConfig = JSON.parse(fs.readFileSync(firstData));
    const secondConfig = JSON.parse(fs.readFileSync(secondData));
    const keys = Object.keys(Object.assign(firstConfig, secondConfig)).sort();
    const keysLength = keys.length;
    const diff = keys.reduce((acc, current, index, array) => {
        if ((_.has(firstConfig, current) && _.has(secondConfig, current)) && firstConfig[current] === secondConfig[current]) {
            return `${acc}   ${current}: ${firstConfig[current]}\n`;
        } else if ((_.has(firstConfig, current) && _.has(secondConfig, current)) && firstConfig[current] !== secondConfig[current]) {
            return `${acc} - ${current}: ${firstConfig[current]}\n${acc} + ${current}: ${secondConfig[current]}\n`;
        } else if (_.has(firstConfig, current) && !_.has(secondConfig, current)) {
            return `${acc} - ${current}: ${firstConfig[current]}\n`;
        } else if (!_.has(firstConfig, current) && _.has(secondConfig, current)) {
            return `${acc} + ${current}: ${secondConfig[current]}\n`;
        }
    }, '');
    const result = `{\n${diff}}`;
    //console.log(firstConfig);
    //console.log(secondConfig);
    console.log(result);
};