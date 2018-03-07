module.exports = function(db){

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS [Employees] ([EmployeeID] INTEGER PRIMARY KEY AUTOINCREMENT,[Name] TEXT,[WorkingSite] TEXT,[BirthDate] DATE,[Address] TEXT,[Phone] TEXT)");
  });
}
