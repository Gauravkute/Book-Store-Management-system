import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db.js' ;
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';
import { Book } from './models/Book.js';
import { Student } from './models/Student.js';
import { Admin } from './models/Admin.js'; 

const app=express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}));
app.use(cookieParser());
dotenv.config();
app.use('/auth', AdminRouter);
app.use('/student', studentRouter);
app.use('/book', bookRouter);
app.get('/dashboard',async (req,res)=>{
    try{
    const students = await Student.countDocuments();
    const books = await Book.countDocuments();
    const admin = await Admin.countDocuments();
    return res.json({ok:true, students, books, admin});
    }catch(err){
        return res.json(err);
    }
})

// Debug: list registered routes
app.get('/debug/routes', (req, res) => {
    const routes = [];
    app._router.stack.forEach(middleware => {
        if (middleware.route) {
            // routes registered directly on the app
            const methods = Object.keys(middleware.route.methods).join(',');
            routes.push({ path: middleware.route.path, methods });
        } else if (middleware.name === 'router') {
            // router middleware
            middleware.handle.stack.forEach(handler => {
                const route = handler.route;
                if (route) {
                    const methods = Object.keys(route.methods).join(',');
                    routes.push({ path: route.path, methods });
                }
            });
        }
    });
    res.json(routes);
});

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})

