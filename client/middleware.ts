import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

export async function middleware() {
  let res = await auth.authStateReady();
  console.log(res);
}

export const config = {
  matcher: "/:path*",
};
