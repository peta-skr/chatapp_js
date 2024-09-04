import axios from "axios";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        name: { label: "Username" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        let res = await axios.post(
          "http://localhost:4000/login",
          {
            name: credentials.name,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return res.data;
      },
    }),
  ],
});
