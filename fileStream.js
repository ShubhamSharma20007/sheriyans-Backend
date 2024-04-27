const fs = require('fs')

// write a new file 
// fs.writeFile('new.text', 'hello shubham', (err) => {
//     if (err) throw err;
//     console.log('File written successfully');
// })



//append the data

// fs.appendFile('new.text', '\nthis is a new data from append file system', (err) => {
//     if (err) throw err;
//     console.log('File written successfully');
// })


// rename the file
// fs.rename('new.text', 'example.text', (err) => {
//     if (err) throw err;
//     console.log('File renamed successfully');
// })



// copy file

// fs.copyFile('example.text', './folder/example.text', (err) => {
//     if (err) throw err;
//     console.log('file copied successfully');
// })

//unlink  means delete file

// fs.unlink('./folder/example.text', (err) => {
//     if (err) throw err;
//     console.log('file deleted successfully');
// })


// delete folder if the foler is empty 
// recursive : it  is allow delete the folder if the folder is not empty 

// fs.rm("folder", { recursive: true }, (err) => {
//     if (err) console.log(err.message);
//     else {
//         console.log("folder deleted successfully");
//     }

// })


// read the file

fs.readFile('example.text', 'utf-8', (err, data) => {
    if (err) console.log(err.message);
    else {
        console.log(data);
    }

})