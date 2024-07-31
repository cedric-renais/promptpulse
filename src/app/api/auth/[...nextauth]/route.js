import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Stocker l'identifiant de l'utilisateur de MongoDB dans la session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email: profile.email });

        // Sinon, créer un nouveau document et enregistrer l'utilisateur dans MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '_').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(
          `Erreur lors de la vérification de l'existence de l'utilisateur : `,
          error.message
        );
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
