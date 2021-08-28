export type FirebaseToken = {
  aud: string;
  auth_time: number;
  email: string;
  email_verified: boolean;
  exp: number;
  firebase: {
    identities: { email?: Array<string> };
    sign_in_provider: "password" | string;
  };
  iat: number;
  iss: string;
  sub: string;
  user_id: string;
};

export type AuthPageKind = { kind: "login" | "signup" };

export type AuthWithPassword = (email: string, password: string) => void;
export type AuthUserIn = (token: string, isFirstTime?: boolean) => void;
export type AuthWithProvider = () => void;
