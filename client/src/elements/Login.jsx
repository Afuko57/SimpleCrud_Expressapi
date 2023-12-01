import React from 'react';
import { useAuth } from '../AuthContext'; 

function Login() {
  const { dispatch } = useAuth();

  const handleLogin = () => {
    const user = { id: 1, username: 'admin' };
    const role = 'admin'; 

    dispatch({ type: 'LOGIN', payload: { user, role } });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
