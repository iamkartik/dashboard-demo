'use strict';

const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    name: DataTypes.STRING
  }, {});

  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};