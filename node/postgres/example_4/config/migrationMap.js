var config = require("./setup.js"),
  pg = require("pg");


var conString = config.db.getConStr(),
  pgConString = config.db.getPGConStr();

console.log(conString, config.db.getConStr())
/*
 *  tableObj = {
 *    name: "tacos",
 *    columns: [
 *      {name: "id type: "int", constraints: ["primary key"]},
 *      {name: "name", type: "varchar(50)"}
 *    ]
 *  }
 */
var db = {};

var columnsToList = function(columns) {
  var columnsStr;

  columnsStr = columns.map(function(column){
    var constraints = column.constraints;
    contraintStr = constraints ? constraints.join(" ") : "";
    return [column.name, column.type, constraints].join(" ");
  }).join(", ");

  return columnsStr = " (" + columnsStr + ")";
};

db.createTable = function(client, tableObj, next){
  var queryStr = 'CREATE TABLE IF NOT EXISTS ' + tableObj.name,
  columns = tableObj.columns;

  queryStr += columnsToList(columns);
  client.query(queryStr)
};




var createDB = function(){

  //
  pg.connect(pgConString, function(err, client, done){
    if (err) {
      console.error("OOPS! Something went wrong with PG", err);
    } else {
      client.query("CREATE DATABASE " + config.db.database, function(err){
        // ERROR thrown if DB already exists.
        if(err){
          console.error("DATABASE CREATION FAILED");
        }

        // Close connection 
        client.end();

        pg.connect(conString, function(err, dbClient, done){
          if (err) {
            console.error("FAILED TO CONNECT TO: " + conString, err);
          } else {
            console.log("CONNECTED TO: ", conString);
          }

          done();
        })
      })
    }
    done();
  });
};

db.createDB = createDB

module.exports = db;