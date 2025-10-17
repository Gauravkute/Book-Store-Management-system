import React from "react";
import {Link} from 'react-router-dom'
import '../css/Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const [username , setUsername] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [selectedRole , setSelectedRole] = React.useState('admin');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const [loading, setLoading] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState('');

  const handleSubmit=async ()=>{
    console.log('handleSubmit called', {username, password, role: selectedRole});
    setStatusMsg('Logging in...');
    setLoading(true);
    try{
      const res = await axios.post('http://localhost:3001/auth/login',{
        username,
        password,
        role: selectedRole 
      });
      console.log('login response', res.data);
      if(res.data.login && res.data.role === 'admin'){
        setRole('admin');
        navigate('/dashboard');
      }else if(res.data.login && res.data.role === 'student'){
        setRole('student');
        navigate('/');
      }else if(res.data.message){
        setStatusMsg(res.data.message);
      }
    }catch(err){
      console.error('login error', err);
      setStatusMsg('Login failed, see console');
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2><br />
        <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          required
          value={username ?? ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
          value={password ?? ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        </div>
        <div className="form-group">
        <label htmlFor="role">Role:</label>
  <select name="role" id="role" 
  onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole ?? 'admin'}>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select><br />
        </div>
        <button type="button" className="btn-login" onClick={handleSubmit} disabled={loading}>Login</button><br />
        {statusMsg && <div className="login-status">{statusMsg}</div>}
      </div>
    </div>
  );
}   
export default Login;