"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/chat");
    }
  }, [session]);

  if (session.status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <main>
      <h1>login</h1>
      <button onClick={() => signIn()}>サインイン</button>
    </main>
  );
}
