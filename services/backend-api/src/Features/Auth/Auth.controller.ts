import { HTTP } from "../../Common/http-response.type";
import express, { Request, Response } from "express";
import passport from "passport";
const router = express.Router();

router.get("/login/failed", (_req: Request, res: Response) => {
  res.status(401).json({
    data: null,
    errors: [],
  });
});

router.get("/login/success", (req: Request, res: Response) => {
  console.log("success");

  res.status(HTTP.OK).json({
    data: {
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies,
    },
    errors: null,
  });
});

router.get("/logout", (_req, res) => {
  //req.logout();
  res.redirect(process.env.CLIENT_URL ?? "");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response) => {
    console.log(req);
    req.logIn(req.user!, (err) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }
      res.redirect("/login/success"); // Redirect after successful login
    });
  }
);

router.get("/current-user", function (req: Request, res: Response) {
  if (req.isAuthenticated()) {
    // Check if user is authenticated
    res.status(HTTP.OK).json({
      data: {
        user: req.user, // The authenticated user
      },
      errors: null,
    });
  } else {
    res.status(HTTP.UNAUTHORIZED).json({
      data: null,
      errors: [{ message: "User is not authenticated." }],
    });
  }
});

export { router as AuthController };
