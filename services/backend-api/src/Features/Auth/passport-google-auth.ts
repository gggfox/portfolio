import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport, { Profile } from "passport";
import { User } from "../Users/User.entity";
import { GoogleOAuthUserSchema } from "./google-profile.validation";

export function setup() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
      "Missing Google OAuth credentials in environment variables."
    );
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        callbackURL: "/auth/google/callback",
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        try {
          // Validate the profile using the schema
          const safeProfile = GoogleOAuthUserSchema.safeParse(profile);
          if (!safeProfile.success) {
            return done(new Error("Invalid profile data"));
          }

          // Check if the user already exists
          let user = await User.findOneBy({ id: profile.id });

          if (!user) {
            // Create a new user if not found
            user = await User.create({
              id: profile.id,
              username: profile.displayName,
              email: profile.emails?.[0]?.value ?? "",
              pictureUrl: profile.photos?.[0]?.value ?? "",
            }).save(); // Save to the database
            console.log("New user created: ", user);
          } else {
            console.log("Existing user found: ", user);
          }

          done(null, user); // Pass user to done callback
        } catch (error) {
          console.error("Error during authentication", error);
          done(error); // Pass error to done callback
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id); // Only save user ID in the session
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOneBy({ id });
      done(null, user ?? null); // Pass user or null if not found
    } catch (error) {
      done(error, null); // Handle any errors during deserialization
    }
  });
}
