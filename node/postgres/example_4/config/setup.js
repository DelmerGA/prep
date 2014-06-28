var config = {};

config.db = {
    database: "taco_dev",
    baseUrl: "postgres://localhost/",
    defaultDatabase: "postgres",
    getConStr: function(){
      return this.baseUrl + this.database;
    },
    getPGConStr: function(){
      return this.baseUrl + this.defaultDatabase;
    }
};


module.exports = config
