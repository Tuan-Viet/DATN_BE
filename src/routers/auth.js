import express from "express";
import { changePassword, deleteUserPermanently, getAllUsersAsAdmin, signin, signup, updateUser } from "../controllers/auth.js";
import passport from "passport";
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from "../controllers/review.js";
import { checkAuthenticatedUser, checkPermission, checkUserPermission } from './../middlwares/checkPermission';

const routerAuth = express.Router();

routerAuth.post("/register", signup);
routerAuth.post("/login", signin);

routerAuth.get("/users",checkPermission, getAllUsersAsAdmin);
routerAuth.patch("/user/:id/update", updateUser);
routerAuth.delete("/users/:id",checkPermission, deleteUserPermanently);
routerAuth.post("/user/change/password",checkUserPermission('user'), changePassword);



routerAuth.get("/reviews", getReviews);

routerAuth.get("/review/:id", getReviewById);

routerAuth.post("/review", checkAuthenticatedUser, createReview);

routerAuth.put("/review/:id", checkAuthenticatedUser, updateReview);

routerAuth.delete("/review/:id", checkPermission, deleteReview);














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


routerAuth.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

routerAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed", 
    successRedirect: "/login/success", 
  })
);

export default routerAuth;