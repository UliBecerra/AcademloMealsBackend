const {DataTypes} = require('sequelize')
const {db} = require('../database/db')

const User = db.define('users', {
  id:{
    autoIncrement: true,
    allowNull:false,
    type: DataTypes.INTEGER,
    primaryKey:true
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false,
 
  },
  email:{
    type: DataTypes.STRING,
    allowNull:false,

  }, 
  password:{
    type: DataTypes.STRING,
    allowNull:false,

  }, 
  status:{
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull:false,
    defaultValue: 'active'

  }, 
  role:{
    type: DataTypes.ENUM('normal', 'admin'),
    allowNull:false,
    defaultValue: 'normal'
  }
})

module.exports = User