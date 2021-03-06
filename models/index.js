/**
 * This file is common entrypoint for all sequelize models
 * which maps the db tables to objects.
 * The db connection is made according to the environment
 * All the models are read and imported and later exposed as
 * Sequelize models
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// db connection according to env 
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if(env==='production'){
  sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    dialect:'mysql',
    host:process.env.HOST
  });
}else{
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// reading all the .js files inside the models directory to import as sequelize models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

// looking for associations b/w models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
