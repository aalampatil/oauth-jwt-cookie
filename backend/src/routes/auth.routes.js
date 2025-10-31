import { Router } from "express";
import passport from "../config/passport.js";
import { checkAuth } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router();

const options = {
  httpOnly: true,
  secure: false,     // ok for localhost
  sameSite: "lax",   // instead of "none" use "lax" when local or dont use samsite
};

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
     const { accessToken, refreshToken } = req.user;
  
    res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)

    res.redirect("http://localhost:5173");
  }
);


authRouter.route("/check-auth").get(verifyJWT, checkAuth)


export { authRouter };
