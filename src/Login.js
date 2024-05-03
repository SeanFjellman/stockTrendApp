// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginView) {
      if (!username || !password) {
        alert('Username and password are required for login!');
        return;
      }else{
        navigate('/main');
      }
      console.log('Login submitted:', username, password);
    } else {
      if (!username || !password || !email || password !== confirmPassword) {
        alert('All fields are required and passwords must match for registration!');
        return;
      }
      console.log('Registration submitted:', username, email, password);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {isLoginView ? (
          <>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit">{isLoginView ? 'Login' : 'Register'}</button>
        <button type="button" onClick={toggleView}>
          {isLoginView ? 'Create Account' : 'Have an Account? Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
