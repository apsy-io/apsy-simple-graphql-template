import {} from "next";

declare global {
  type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
    ? A
    : never;

  type AppAuthType = { email: string; password: string };

  type AppCommonChild = { children: React.ReactNode };
}
