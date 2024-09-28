import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

export function middleware() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);

      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

export const config = {
  matcher: "/signup",
};
