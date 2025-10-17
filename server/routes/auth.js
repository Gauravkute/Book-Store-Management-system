// import express from 'express';
// import { Admin } from '../models/Admin.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { Student } from '../models/Student.js';

// const router = express.Router();


// router.post('./login', async (req, res) => {
//     const {username, password , role} = req.body;
//     try{
//     if(role === 'admin'){
//         const admin = await Admin.findOne({username});
//         if(!admin){
//             return res.json({message: "Admin not found"});
//         }
//             const validPassword = await bcrypt.compare(password, admin.password);
//             if(!validPassword){
//                 return res.json({message: "Invalid password"});
//             }
//             const token = jwt.sign({username:admin.username,role:'admin'},prorocess.env.Admin_key)
//             res.cookie('token',token,{hettpOnly:true, secure:true});
//             return res.json({login:true, role:'admin'});
//     }else if(role === 'student'){
//         const student = await Student.findOne({username});
//         if(!student){
//             return res.json({message: "student not found"});
//         }
//             const validPassword = await bcrypt.compare(password, student.password);
//             if(!validPassword){
//                 return res.json({message: "Invalid password"});
//             }
//             const token = jwt.sign({username:student.username,role:'student'},prorocess.env.Student_Key)
//             res.cookie('token',token,{httpOnly:true, secure:true});
//             return res.json({login:true, role:'student'});
//     }else{

//     }
// }catch(err){
//     return res.json({message: "Server error"});}
// })

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token){
//         return res.json({message: "No token found"});
//     }else{
//         jwt.verify(token,process.env.Admin_Key,(err,decoded)=>{
//             if(err){
//                 return res.json({message: "Invalid token"});
//             }else{
//                 req.username = decoded.username;
//                 req.role = decoded.role;
//                 next();
//             }
//         })
//     }
// }

// router.get('/verify', verifyToken, (req, res) => {
//     const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token){
//         return res.json({message: "Invalid user"});
//     }else{
//         jwt.verify(token,process.env.Admin_Key,(err,decoded)=>{
//             if(err){
//                 jwt.verify(token,process.env.Student_Key,(err,decoded)=>{
//             if(err){
//                 return res.json({message: "Invalid token"});
//             }else{
//                 req.username = decoded.username;
//                 req.role = decoded.role;
//                 next();
//             }
//                 })
//             }else{
//                 req.username = decoded.username;
//                 req.role = decoded.role;
//                 next();
//             }
//         })
//     }
// }
// })

// router.get('/verify', verifyUser, (req, res) => {
//     return res.json({login:true, role:req.role});
// })

// router.get('/logout',(req,res)=>{
//     res.clearCookie('token');
//     return res.json({message: "Logged out successfully"});
// });

// export {router as AdminRouter, verifyAdmin};

import express from 'express';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (role === 'admin') {
      const admin = await Admin.findOne({ username });
      if (!admin) return res.json({ message: "Admin not found" });

      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) return res.json({ message: "Invalid password" });

      const token = jwt.sign(
        { username: admin.username, role: 'admin' },
        process.env.Admin_Key
      );
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.json({ login: true, role: 'admin' });
    }

    if (role === 'student') {
      const student = await Student.findOne({ username });
      if (!student) return res.json({ message: "Student not found" });

      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) return res.json({ message: "Invalid password" });

      const token = jwt.sign(
        { username: student.username, role: 'student' },
        process.env.Student_Key
      );
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.json({ login: true, role: 'student' });
    }

    res.json({ message: "Invalid role" });
  } catch (err) {
    return res.json({ message: "Server error" });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: "No token found" });

  jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
    if (err) {
      jwt.verify(token, process.env.Student_Key, (err2, decoded2) => {
        if (err2) return res.json({ message: "Invalid token" });
        req.username = decoded2.username;
        req.role = decoded2.role;
        next();
      });
    } else {
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    }
  });
};

// Verify User Route
router.get('/verify', verifyToken, (req, res) => {
  return res.json({ login: true, role: req.role });
});

// Logout Route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: "Logged out successfully" });
});

// Optional: Admin-only middleware
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: "No token found" });

  jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
    if (err) return res.json({ message: "Invalid token" });
    if (decoded.role !== 'admin') return res.json({ message: "Access denied" });

    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};

export { router as AdminRouter, verifyAdmin };
