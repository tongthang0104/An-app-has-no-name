const Sequelize = require('sequelize');
const { PSQL_DB } = require('./../../config');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
.authenticate()
.then(function(err) {
  console.log('Connection to psql db has been established successfully.');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});


const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User:  sequelize.import(__dirname + '/user'),
};

module.exports = db;
