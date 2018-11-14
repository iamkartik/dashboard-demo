'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    funded_amount: DataTypes.FLOAT,
    loan_amount: DataTypes.FLOAT,
    activity: DataTypes.STRING,
    sector: DataTypes.STRING,
    use: DataTypes.STRING,
    country_code: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    currency: DataTypes.STRING,
    partner_id: DataTypes.FLOAT,
    posted_time: DataTypes.DATE,
    disbursed_time: DataTypes.DATE,
    funded_time: DataTypes.DATE,
    term_in_months: DataTypes.FLOAT,
    lender_count: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    borrowers_genders: DataTypes.STRING,
    repayment_interval: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {});
  Loans.associate = function(models) {
    // associations can be defined here
  };
  return Loans;
};