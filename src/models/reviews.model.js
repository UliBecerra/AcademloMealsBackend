const {DataTypes} = require('sequelize')
const {db} = require('../database/db')

const Review = db.define('reviews', {
  id:{
    primaryKey: true,
    allowNull:false,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment:{
    type: DataTypes.TEXT,
    allowNull:false
    
  },
  restaurantId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating:{
    type: DataTypes.FLOAT,
    allowNull:false
  },
  status:{
    //active deleted
    type: DataTypes.ENUM('active', 'deleted'),
    allowNull: false,
    defaultValue: 'active'
  }
})

module.exports = Review