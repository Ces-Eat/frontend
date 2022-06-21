import { IActionType } from "./ActionType.type";
import { INotification } from "./Notification.type";

export interface IAction {
  type: IActionType;
  payload: INotification;
}
