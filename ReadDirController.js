module.exports = function(app, fs){
    // logger.log("info", "Read upload directory: /api/readdir")
    app.get('/api/readdir', function(req, res) {
        var testFolder = './upload/';
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                res.send(file);
            });
        })
    })
}