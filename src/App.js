import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import React from 'react';
function App() {
  const STARTING_TIME = 5;
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);

  const handleChange = event => {
    const value = event.target.value;
    setText(value);
  };

  const calculateWordCount = text => {
    const wordsArr = text.trim().split(' ');
    const filteredArr = wordsArr.filter(word => word !== '');

    return filteredArr.length;
  };

  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText('');
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  };

  const endGame = () => {
    setWordCount(calculateWordCount(text));
    setIsTimeRunning(false);
  };

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
    if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);
  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        ref={textBoxRef}
        disabled={!isTimeRunning}
        value={text}
        onChange={handleChange}
      />
      <button disabled={isTimeRunning} onClick={startGame}>
        Start
      </button>
      <h4>Time remaining: {timeRemaining}</h4>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
