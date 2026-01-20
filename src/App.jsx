// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import DeadlineIntro from './components/DeadlineIntro'; // Import component mới

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app-container">
      {!gameStarted ? (
        // Hiển thị Intro deadline trước
        <DeadlineIntro onStart={() => setGameStarted(true)} />
      ) : (
        // Vào game chính
        <Maze />
      )}
    </div>
  );
}

export default App;