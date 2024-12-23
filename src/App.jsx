import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            alert('Time is up!');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(0);
    setCustomMinutes('');
    setCustomSeconds('');
  };

  const handleSetTime = () => {
    const minutes = parseInt(customMinutes, 10) || 0;
    const seconds = parseInt(customSeconds, 10) || 0;

    if (minutes >= 0 && seconds >= 0) {
      const totalSeconds = minutes * 60 + seconds;
      stopTimer();
      setTimeLeft(totalSeconds);
    } else {
      alert('Please enter valid positive numbers for both minutes and seconds.');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pomodoro Timer</h1>

      <div>
        <input
          type="number"
          placeholder="Minutes"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(e.target.value)}
          style={{ padding: '5px', margin: '5px' }}
        />
        <input
          type="number"
          placeholder="Seconds"
          value={customSeconds}
          onChange={(e) => setCustomSeconds(e.target.value)}
          style={{ padding: '5px', margin: '5px' }}
        />
        <button onClick={handleSetTime} style={{ padding: '10px', margin: '5px' }}>
          Set Time
        </button>
      </div>

      <h2 style={{ fontSize: '48px', margin: '20px 0' }}>{formatTime(timeLeft)}</h2>

      <div>
        <button onClick={resetTimer} style={{ margin: '5px', padding: '10px', background: 'orange' }}>
          Reset
        </button>
        <button onClick={startTimer} style={{ margin: '5px', padding: '10px', background: 'green', color: 'white' }}>
          Start
        </button>
        <button onClick={stopTimer} style={{ margin: '5px', padding: '10px', background: 'red', color: 'white' }}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;
