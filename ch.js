import React, { useState, useEffect } from 'react';

function VulnerableApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      setLoggedIn(true);
      localStorage.setItem('user', username);
    } else {
      setMessage('Invalid credentials');
    }
  };

  const handleSearch = () => {
    setSearchResult(`Results for: ${searchTerm}`);
  };

  const handleSendMessage = () => {
    fetch('https://api.example.com/send-message', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <div dangerouslySetInnerHTML={{ __html: searchResult }} />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
}
