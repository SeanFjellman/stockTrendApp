import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GoogleLogin } from 'react-google-login';

const clientId = '372850350224-mlg4bpq850q586al9reqm48vsrd9bhdg.apps.googleusercontent.com'; // Replace with your client ID

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #16a085 0%, #f4d03f 100%);
    color: white;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 20px 0;
  font-size: 2.8em;
  font-weight: 300;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 30px;
`;

const LoginButton = styled(GoogleLogin)`
  font-size: 18px;
  font-weight: bold;
  padding: 15px 40px;
  border-radius: 8px;
  background-color: #27ae60;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2ecc71;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }
`;

function Login() {
  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
    // You can manage user session or redirect here
  };

  const onFailure = (error) => {
    console.error('Login Failed:', error);
    alert(`Failed to login. Error: ${error.error}, Details: ${error.details}`);
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <Logo src="path/to/your/logo.png" alt="Company Logo" />
        <Title>Welcome to Stock Trends App</Title>
        <LoginButton
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </LoginContainer>
    </>
  );
}

export default Login;
