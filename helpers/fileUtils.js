const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function readJsonFile(filePath) {
  try {
    const data = await readFileAsync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to read JSON file');
  }
}
async function writeJsonFile(filePath, data) {
  try {
    await writeFileAsync(filePath, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to write JSON file');
  }
}

module.exports = { readJsonFile, writeJsonFile };