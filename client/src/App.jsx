import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Books from './components/Books';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Logout from './components/Logout';
import AddStudent from './components/AddStudent';
import BookCard from './components/BookCard';
import axios from 'axios';


function App() {
  const[role , setRole] = React.useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
      axios.get('http://localhost:3001/auth/verify')
      .then(res=>{
        if(res.data.login){
          setRole(res.data.role);
        }else{
          setRole('');
        }
      }).catch(err=> console.log(err));
    },[])
  return (
    <Router>
      <Navbar role = {role}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/books' element={<Books role={role}/>} />
        <Route path='/login' element={<Login setRole={setRole}/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/logout' element={<Logout setRole={setRole}/>} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/book/:id' element={<EditBook />} />
        <Route path='/delete/:id' element={<DeleteBook />} />
      </Routes>
    </Router>
  );
}

export default App;
