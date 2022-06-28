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
    isRestaurant,
    auth: { isAuthenticated },
  } = useStore();
  const router = useRouter();

  useEffectOnce(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  });

  if (isAuthenticated) {
    if (requireAuth === "restaurant") {
      if (!isRestaurant) {
        router.push("/restaurant");
      }
    }
    return children;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <div />;
};

export default AuthGuard;
