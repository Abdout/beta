// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      // Define the fields in the sign-in form
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch('/api/auth/authorize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });
          if (!response.ok) {
            throw new Error('Response not OK');
          }
          const user = await response.json();
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
} as NextAuthConfig;