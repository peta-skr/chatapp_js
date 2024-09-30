"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export const FirebaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);

      const uid = user.uid;
      router.push("/signin");
      // ...
    } else {
      // User is signed out
      // ...
      console.log("err");
    }
  });

  return <>{children}</>;
};
