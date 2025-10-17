import React from "react";
import '../css/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [imageUrl, setImageUrl] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate(); 

  axios.defaults.withCredentials = true;
  const [statusMsg, setStatusMsg] = React.useState('');
  
  // Debug state changes
  React.useEffect(() => {
    console.log('Current state:', { name, author, imageUrl });
  }, [name, author, imageUrl]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Adding book...');
    
    // Log the data being sent
    const bookData = {name, author, imageUrl}; // Match the database schema
    console.log('Attempting to add book with data:', bookData);
    
    try {
      // Log headers being sent
      console.log('Request headers:', {
        withCredentials: axios.defaults.withCredentials,
        cookies: document.cookie
      });
      
      const res = await axios.post('http://localhost:3001/book/add', bookData);
      console.log('Add book response:', {
        status: res.status,
        statusText: res.statusText,
        data: res.data
      });
      
      if (res.data && res.data.added) {
        setStatusMsg('Book added successfully!');
        navigate('/books');
      } else {
        const errorMsg = res.data?.message || 'Unexpected response from server';
        console.warn('Unexpected response format:', res.data);
        setStatusMsg(errorMsg);
      }
    } catch (err) {
      const errorDetails = {
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.message
      };
      console.error('Add book error details:', errorDetails);
      
      // Set a more descriptive error message
      let errorMessage = 'Failed to add book: ';
      if (err.response?.status === 401) {
        errorMessage += 'Not authenticated. Please log in again.';
      } else if (err.response?.status === 400) {
        errorMessage += err.response.data?.message || 'Invalid book data';
      } else if (err.response?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += err.response?.data?.message || err.message || 'Unknown error';
      }
      
      setStatusMsg(errorMessage);
    }
  }
  return (
    <div>
      <div className="login-page">
        <div className="login-container student-form-container">
          <form className="login-form student-form" onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input type="text" id="book" name="book" placeholder="Enter book Name" required 
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
                      value={author ?? ''}
                      onChange={(e)=> setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="Enter image URL"
                      required
                      value={imageUrl}
                      onChange={(e)=> setImageUrl(e.target.value)} />
                </div>
                <button type="submit" className="btn-submit">Add Book</button>
                </form>
                {statusMsg && <div className="status-msg">{statusMsg}</div>}
        </div>
      </div>
    </div>
    ); 
}
export default AddBook;