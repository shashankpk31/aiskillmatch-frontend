import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId')
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">AISkillMatch</Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              {localStorage.getItem('role') === 'JOBSEEKER' && (
                <Link to="/resume-upload" className="hover:underline">Upload Resume</Link>
              )}
              {localStorage.getItem('role') === 'JOBSEEKER' && (
                <Link to="/ai-chat" className="hover:underline">AI Chat</Link>
              )}
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;