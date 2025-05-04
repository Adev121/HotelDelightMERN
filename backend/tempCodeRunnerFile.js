import data from '../backend/export.json'
import fs from 'fs'

const readData = fs.readFileSync(data);
const jsondata = JSON.parse(readData);

console.log(jsondata)