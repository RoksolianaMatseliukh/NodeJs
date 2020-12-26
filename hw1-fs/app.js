const fs = require('fs');
const path = require('path');


// create folder
// createFolder('1800', ['roksi.txt', 'olya.txt']);
// createFolder('2000', ['lili.txt', 'olena.txt']);

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



// change file location
const pathOfFolder1 = path.join(process.cwd(), '1800');
const pathOfFolder2 = path.join(process.cwd(), '2000');
const helperPath = path.join(process.cwd(), 'helper');

// 1) найпростіший спосіб - це просто перейменувати папки використовуючи - helperPath
// fs.rename(pathOfFolder1, helperPath, err => err && console.log(err));
// fs.rename(pathOfFolder2, pathOfFolder1, err => err && console.log(err));
// fs.rename(helperPath, pathOfFolder2, err => err && console.log(err));


// 2)
const changeFileLocation1 = (currentFolderPath, newFolderPath) => {

    fs.readdir(currentFolderPath,(err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(currentFolderPath, file),(err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.rename(path.join(currentFolderPath, file),
                          path.join(newFolderPath, file),
                   renameErr => renameErr && console.log(renameErr));
            });
        });
    });
}

changeFileLocation1(pathOfFolder1, pathOfFolder2);
changeFileLocation1(pathOfFolder2, pathOfFolder1);


// 3)
// changeFileLocation2();

function changeFileLocation2() {
    let firstFolderFiles = [];
    let secondFolderFiles = [];

    getFolderFiles(pathOfFolder1,(err, files) => firstFolderFiles = files);
    getFolderFiles(pathOfFolder2,(err, files) => secondFolderFiles = files);

    setTimeout(() => {
        moveFiles(firstFolderFiles, pathOfFolder1, pathOfFolder2);
        moveFiles(secondFolderFiles, pathOfFolder2, pathOfFolder1);
    });
}

function getFolderFiles(path, callback) {
    fs.readdir(path,(err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        callback(null, files);
    });
}

function moveFiles(folderOfFiles, firstFolder, secondFolder) {
    folderOfFiles.forEach(file => fs.rename(path.join(firstFolder, file), path.join(secondFolder, file),
                                            err => err && console.log(err)));
}


//3) (by gender)
const menFolder = path.join(process.cwd(), 'men');
const womenFolder = path.join(process.cwd(), 'women');

// changeFileLocationByGender(womenFolder);
// changeFileLocationByGender(menFolder);

function changeFileLocationByGender(folderPath) {
    fs.readdir(folderPath,(err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(folderPath, file),(err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                JSON.parse(data.toString()).gender === 'male'
                    ? moveFilesByGender(folderPath, menFolder, file)
                    : moveFilesByGender(folderPath, womenFolder, file)
            });
        });
    });
}

function moveFilesByGender (currentFolderPath, newFolderPath, file) {
    if (currentFolderPath === newFolderPath) {
        console.log(`file: ${file} - don't need to be moved`);
        return;
    }

    fs.rename(path.join(currentFolderPath, file),
              path.join(newFolderPath, file),
       err => err && console.log(err));
}
