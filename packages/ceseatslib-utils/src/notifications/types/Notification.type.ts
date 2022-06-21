import { INotificationType } from "./NotificationType.type";

export interface INotification {
  id: string;
  type: INotificationType;
  message: string;
}
