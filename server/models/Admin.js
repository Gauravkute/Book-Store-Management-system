import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const adminModel = mongoose.model('admin', adminSchema);
export  {adminModel as Admin};