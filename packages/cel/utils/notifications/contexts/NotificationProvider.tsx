import React, { useReducer } from "react";
import NotificationContext from "./NotificationContext";
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
      <p>Hi</p>
      {notifications.map((notification) => (
        <div key={notification.id}>
          {notification.message} - {notification.type}
        </div>
      ))}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationsProvider;
