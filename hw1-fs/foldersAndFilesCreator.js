const fs = require('fs');
const path = require('path');


// create folder
function createFolder(folderName, [fistFileName, secondFileName]) {
    fs.access(path.join(process.cwd(), folderName), (err) => {

        if (err) {
            // console.log(err);
                            // or __dirname
            fs.mkdir(path.join(process.cwd(), folderName), {recursive: true}, err => err && console.log(err));

            createFile(folderName, fistFileName);
            createFile(folderName, secondFileName);

        } else {
            fs.readdir(path.join(process.cwd(), folderName),(err, data) => {
                if (err) {
                    console.log(err);
                } else if (data.length) {
                    console.log(`The folder - ${folderName} already exists and consists of file(s): ${data}.`);
                } else {
                    console.log(`The folder - ${folderName} is empty.`);
                }

                console.log('_______________');
            });

            createFile(folderName, fistFileName);
            createFile(folderName, secondFileName);
        }
    });
}


// create file
function createFile(folderName, fileName) {
    fs.access(path.join(process.cwd(), folderName, fileName), (err) => {

        if (err) {
            // console.log(err);
            fs.appendFile(path.join(process.cwd(), folderName, fileName),
                `the file name is: ${fileName}, exists in the folder: ${folderName}. \n`,
                // {flag: 'a'},
                err => err && console.log(err));

        } else {
            fs.readFile(path.join(process.cwd(), folderName, fileName),(err, data) => {
                if (err) {
                    console.log(err);
                } else if (data.toString()) {
                    console.log(`The file name is - ${fileName}`);
                    console.log('_______________');
                } else {
                    console.log(`The file - ${fileName} is empty.`);
                }
            });
        }
    });
}


module.exports = {
    createFolder
};
