const fs = require('fs');
const path = require('path');

const {createFolder} = require('./foldersAndFilesCreator');

// createFolder('1800', ['roksi.txt', 'olya.txt']);
// createFolder('2000', ['lili.txt', 'olena.txt']);


// change file location
const pathOfFolder1 = path.join(process.cwd(), '1800');
const pathOfFolder2 = path.join(process.cwd(), '2000');
const helperPath = path.join(process.cwd(), 'helper');

// 1) найпростіший спосіб - це просто перейменувати папки використовуючи - helperPath
// fs.rename(pathOfFolder1, helperPath, err => err && console.log(err));
// fs.rename(pathOfFolder2, pathOfFolder1, err => err && console.log(err));
// fs.rename(helperPath, pathOfFolder2, err => err && console.log(err));



// or 2)
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

// changeFileLocation1(pathOfFolder1, pathOfFolder2);
// changeFileLocation1(pathOfFolder2, pathOfFolder1);



// or 3)
const changeFileLocation2 = () => {
    let firstFolderFiles = [];
    let secondFolderFiles = [];

    getFolderFiles(pathOfFolder1,(err, files) => firstFolderFiles = files);
    getFolderFiles(pathOfFolder2,(err, files) => secondFolderFiles = files);

    setTimeout(() => {
        moveFiles(firstFolderFiles, pathOfFolder1, pathOfFolder2);
        moveFiles(secondFolderFiles, pathOfFolder2, pathOfFolder1);
    });
}

const getFolderFiles = (path, callback) => {
    fs.readdir(path,(err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        callback(null, files);
    });
}

const moveFiles = (folderOfFiles, firstFolder, secondFolder) => {
    folderOfFiles.forEach(file => fs.rename(path.join(firstFolder, file), path.join(secondFolder, file),
                                            err => err && console.log(err)));
}

// changeFileLocation2();



//4) (by gender)
const menFolder = path.join(process.cwd(), 'men');
const womenFolder = path.join(process.cwd(), 'women');

const changeFileLocationByGender = folderPath => {
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

const moveFilesByGender = (currentFolderPath, newFolderPath, file) => {
    if (currentFolderPath === newFolderPath) {
        console.log(`file: ${file} - don't need to be moved`);
        return;
    }

    fs.rename(path.join(currentFolderPath, file),
              path.join(newFolderPath, file),
              err => err && console.log(err));
}

changeFileLocationByGender(womenFolder);
changeFileLocationByGender(menFolder);
