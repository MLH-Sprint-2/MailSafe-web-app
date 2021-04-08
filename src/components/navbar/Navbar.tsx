import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar: React.VFC< { 
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isLoggedIn, setIsLoggedIn }) => {

  const logout = () => {
      setIsLoggedIn(false);
  }
  
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <span className="navbar-title">MailSafe</span>
      </div>

      <div className="navbar-right">
        <ul>
          { isLoggedIn && (
            <>
              <li>
                <Link to="/create-alias">Add Alias</Link>
              </li>
              <li>
                <Link to="/aliases">Fetch Aliases</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <span onClick={logout}>Logout</span>
              </li>
            </>
          )}
        </ul>
      </div>

      
    </nav>
  );
}

export default Navbar;