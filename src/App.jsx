import React from 'react';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { auth, login, logout } = useAuth(); // Ensure this is within AuthProvider

  return (
    <div>
      {auth ? (
        <div>
          <h1>Welcome, {auth.name}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ name: 'User' })}>Login</button>
      )}
    </div>
  );
};

export default App;
