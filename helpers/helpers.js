const fs = require("fs");
const path = require("path");

function createFolder (folderName) {
    fs.mkdir(folderName, err => {
        if (err) {
            throw new Error()
        }
    })
}

function createMultFolders (numberOfFolders, destFolder) {
    const folder = path.join(destFolder, `folder${numberOfFolders}`);
    if (numberOfFolders === 1) {
        fs.mkdir(folder, err => {
            if(err) {
                throw new Error()
            }
        });
    } else {
        fs.mkdir(folder,  err => {
            if(err) {
                throw new Error()
            }
        });
        createMultFolders(numberOfFolders-1, destFolder)
    }
}

function createMultFiles (numberOfFiles, destFolder) {
    const pathToFile = path.join(destFolder, `text${numberOfFiles}.txt`);
    if (numberOfFiles === 1) {
        fs.openSync(pathToFile, 'w');
    } else {
        fs.openSync(pathToFile, 'w');
        createMultFiles(numberOfFiles-1, destFolder)
    }
}

module.exports = {createFolder, createMultFolders, createMultFiles};