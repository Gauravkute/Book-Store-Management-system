import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({setRole}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get('http://localhost:3001/auth/logout')
      .then(res => {
        // server returns {message: "Logged out successfully"}
        // or {logout: true} in some implementations — accept both
        if(res.data && (res.data.logout || res.data.message)){
          if(typeof setRole === 'function') setRole('');
          navigate('/');
        }else{
          // fallback: still clear and navigate
          if(typeof setRole === 'function') setRole('');
          navigate('/');
        }
      }).catch(err=> {
        console.error('Logout error', err);
        if(typeof setRole === 'function') setRole('');
        navigate('/');
      });
  }, []);
  return (
    <div>
      <h2>You have been logged out.</h2>
    </div>
  );
}
export default Logout;