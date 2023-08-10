import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import timerSound from "../assets/timer-sound.wav";

const Clock = () => {
  const [interval, setInterval] = useState(5);
  const [session, setSession] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(session * 60);
  const [title, setTitle] = useState("Session");
  const audioElement = useRef(null);

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft >= 0) {
      timerId = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft < 0) {
      audioElement.current.play();

      if (title === "Session") {
        setTitle("Break");
        setTimeLeft(interval * 60);
      } else {
        setTitle("Session");
        setTimeLeft(session * 60);
      }
    }

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft, interval, session, title]);

  function formatNumberAsTime(minutes, seconds) {
    const totalSeconds = minutes * 60 + seconds;
    const formattedMinutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const formattedSeconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function disable(status) {
    status
      ? $("#controls").css({
          "pointer-events": "auto",
          opacity: 1,
        })
      : $("#controls").css({
          "pointer-events": "none",
          opacity: 0.5,
        });
  }

  const handleResetButton = () => {
    setIsRunning(false);
    setInterval(5);
    setSession(25);
    setTimeLeft(25 * 60);
    disable(true);
    setTitle("Session");
    audioElement.current.load();
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>

      <div id="controls" className="counters d-flex">
        <div className="m-4">
          <h5 id="break-label">Break Length</h5>
          <div className="d-flex justify-content-center">
            <button
              id="break-decrement"
              onClick={() => {
                if (interval > 1) {
                  setInterval(interval - 1);
                }
                return;
              }}
            >
              -
            </button>
            <p id="break-length">{interval}</p>
            <button
              id="break-increment"
              onClick={() => {
                if (interval < 60) {
                  setInterval(interval + 1);
                }
                return;
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="m-4">
          <h5 id="session-label">Session Length</h5>
          <div className="d-flex  justify-content-center">
            <button
              id="session-decrement"
              onClick={() => {
                if (session > 1) {
                  setSession(session - 1);
                  setTimeLeft((session - 1) * 60);
                }
                return;
              }}
            >
              -
            </button>
            <p id="session-length">{session}</p>
            <button
              id="session-increment"
              onClick={() => {
                if (session < 60) {
                  setSession(session + 1);
                  setTimeLeft((session + 1) * 60);
                }
                return;
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h5 id="timer-label">{title}</h5>
          <p id="time-left">
            {formatNumberAsTime(Math.floor(timeLeft / 60), timeLeft % 60)}
          </p>
        </div>
        <div>
          <button
            id="start_stop"
            onClick={() => {
              setIsRunning(!isRunning);
              disable(isRunning);
            }}
          >
            Play/Pause
          </button>
          <button id="reset" onClick={handleResetButton}>
            Reset
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={audioElement}
        src={timerSound}
      ></audio>
    </div>
  );
};

export default Clock;
