import firebase from "firebase/app";
import "firebase/auth";

import { ACCESS_TOKEN_KEY } from "./constant";
import { saveCookie } from "../storage";

const firebaseConfig = {
  apiKey: "AIzaSyCl4NbsCls11nbBwXBGwY9spb5uE1VteiA",
  authDomain: "aps-volynt.firebaseapp.com",
  projectId: "aps-volynt",
  storageBucket: "aps-volynt.appspot.com",
  messagingSenderId: "427172579638",
  appId: "1:427172579638:web:73691df179fa6fd57d4b97",
  measurementId: "G-620HP1D4B0",
};

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export function fbRefreshToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          unsubscribe();
          resolve(user);
          // ...
        } else {
          reject("on referesh no user");
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function fbGetToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const fbUser = await firebase.auth()?.currentUser;
      if (!fbUser) {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const idToken = await user?.getIdToken(/* forceRefresh */ true);
            if (idToken) {
              saveCookie(ACCESS_TOKEN_KEY, idToken);
              resolve(idToken);
            }
            unsubscribe();

            // ...
          } else {
            reject("on token no user");
          }
        });
      } else {
        const idToken = await fbUser?.getIdToken(/* forceRefresh */ true);

        if (idToken) {
          saveCookie(ACCESS_TOKEN_KEY, idToken);
          resolve(idToken);
        }
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function fbCreateAccountBehalf(email: string, password: string) {
  let secondaryApp;
  try {
    secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
  } catch (e) {
    secondaryApp = firebase.app("Secondary");
  }
  try {
    const res = await secondaryApp
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return res.user?.email;
  } catch (err) {}
}

export async function fbSignUp(email: string, password: string) {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  return res.user?.email;
}

export async function fbSignOut() {
  const res = await firebase.auth().signOut();

  return res;
}

export async function fbSignUpToken(email: string, password: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fbSignUp(email, password);
      const idToken = await fbGetToken();
      resolve(idToken);
    } catch (err) {
      reject(err);
    }
  });
}
export async function fbSignInGoogleToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      const res = await firebase.auth().signInWithPopup(provider);

      const idToken = await fbGetToken();

      resolve(idToken);
    } catch (err) {
      reject(err);
    }
  });
}

export async function fbSignIn(email: string) {
  return new Promise<Array<string>>(async (resolve, reject) => {
    const res = await firebase.auth().fetchSignInMethodsForEmail(email);

    resolve(res);
  });
}

export async function fbRemoveUser() {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        reject("FAILED");
        return;
      }
      await user.delete();
      resolve("SUCCESS");
    } catch (err) {
      reject(err);
    }
  });
}

export async function fbSignInToken(email: string, password: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const idToken = await fbGetToken();

      resolve(idToken);
    } catch (err) {
      reject(err);
    }
  });
}

export async function fbPasswordReset(email: string) {
  return firebase.auth().sendPasswordResetEmail(email);
}

export async function fbGetUser() {
  return firebase.auth().currentUser;
}

export default firebase;
