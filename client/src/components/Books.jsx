import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'
import BookCard from "./BookCard";

const Books = ({role}) => {
  const[books , setBooks] = React.useState([]);

  React.useEffect(()=>{
    axios.get('http://localhost:3001/book/books')
    .then(res =>{
      // server returns an array of books
      setBooks(res.data || []);
      console.log('books fetched', res.data);
    }).catch(err => console.log(err));
  },[]);
  return (
    <div className="books">
      {
        books.map(book =>{
          return <BookCard key={book._id} book={book} role={role}/>
        })
      }
    </div>
  );
}   
export default Books;