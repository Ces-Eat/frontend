import { useEffectOnce } from "@ceseatslib/utils";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../hooks";

interface Props {
  requireAuth: boolean | string;
}

// @ts-ignore
const AuthGuard: React.FC<Props> = ({ children, requireAuth }) => {
  const {
    auth: { isAuthenticated, user },
  } = useStore();
  const router = useRouter();

  useEffectOnce(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  });

  // if auth initialized with a valid user show protected page
  switch (requireAuth) {
    case "commercial":
      if (isAuthenticated && user && user.role.id === 4) {
        return children;
      } else {
        router.push("/home");
      }
      break;
    case "technical":
      if (isAuthenticated && user && user.role.id === 5) {
        return children;
      } else {
        router.push("/home");
      }
      break;
    default:
      if (isAuthenticated) {
        return children;
      }
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <div />;
};

export default AuthGuard;
