import React from 'react';

import './Landing.css'

import { Link } from 'react-router-dom';

import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';

const Landing: React.VFC<{
  type: "login" | "sign-up" | "none",
  isLoggedIn: boolean,
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ type, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="landing-content">
          <p className="landing-title">Protect yourself from data breaches with <span>MailSafe</span></p>
          <p className="landing-subtitle">Create your first email alias today</p>

          { type === "none" && !isLoggedIn && <Link to="/sign-up"><button className="landing-cta">Sign up now</button></Link> }
          { type === "none" && isLoggedIn && <Link to="/create-alias"><button className="landing-cta">Create alias</button></Link> }
          { type === "sign-up" && <Link to="/login"><button className="landing-cta">Login now</button></Link> }
          { type === "login" &&  <Link to="/sign-up"><button className="landing-cta">Sign up now</button></Link> }
          
        </div>
      </div>
      <div className="landing-right">
        { type === "login" && (setIsLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn}/> : "<p>Error. Missing property</p>") }
        { type === "sign-up" && (setIsLoggedIn ? <Signup setIsLoggedIn={setIsLoggedIn}/> : "<p>Error. Missing property</p>")}
        { type === "none" && (
          <p>Todo content</p>
        )}
      </div>
    </div>
  );
}

export default Landing;