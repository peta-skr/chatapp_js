"use client";

import { Button } from "@nextui-org/react";
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
      <h1>Welcome my chat app</h1>
      <Button onClick={() => router.push("/signup")}>新規登録</Button>
      <Button onClick={() => signIn()}>ログイン</Button>
    </main>
  );
}
