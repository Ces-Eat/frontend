import { useEffectOnce } from "@ceseatslib/utils";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../hooks";

// @ts-ignore
const AuthGuard: React.FC = ({ children }) => {
  const {
    auth: { isAuthenticated },
  } = useStore();
  const router = useRouter();

  useEffectOnce(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  });

  // if auth initialized with a valid user show protected page
  if (isAuthenticated) {
    return children;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <div />;
};

export default AuthGuard;
