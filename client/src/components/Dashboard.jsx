import React, { useEffect } from "react";
import '../css/Dashboard.css';
import axios from "axios";

const Dashboard = () => {
  const [student, setStudent] = React.useState(0);
  const [books, setBooks] = React.useState(0);
  const [admin, setAdmin] = React.useState(0);
  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
    .then(res=>{
      const data = res.data || {};
      // server may return student/books/admin or students/books/admin depending on implementation
      if(data.ok){
        setStudent(data.students ?? data.student ?? 0);
        setBooks(data.books ?? data.book ?? 0);
        setAdmin(data.admin ?? 0);
      }
    }).catch(err=> console.log(err));
  },[])
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-box">
          <h2>Total Books</h2><br />
          <h2>{books}</h2>
        </div>
        <div className="dashboard-box">
          <h2>Total Students</h2><br />
          <h2>{student}</h2>
        </div>
        <div className="dashboard-box">
          <h2>Total admin</h2><br />
          <h2>{admin}</h2>
        </div>
      </div>
    </div>
    ); 
}
export default Dashboard;