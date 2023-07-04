const {DataTypes} = require('sequelize')
const {db} = require('../database/db')

const Order = db.define('orders', {
  id:{
    primaryKey: true,
    allowNull:false,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  mealId:{
    type: DataTypes.INTEGER,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: false

  },
  status:{
    //active cancelled completed
    type: DataTypes.ENUM('active', 'cancelled' ,'completed'),
    defaultValue: 'active',
    allowNull: false

  }
})

module.exports = Order