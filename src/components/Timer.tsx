import React, { FC, useEffect, useState } from 'react';

type timerStatusTypes = 'idle' | 'start' | 'pause' | 'reset';

const Timer: FC = () => {
  const [time, setTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<timerStatusTypes>('idle');

  useEffect(() => {
    let intervalId: null | ReturnType<typeof setTimeout> = null;

    if (timerStatus === 'start') {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    }

    if (timerStatus === 'reset') {
      setTime(0);
    }

    return () => clearInterval(Number(intervalId));
  }, [timerStatus]);

  return (
    <div>
      <h1>{time}</h1>
      {timerStatus === 'start' && (
        <button type="button" onClick={() => setTimerStatus('pause')}>
          pause
        </button>
      )}
      {timerStatus === 'pause' && time !== 0 && (
        <button type="button" onClick={() => setTimerStatus('start')}>
          resume
        </button>
      )}
      {(timerStatus === 'idle' || timerStatus === 'reset') && time === 0 && (
        <button type="button" onClick={() => setTimerStatus('start')}>
          start
        </button>
      )}
      {timerStatus === 'pause' && time !== 0 && (
        <button type="button" onClick={() => setTimerStatus('reset')}>
          reset
        </button>
      )}
    </div>
  );
};

export default Timer;
