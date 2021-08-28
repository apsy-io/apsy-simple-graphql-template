import { useRouter } from "next/router";
import { useCallback } from "react";

import { UserRole } from "src/@types/user.type";

export function isAdminUser(role?: UserRole) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}
export function isSupervisorUser(role?: UserRole) {
  return role === "DIRECTOR" || role === "MANAGER";
}

export function useRedirectOnRole() {
  const router = useRouter();

  const redirectUserOnRole = useCallback(
    (user, isFirstTime?: boolean) => {
      const redirectUrl = router.asPath;

      if (isSupervisorUser(user.role)) {
        router.push("/");
      }
    },
    [router]
  );

  //on user recieve redirect to proper page
  // useEffect(() => {
  //   if (user?.role && currentRole.current !== user?.role) {
  //     currentRole.current = user?.role;
  //     redirectUserOnRole(user.role);
  //   }
  // }, [user, lang]);

  //protect page with roles
  // useEffect(() => {
  //   if (user?.role && currentRole.current !== user?.role) {
  //     currentRole.current = user?.role;
  //     const path = router.asPath;
  //     if (!isAdminUser(user.role) && path.includes("/admin")) {
  //       //open a notification why redirected
  //       redirectUserOnRole(user.role);
  //     } else if (!isSupervisorUser(user.role) && path.includes("/manager")) {
  //       //open a notification why redirected
  //       redirectUserOnRole(user.role);
  //     } else if (user.role === "DIRECTOR") {
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (authNetState.firebase.error || authNetState.getUser.error) {
  //     if (!router.asPath.includes("auth/login")) {
  //       router.push(`${lang}/auth/login/`);
  //     }
  //   }
  // }, [authNetState]);
  return { redirectUserOnRole };
}
