// imports
const express = require("express") 
const app = express() 
require("dotenv").config() 
const mongoose = require("mongoose") 
const morgan = require("morgan")
const cors = require('cors')

//controllers
const authCtrl = require("./controllers/auth")

// Middleware

app.use(cors())
app.use(express.json())
app.use(morgan("dev")) 

async function conntectToDB(){ 
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}

conntectToDB()

//Routes

//Public
app.use("/auth",authCtrl)
//Private

app.listen(process.env.PORT || 3000,()=>{
    console.log('App is running on port 3000')
})
