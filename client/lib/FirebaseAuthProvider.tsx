"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const FirebaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const unsbuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        setLoad(true);

        const uid = user.uid;
        redirect("/signin");
        // ...
      } else {
        // User is signed out
        // ...
        console.log("err");
        setLoad(true);
      }
    });

    return () => unsbuscribe();
  }, []);

  if (!load) {
    return <>Loading</>;
  }

  return <>{children}</>;
};
