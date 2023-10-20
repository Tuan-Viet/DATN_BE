import express from "express";
import { signin, signup } from "../controllers/auth.js";
import passport from "passport";

const routerAuth = express.Router();

routerAuth.get("/login/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "successful",
    user: req.user,
  });
});

routerAuth.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

routerAuth.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:5173/"); 
});

routerAuth.post("/register", signup);
routerAuth.post("/login", signin);

routerAuth.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

routerAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed", 
    successRedirect: "/login/success", 
  })
);

export default routerAuth;