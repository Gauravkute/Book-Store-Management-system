import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const Connection = async () => {
    try{
        mongoose.connect(process.env.URL)
    console.log("Database connected successfully");
    } catch(err){
        console.log("Error while connecting to the database ", err);
    }
}

Connection();