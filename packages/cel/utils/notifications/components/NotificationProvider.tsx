import { Container } from "@mui/material";
import React, { useReducer } from "react";
import s from "./NotificationProvider.module.scss";
import NotificationContext from "../contexts/NotificationContext";
import Notification from "./Notification";
import { IAction, IActionType, INotification } from "../types";

const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, dispatch] = useReducer(
    (state: INotification[], action: IAction) => {
      switch (action.type) {
        case IActionType.ADD_ALERT:
          return [...state, { ...action.payload }];
        case IActionType.DELETE_ALERT:
          return state.filter((el) => el.id !== action.payload.id);
        default:
          return state;
      }
    },
    []
  );

  return (
    <NotificationContext.Provider value={dispatch}>
      <Container className={s.container}>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </Container>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationsProvider;
