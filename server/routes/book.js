import express from 'express';
import { Book } from '../models/Book.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add', verifyAdmin, async (req, res) => {
    try{
        console.log('Adding book, request body:', req.body);
        if(!req.cookies || !req.cookies.token) {
            console.log('No auth token found');
            return res.status(401).json({message: 'Authentication required'});
        }

        const {name, author , imageurl} = req.body;
        if(!author) return res.status(400).json({message: 'Author is required'});
        if(!imageurl) return res.status(400).json({message: 'Image URL is required'});
        
        console.log('Creating book with:', {name, author, imageUrl: imageurl});
        const newBook = new Book({name, author, imageUrl: imageurl});
        await newBook.save();
        console.log('Book saved successfully:', newBook);
        return res.json({added: true, book: newBook});

    }catch(err){
        console.error('Error adding book:', err);
        if(err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error",
                error: err.message,
                details: err.errors
            });
        }
        return res.status(500).json({
            message: "Server error in adding book",
            error: err.message,
            type: err.name
        });
    }
})

// Unauthenticated test route (temporary) - accepts same payload and returns result
router.post('/add-test', async (req, res) => {
    try{
        const {name, author , imageurl} = req.body;
        if(!author) return res.status(400).json({message: 'Author is required'});
        if(!imageurl) return res.status(400).json({message: 'Image URL is required'});
        const newBook = new Book({name, author, imageUrl: imageurl});
        await newBook.save();
        return res.json({added: true, book: newBook});
    }catch(err){
        console.error('Error adding book (test):', err);
        return res.status(500).json({message: "Server error in adding book (test)", error: err.message});
    }
})

router.get('/books', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.json(books);
    }catch(err){
        return res.json(err);
    }
})

router.get('/book/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const books = await Book.findById({_id: id});
        return res.json(books);
    }catch(err){
        return res.json(err);
    }
})

router.put('/book/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const books = await Book.findByIdAndUpdate({_id: id}, req.body);
        return res.json({updated:true,books});
    }catch(err){
        return res.json(err);
    }
})

router.delete('/book/:id',async (req, res) => {
    try{
        const id = req.params.id;
        const books = await Book.findByIdAndDelete({_id: id});
        return res.json({deleted:true,books});
    }catch(err){
        return res.json(err);
    }
})
export {router as bookRouter};

// Test-only endpoint: add book without auth (temporary)
router.post('/add-test', async (req, res) => {
    try{
        const {name, author , imageurl} = req.body;
        if(!author) return res.status(400).json({message: 'Author is required'});
        if(!imageurl) return res.status(400).json({message: 'Image URL is required'});
        const newBook = new Book({name, author, imageUrl: imageurl});
        await newBook.save();
        return res.json({added: true, book: newBook});
    }catch(err){
        console.error('Error adding book (test):', err);
        return res.status(500).json({message: 'Server error in adding book', error: err.message});
    }
});