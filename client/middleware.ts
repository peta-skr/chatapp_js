import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

export async function middleware() {
  let res = await auth.authStateReady();
}

export const config = {
  matcher: "/:path*",
};
