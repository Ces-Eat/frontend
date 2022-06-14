export enum INotificationType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}

export interface INotification {
  id: string;
  type: INotificationType;
  message: string;
}

export enum IActionType {
  ADD_ALERT = "ADD_ALERT",
  DELETE_ALERT = "DELETE_ALERT",
}

export interface IAction {
  type: IActionType;
  payload: INotification;
}
