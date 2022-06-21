import React, { useEffect, useState } from "react";
import { Alert, LinearProgress } from "@mui/material";
import s from "./Notification.module.scss";
import useNotificationCenter from "../hooks/useNotificationCenter";
import { INotification } from "../types";

const Notification: React.FC<INotification> = ({ id, type, message }) => {
  const { deleteNotification } = useNotificationCenter();
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const handleStartTimer = () => {
    const timerId = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(timerId);
        return prev;
      });
    }, 50);
    setIntervalId(timerId);
  };

  const handlePauseTimer = () => {
    if (intervalId) clearInterval(intervalId);
  };

  const handleCloseAlert = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      deleteNotification(id);
    }, 1000);
  };

  useEffect(() => {
    if (progress === 100) {
      handleCloseAlert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <Alert
      className={`${s.container} ${exit ? s.exit : ""}`}
      variant="filled"
      severity={type}
      onClose={() => deleteNotification(id)}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      {message}
      <LinearProgress
        color="inherit"
        variant="determinate"
        className={s.progressBar}
        value={progress}
      />
    </Alert>
  );
};

export default Notification;
