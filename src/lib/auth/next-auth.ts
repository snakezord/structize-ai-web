import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Import GoogleProvider

const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // pages: {
  //   signIn: "/login", // Configuration for custom sign-in page
  // },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  // Removed the adapter since Firestore is no longer needed
};

export default nextAuthOptions;
