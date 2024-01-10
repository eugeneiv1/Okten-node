const fs = require('fs/promises');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'db.json');

const readDbFile = async () => {
    const users = await fs.readFile(dbPath, {encoding: 'utf-8'});
    return JSON.parse(users);
}

const writeDbFile = async (data) => {
    await fs.writeFile(dbPath, data)
}

module.exports = {
    readDbFile,
    writeDbFile
}