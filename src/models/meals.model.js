const {DataTypes} = require('sequelize')
const {db} = require('../database/db')

const Meal = db.define('meals', {
  id:{
    primaryKey: true,
    allowNull:false,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  restaurantId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    //active disabled
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active'
  }
})

module.exports = Meal