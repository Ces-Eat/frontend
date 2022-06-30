import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../hooks";

interface Props {
  requireAuth: boolean | string;
}

// @ts-ignore
const AuthGuard: React.FC<Props> = ({ children, requireAuth = "" }) => {
  const {
    auth: { isAuthenticated, user },
  } = useStore();
  const router = useRouter();

  // if auth initialized with a valid user show protected page
  switch (requireAuth) {
    case "commercial":
      if (isAuthenticated && user && user?.role.id === 4) {
        return children;
      } else {
        router.push("/clients");
      }
      break;
    case "technical":
      if (isAuthenticated && user && user?.role.id === 5) {
        return children;
      } else {
        router.push("/logs");
      }
      break;
    default:
      if (isAuthenticated) {
        return children;
      }
  }

  router.push("/");
  /* otherwise don't return anything, will do a redirect from useEffect */
  return <div />;
};

export default AuthGuard;
