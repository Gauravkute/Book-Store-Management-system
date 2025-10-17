import React from "react";
import '../css/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [username , setUsername] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [grade , setGrade] = React.useState('');
  const [roll , setRoll] = React.useState('');
  const navigate = useNavigate(); 

  axios.defaults.withCredentials = true;
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/student/register',{roll , username, password,grade})
    .then(res=> {
      if(res.data.registered){
        navigate('/dashboard');
      }
      console.log(res);
  })
    .catch(err=> console.log(err));
  }
  return (
  <div className="login-page">
    <div className="login-container student-form-container">
      <form className="login-form student-form" onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className="form-group">
                    <label htmlFor="roll">Roll Number:</label>
                    <input type="text" id="roll" name="roll" placeholder="Enter Roll Number" required 
                    onChange={(e)=> setRoll(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter Username" required
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="grade">Grade:</label>
                    <input type="text" id="grade" name="grade" placeholder="Enter Grade" required
                    onChange={(e)=> setGrade(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter Password" required 
                    onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn-submit">Add Student</button>
                </form>
        </div>
    </div>
    ); 
}
export default AddStudent;