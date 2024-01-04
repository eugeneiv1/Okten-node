const path = require('path');
const fs = require('fs');

const {createFolder, createMultFiles, createMultFolders} = require('./helpers/helpers');

const createdDirectory = path.join(__dirname, 'mainDirectory');

fs.access(createdDirectory, err => {
    if(err) {
        createFolder(createdDirectory);
        createMultFolders(5, createdDirectory);
        createMultFiles(5, createdDirectory);

        fs.readdir(createdDirectory, (err, files) => {
            if (err) {
                throw new Error()
            }

            for (const file of files) {
                const filePath = path.join(createdDirectory, file);
                fs.lstat(filePath, (err, stats) => {
                    if (stats.isDirectory()) {
                        console.log(`Folder: ${file}`);
                    } else if (stats.isFile()) {
                        console.log(`File: ${file}`);
                    }
                })
            }
        })
    }
})







