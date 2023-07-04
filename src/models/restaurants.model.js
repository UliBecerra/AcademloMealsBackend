const { DataTypes} = require('sequelize')
const {db} = require('../database/db')

const Restaurant = db.define('restaurants', {
  id:{
    primaryKey: true,
    allowNull:false,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  address:{
    type: DataTypes.STRING,
    allowNull:false

  },
  rating:{
    type: DataTypes.FLOAT,
    allowNull:false

  },
  status:{
    type: DataTypes.ENUM('active', 'disabled'),
    defaultValue: 'active',
    allowNull:false
  }

})

module.exports = Restaurant

