import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const [user, setUser] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, [])
  const handleLogout=()=>{

    localStorage.clear();
    // localStorage.removeItem('auth-user');
    // localStorage.removeItem('user');
    navigate('/login')
  }
  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default Dashboard;