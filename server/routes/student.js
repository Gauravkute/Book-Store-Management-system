import express from 'express';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register', verifyAdmin,async (req, res) => {
    try{
        const {username, password , roll, grade} = req.body;
        const student = await Student.findOne({username});
        if(student){
            return res.json({message: "Student already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({username, password: hashedPassword, roll:roll, grade});
         await newStudent.save();
         return res.json({message: "Student registered successfully"});

    }catch(err){
        return res.status(500).json({message: "Server error"});
    }
})

export {router as studentRouter};