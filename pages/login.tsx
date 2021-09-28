import { useFirebaseAuth } from "src/graphql/auth/firebaseAuth";

const LoginPage = () => {
  const { signIn, signInLoading } = useFirebaseAuth();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => signIn("shahab.yazdi@apsaaz.com", "123456")}>
        Login
      </button>
      {signInLoading && <p>Loading....</p>}
    </div>
  );
};

export default LoginPage;
