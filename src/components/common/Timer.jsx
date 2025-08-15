import React, { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 180, onTimeout, className, onTick }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      if (onTimeout) onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeout]);

  useEffect(() => {
    if(onTick) onTick(seconds);
  }, [seconds, onTick]);

  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${min}:${s}`;
  };

  return <div className={`timer ${className}`}>{formatTime(seconds)}</div>;
}
