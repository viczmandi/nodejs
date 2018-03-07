module.exports = function(app, fs){

    app.post('/api/upload', function(req, res) {
        if(req.files){
            var file = req.files.filename;
            var filename = file.name;

            file.mv("./upload/"+filename, function(err) {
                if(err) {
                    if (err) throw err;
                    res.send("something went wrong!");
                } else {
                    res.send("successfully uploaded!");
                }
            })
        }
    })

    app.get('/api/delete/:file', function(req, res) {
        var url = './upload/' + req.params.file;        
        fs.unlink(url, (err) => {
            if (err) throw err;
            logger.log("info", 'successfully deleted ' + url);
        });
    })
}