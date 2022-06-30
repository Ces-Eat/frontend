import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useStore } from "../hooks";

interface Props {
  requireAuth: boolean | string;
}

// @ts-ignore
const AuthGuard: React.FC<Props> = ({ children, requireAuth }) => {
  const {
    restaurant,
    auth: { isAuthenticated },
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  if (isAuthenticated) {
    if (requireAuth === "restaurant") {
      if (!restaurant) {
        router.push("/restaurant");
      }
    }
    return children;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <div />;
};

export default AuthGuard;
