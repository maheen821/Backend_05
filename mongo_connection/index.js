import mongoose from "mongoose";
import bodyParser  from "body-parser";
import express from 'express';
import dotenv from  'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT , () =>{
        console.log(`server is running on port ${PORT}`)
    })
}).catch((err)=>
    console.log(err));
