require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const users = require('./users.js');

module.exports = {
  sequelize: sequelize,
  users: users,
  DataTypes: DataTypes
}