import { createContext } from "react";

const NotificationContext = createContext<Function>(() => null);

export default NotificationContext;
