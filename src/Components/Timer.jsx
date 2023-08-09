/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FiPlay, FiPause, FiRepeat } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import timerSound from "../assets/timer-sound.wav";
import { setInterval, setTimeSession } from "../store";

const Timer = () => {
  const dispatch = useDispatch();
  const timeSession = useSelector((state) => state.timeSession);
  const interval = useSelector((state) => state.interval);

  const [timeRemaining, setTimeRemaining] = useState(timeSession);
  const [intervalTime, setIntervalTime] = useState(interval);

  const [isRunning, setIsRunning] = useState(false);
  const [playSound, setPlaySound] = useState(undefined);

  useEffect(() => {
    setIntervalTime(interval * 60);
    setTimeRemaining(timeSession * 60);
  }, [timeSession, interval]);

  useEffect(() => {
    let timerTimeout;

    if (isRunning && timeRemaining > 0) {
      timerTimeout = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && intervalTime > 0 && timeRemaining === 0) {
      if (playSound === undefined) {
        setPlaySound(true);
      }
      timerTimeout = setTimeout(() => {
        setIntervalTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && intervalTime === 0 && timeRemaining === 0) {
      setPlaySound(true);
      setTimeRemaining(timeSession * 60);
      setIntervalTime(interval * 60);
    }

    return () => {
      clearTimeout(timerTimeout);
    };
  }, [isRunning, timeRemaining, intervalTime]);

  useEffect(() => {
    if (playSound) {
      const audio = new Audio(timerSound);
      audio.play();
      setPlaySound(false);
    }
  }, [playSound]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const startStop = () => {
    isRunning
      ? $("#break-label, #session-label").css({
          "pointer-events": "auto",
          opacity: 1,
        })
      : $("#break-label, #session-label").css({
          "pointer-events": "none",
          opacity: 0.5,
        });

    setIsRunning(!isRunning);
  };

  const repeatTimer = () => {
    $("#break-label, #session-label").css({
      "pointer-events": "auto",
      opacity: 1,
    });
    dispatch(setInterval(5));
    dispatch(setTimeSession(25));
    setTimeRemaining(25 * 60);
    setIntervalTime(5 * 60);
    setIsRunning(false);
    setPlaySound(undefined);
  };

  return (
    <div className="timer">
      <h3 id="timer-label">{timeRemaining === 0 ? "Break" : "Session"}</h3>
      <div>
        <p id="time-left">
          {timeRemaining === 0
            ? formatTime(intervalTime)
            : formatTime(timeRemaining)}
        </p>
      </div>
      <div>
        <button className="btn" onClick={startStop} id="start_stop">
          <FiPlay />
          <FiPause />
        </button>
        <button id="reset" className="btn" onClick={repeatTimer}>
          <FiRepeat />
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default Timer;
