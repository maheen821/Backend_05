import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import route from "./routes/UserRoutes.js";
const app = express();
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGOURI = process.env.MONGO_URI;

mongoose.connect(MONGOURI).then(()=>{
 console.log("Connected Successfully to Mongo DB");
 app.listen(PORT ,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
 })
}).catch((err) =>console.log(err));
app.use("/api" , route);