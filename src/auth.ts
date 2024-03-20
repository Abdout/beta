import NextAuth, { Session } from "next-auth"
// import TwoFactorConfirmation from "@/model/auth/factor-confirm";
import authConfig from "./auth.config";
import { getUserByEmail } from "@/data/user";
// import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserRole } from "@/lib/auth/role";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/auth/mongo";
import User from "@/model/auth/user";
import { getAccountByUserId } from "@/data/account";


type SessionUser = {
  name: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: string;
}; 

export const update = async (session: Session, user: SessionUser) => {
  session.user = {
    ...session.user,
    name: user.name,
    email: user.email,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    role: user.role as UserRole, // Cast role to UserRole
    id: session.user?.id,
    image: session.user?.image,
    isOAuth: session.user?.isOAuth || false,
  };

  return session;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await User.findByIdAndUpdate(user.id, { emailVerified: new Date() });
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('signIn callback called with user:', user);
      console.log('signIn callback called with account:', account);
      if (account?.provider !== "credentials") return true;

      if (user.email) {
        const existingUser = await getUserByEmail(user.email);
        console.log('Existing user:', existingUser); // Added console log

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      console.log('session callback called with session:', session);
      console.log('session callback called with token:', token);
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          role: token.role as UserRole,
          isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
          name: token.name,
          email: token.email || '',
          isOAuth: token.isOAuth as boolean,
        };
      }
    
      return session;
    },
    async jwt({ token }) {
      console.log('jwt callback called with token:', token);
      if (!token.sub || !token.email) return token;
    
      const existingUser = await getUserByEmail(token.email);
      console.log('Existing user in jwt callback:', existingUser); 
    
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email || '';
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      console.log('jwt callback updated token:', token);

      return token;
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});