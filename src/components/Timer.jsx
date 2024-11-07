import { useState, useEffect } from 'react';

const Timer = ({ task }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div style={{ margin: '1rem 0' }} className='fonty2 flex flex-col items-center'>
      <p>Time Spent: {Math.floor(time / 60)}m {time % 60}s</p>
      {!isRunning ? (
        <button onClick={handleStart} className='  px-2 py-1 backdrop-blur-xl border-2 border-[#333] rounded-lg'>Start Timer</button>
      ) : (
        <button onClick={handleStop} className='bg-[#f99696] p-1 rounded-lg'>Stop Timer</button>
      )}
    </div>
  );
};

export default Timer;
