import { useContext } from "react";
import { v4 } from "uuid";
import NotificationContext from "../contexts/NotificationContext";
import { IActionType, INotificationType } from "../types";

const useNotificationCenter = () => {
  const dispatch = useContext(NotificationContext);

  const createNotification = (type: INotificationType, message: string) => {
    dispatch({
      type: IActionType.ADD_ALERT,
      payload: {
        id: v4(),
        type,
        message,
      },
    });
  };

  const deleteNotification = (id: string) => {
    dispatch({
      type: IActionType.DELETE_ALERT,
      payload: {
        id,
      },
    });
  };

  return { createNotification, deleteNotification };
};

export default useNotificationCenter;
