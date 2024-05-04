import connect from "@/db";
import User from "@/models/ProfileModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;  // User contains the role as a numeric value
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt ({ token,user,session }) {
      if (user) {
        return{
          ...token,
          id : user._id,
          role:user.role
        };
      }
      return token;
    },

    async session ({session, token, user}) {
      return{
        ...session,
        user : {
          ...session.user,
          role:token.role,
          id : token.id
        }
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
  },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
