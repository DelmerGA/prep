var pg = require('pg');

/**
 * See docs on postgresql
 *
 *    http://www.postgresql.org/docs/8.2/interactive/app-initdb.html
 * 
 * the `postgres` database is a defualt meant for use by all users, 
 *  utilities, and third party applications.
 */
 var connectionString = "postgres://localhost/postgres"


/**
 * the callback that runs after the conneciton to
 *  postgres
 */
 var makeQuery = function(err, client, done) {
   
   var handleQuery = function(err, result) {
     if(err) {
       console.error(err.message); 
      }
      console.log("Results: ", JSON.stringify(result.rows, null, "  "));
      done();
   };
   client.query('SELECT * FROM "pg_user"', handleQuery);
 };
 pg.connect(connectionString, makeQuery);

 // end the connection
 pg.end();
