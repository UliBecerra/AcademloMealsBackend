const app = require("./app");
require('dotenv').config()
const {db} = require('./database/db')

const initModel = require('./models/initModel')

db.authenticate()
.then(console.log("DB authenticated 🪄 "))
.catch(err => console.log(err))

initModel()

db.sync()
.then(console.log("DB synced 🗝️"))
.catch(err => console.log(err)) 



const PORT = process.env.PORT
app.listen(PORT, () =>{
  console.log(`Server runnig  ${PORT}🍔`)
})