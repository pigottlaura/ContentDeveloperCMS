var mysql = require("mysql");

var connectionString = process.env.DB_CONNECTION_STRING;

console.log("CONNECTION STRING", connectionString);


require("dns").lookup(require("os").hostname(), function (err, address, fam) {
  console.log("IP ADDRESS:", address);
})

var connection = mysql.createConnection(connectionString);

if (connection.threadId == null) {
    connection.connect(function (err) {
        if (err) {
            console.error("Unable to connect to server " + err.stack + "\n");
        } else {
            console.log("Successfully connected to database \n");
        }
    });
}

module.exports = connection;