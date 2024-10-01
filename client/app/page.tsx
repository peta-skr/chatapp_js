"use client";

import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session.status == "authenticated") {
  //     router.push("/chat");
  //   }
  // }, [session]);

  // if (session.status === "loading") {
  //   return <p>loading...</p>;
  // }

  return (
    <main className="h-svh flex justify-center flex-col items-center gap-5">
      <h1 className="font-bold text-xl">Welcome my chat app</h1>
      <Link href="/signup">
        <Button color="primary">新規登録</Button>
      </Link>
      <Link href="/signin">
        <Button color="primary">ログイン</Button>
      </Link>
    </main>
  );
}
