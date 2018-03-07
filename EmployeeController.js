module.exports = function(app, db, jsonParser){

    var fields = ["EmployeeID", "Name", "WorkingSite", "BirthDate", "Address", "Phone"];

    // logger.log("info", "Registering endpoint: /api/select/all");
    app.get('/api/select/all', function(req, res){
        // logger.log("info", "SELECT " + fields.join(", ") + " FROM employees");
        db.all("SELECT " + fields.join(", ") + " FROM employees", function(err, rows) {
            res.json(rows);
        });
    });

    // logger.log("info", "Registering endpoint: /api/select/:p1/:p2");
    app.get('/api/select/:p1/:p2', function(req, res){

        var sql = "SELECT " + fields.join(", ") + " FROM employees WHERE " + req.params.p1 + " LIKE '%" + req.params.p2 + "%'";
        // logger.log("info", sql);

        db.all(sql, function(err, rows) {
            res.json(rows);
        });
    });

    // logger.log("info", "Registering endpoint: /api/insert");
    // http://localhost:3000/api/insert/kerteszattila/labs/2018.10.10/Miskolc3516Kozma/36707776006
    app.get('/api/insert/:name/:workingsite/:birthdate/:address/:phone', function(req, res){

        var values=[
          req.params.name,
          req.params.workingsite,
          req.params.birthdate,
          req.params.address,
          req.params.phone
        ];
        // logger.log("info", "INSERT " + fields.join(", ") + " INTO employees", values);
        db.run("INSERT OR IGNORE INTO employees (" + fields.join(", ") + ") VALUES (null,?,?,?,?,?)",values, function(err, rows) {
            if(!err) res.json({success:true});
        });
    });

    // logger.log("info", "Registering endpoint: /api/update/:employeeid/:name/:workingsite/:birthdate/:address/:phone");
    app.get('/api/update/:employeeid/:name/:workingsite/:birthdate/:address/:phone', function(req, res){

        var values=[
          req.params.name,
          req.params.workingsite,
          req.params.birthdate,
          req.params.address,
          req.params.phone,
          req.params.employeeid
        ];

        // logger.log("info", "UPDATE employees SET " + fields[0] + "=" + values[0] + ", "
        //                                    + fields[1] + "=" + values[1] + ", "
        //                                    + fields[2] + "=" + values[2] + ", "
        //                                    + fields[3] + "=" + values[3] + ", "
        //                                    + fields[4] + "=" + values[4] + 
        //             " WHERE EmployeeID=" + values[5]);

        var sql="UPDATE employees SET Name=?, WorkingSite=?, Birthdate=?, Address=?, Phone=? WHERE EmployeeID=?";

        db.run(sql, values, function(err, rows) {
            if(!err) return res.json({success:true});
            res.json({error:err});
        });
    });
}
