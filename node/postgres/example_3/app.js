var pg = require("pg");


/**
* put this info into the ENV settings
*   and create a different DB depending
*   PRODUCTION VS. DEVELOPMENT VS. TESTING
*/
var baseString = "postgres://localhost/",
  dbName = "taco_dev",
  pgConString = baseString + "postgres",
  tacoDevConString = baseString + dbName;


var makeTable = function(client, tableName, tableStr){
  client.query('CREATE TABLE IF NOT EXISTS ' + tableName + tableStr, function(err){
    if (err) {
      console.log("FAILED TO CREATE: " + tableName, err);
    } else {
      console.log("TABLE CREATED: " + tableName);
    }
  })
};


var createDB = function(){

  //
  pg.connect(pgConString, function(err, client, done){
    if (err) {
      console.error("OOPS! Something went wrong with PG", err);
    }
    client.query("CREATE DATABASE " + dbName, function(err){
      // ERROR thrown if DB already exists.
      if(err){
        console.error("DATABASE CREATION FAILED");
      }

      // Close connection 
      client.end();

      pg.connect(tacoDevConString, function(err, dbClient, done){
        if (err) {
          console.error("FAILED TO CONNECT TO: " + tacoDevConString, err);
        }

        console.log("CONNECTED TO: ", tacoDevConString);
        makeTable(dbClient, "TACOS", "(ID INT PRIMARY KEY NOT NULL,  NAME CHAR(50))");
        done();
      })
    })
    done();
  });
};

createDB();


/**
* WATERFALL OF CONNECTIONS
*
* Connect to POSTGRES 
*   
*   IF ERROR then LOG the CONNECTION FAILURE
*   
*   Otherwise END the CLIENT connection to POSTGRES if EXISTING
*       
*   QUERY the CREATION of the TARGET DB
*     
*     IF ERROR then TARGET DB probably exists
*       log FAILURE
*     Otherwise attempt CONNECTION to TARGET DB
*       
*       LOG the FAILURE TO CONNECT
*       or LOG SUCCESSFUL CONNECTION
*
*
*/
