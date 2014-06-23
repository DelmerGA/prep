// require the `pg` package
var pg = require("pg");

// create a connection string 
var conString = "postgres://localhost/blog_development";


/** 
 * Using the client constructor, `pg.Client`
 *  Using the constructor will demonstrate
 *  the ability to connect to the DB, but
 *  is not ideal for a situation with multiple
 *  queries. (See `../example_2`)
 */
var client = new pg.Client(conString);

var makeQuery = function(){
  client.query('SELECT NOW() AS "theTime"', function(err, result){
    if(err) {
      return console.error('Error running query', err);
    }
    console.log("The current time is: ", result.rows[0].theTime);

    // Ends the client connection
    client.end();
  });
};

/**
 * client.connect makes a connection and takes
 * a callback for an `error`, which will be passed
 * as a parameter.
 */
var connectionCallback = function(err){
  if(err){
    console.error('Oops! Something happened with the connection to postgres: ', err);
    return undefined;
  }
  makeQuery();
  
};

client.connect(connectionCallback);
