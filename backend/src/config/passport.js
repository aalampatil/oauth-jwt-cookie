import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authUserModel } from "../models/authenticated.user.model.js";
import generateAccessAndRefreshToken from "../config/jwtTokens.js";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log(profile);
        const email = profile.emails[0].value;
        let user = await authUserModel.findOne({email})

        if(!user) {
                user = await authUserModel.create({
                email,
                password: "google-oauth",
                googleId: profile.id,
                name: profile.displayName,
                profilePicture: profile.photos[0]?.value || ""
            })
        }

        const {aToken, rToken} = await generateAccessAndRefreshToken(user._id);
        // console.log("log", aToken, rToken );
        
        user = user.toObject();
        user.accessToken = aToken;
        user.refreshToken = rToken
        
        // console.log( "user", user);
        

        return cb(null, user);
      } catch (error) {
        console.error("Error during Google auth:", error);
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await authUserModel.findById(id)
    cb(null, user);
});

export default passport