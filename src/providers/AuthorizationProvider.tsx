import { createContext, useContext, useState } from "react";

import { PartialUserType, UserType } from "src/@types/user.type";

type MaybeUser = Partial<UserType> | "NO_USER" | "LOADING";

export const UserContext = createContext<MaybeUser>("LOADING");

export const SetUserContext = createContext(
  {} as React.Dispatch<React.SetStateAction<MaybeUser>>
);

function AuthorizationProvider({ children }: any) {
  const [user, setUser] = useState<MaybeUser>("LOADING");

  return (
    <SetUserContext.Provider value={setUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </SetUserContext.Provider>
  );
}

export default AuthorizationProvider;

export const useSetUser = () => {
  const setUser = useContext(SetUserContext);
  if (setUser === undefined) {
    throw new Error("use set user inside context");
  }
  return setUser;
};

export const useGetUser = () => {
  const user = useContext(UserContext);
  // if (user === undefined) {
  //   throw new Error("");
  // }
  return user as PartialUserType;
};
export const useGetMaybeUser = () => {
  const user = useContext(UserContext);
  // if (user === undefined) {
  //   throw new Error("");
  // }
  return user;
};
