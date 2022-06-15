export enum INotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
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
