import React from 'react';
import logo from './logo.svg';
import { Route,Routes } from 'react-router-dom';
import Signup from './pages/signup';
import ChatRoom from './pages/chatRoom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup/>} />

        <Route path="/" element={<ChatRoom/>} />
      </Routes>
    </div>
  );
}

export default App;
