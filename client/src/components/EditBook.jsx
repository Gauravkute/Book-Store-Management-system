import React, { useEffect } from "react";
import '../css/AddBook.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
    const [imageUrl, setImageUrl] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate(); 
  const {id} = useParams();
  
  // Debug state changes
  useEffect(() => {
    console.log('Current state:', { name, author, imageUrl });
  }, [name, author, imageUrl]);

  useEffect(() => {
    // Set withCredentials before making any requests
    axios.defaults.withCredentials = true;
    
    console.log('Fetching book with ID:', id);
    axios.get(`http://localhost:3001/book/book/${id}`)
      .then(res => {
        console.log('Book data received:', res.data);
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl); // Match the server's property name
      })
      .catch(err => {
        console.error('Error fetching book:', err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name,
        author,
        imageUrl
      };
      console.log('Updating book with data:', updateData);
      const res = await axios.put(`http://localhost:3001/book/book/${id}`, updateData);
      
      if (res.data.updated) {
        console.log('Book updated successfully');
        navigate('/books');
      } else {
        console.warn('Unexpected response:', res.data);
      }
    } catch (err) {
      console.error('Error updating book:', err.response?.data || err.message);
    }
  }
  return (
    <div className="login-page">
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Edit Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input type="text" id="book" name="book" placeholder="Enter book Name" required value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input 
                      type="text" 
                      id="author" 
                      name="author" 
                      placeholder="Enter author name" 
                      required 
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input 
                      type="text" 
                      id="imageUrl" 
                      name="imageUrl"  
                      required 
                      value={imageUrl}
                      placeholder="Enter image URL"
                      onChange={(e) => setImageUrl(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn-submit">Update</button>
                </form>
        </div>
    </div>
    ); 
}
export default EditBook;