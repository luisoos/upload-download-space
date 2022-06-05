/* Importing packages */
const fs = require('fs');
const express = require("express");
const zip = require('express-zip');
const fileUpload = require("express-fileupload");

const app = express();


/* Routes */
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
  
app.post("/upload", function (req, res) {

    const path = './uploads/'
    const names = fs.readdirSync(path);
    
    if (req.files && Object.keys(req.files).length !== 0) {
        
        const uploadedFile = req.files.uploadFile;

        if (!names.includes(uploadedFile.name)) {
        
            console.log(uploadedFile);
        
            const uploadPath = __dirname + "/uploads/" + uploadedFile.name;
        
            uploadedFile.mv(uploadPath, function (err) {

                if (err) {

                    console.log(err);
                    res.send("Failed");

                } else { 

                    res.redirect('../');

                }

            });

        } else { 

            res.send("There already exists a file with that name"); 

        }

    } else { 

        res.send("No file uploaded"); 

    }

});

app.get("/downloadSingle/:filename", function (req, res) {

    const folderPath = './uploads/'
    let fileName = req.params.filename;

    res.download(`${folderPath}${fileName}`, function(err) {
        if (err) {
            console.log(err);
        }
    })

});
    
app.get("/download", function (req, res) {

    const folderPath = './uploads/'
    const names = fs.readdirSync(folderPath);

    let zipArray = [];

    names.forEach(function(fileName) {

        let json = {
            path: folderPath+fileName, 
            name: fileName
        }

        zipArray.push(json)

    });

    res.zip(zipArray)

});

app.get("/uploadedFiles", function (req, res) {

    const path = './uploads/'
    const names = fs.readdirSync(path);

    res.status(200).json({ message: names }) /* Will send the names of all files in an array */

})
  
app.get("/", function (req, res) {
  
    res.sendFile(__dirname + "/index.html");

});

  
app.listen(3000, function (req, res) {

    console.log("Started listening to port 3000");

});