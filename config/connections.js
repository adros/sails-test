module.exports.connections = {

  localMongoDB: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },

  scalingoMongoDB: {
    adapter: 'sails-mongo',
    host: 'books-adros-7266.mongo.dbs.appsdeck.eu',
    port: 30135,
    user: 'books-adros-7266',
    password: process.env.MONGO_PASSWD,
    database: 'books-adros-7266'
  }

};
