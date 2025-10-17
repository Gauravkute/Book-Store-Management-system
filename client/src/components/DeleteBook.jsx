import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DeleteBook = () => {
    const Navigate = useNavigate();
    const {id} = useParams();
        React.useEffect(() => {
        axios.delete('http://localhost:3001/book/book/'+id)
        .then(res => {
            if(res.data.delete){
                Navigate('/books')
            }
        }).catch(err=> console.log(err));
      }, []);
  return (
    <div>DeleteBook</div>
  )
}
export default DeleteBook;