import express from "express";
import { addAddress, addVourcher, changePassword, confirmRegistration, deleteAddress, deleteUserPermanently, forgotPassword, getAllUsersAsAdmin, getInfoUser, getUser, resetPassword, signin, signup, updateAddress, updateUser } from "../controllers/auth.js";
// import passport from "passport";
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from "../controllers/review.js";
import { checkAuthenticatedUser, checkPermission } from './../middlwares/checkPermission.js';

const routerAuth = express.Router();

routerAuth.get('/confirm-registration/:confirmationCode', confirmRegistration);
routerAuth.get('/reset-password/:token', resetPassword);

routerAuth.post("/register", signup);
routerAuth.post("/login", signin);
routerAuth.post("/user/forgotPassword", forgotPassword);


routerAuth.get("/users", checkPermission, getAllUsersAsAdmin);
routerAuth.patch("/user/:id/update", updateUser);
routerAuth.get("/user/:id/", getInfoUser);
routerAuth.delete("/users/:id", checkPermission, deleteUserPermanently);
routerAuth.post("/user/change/password", checkAuthenticatedUser, changePassword);
routerAuth.post("/user-address/add", checkAuthenticatedUser, addAddress);
routerAuth.post("/get-user", checkAuthenticatedUser, getUser);
routerAuth.patch("/user-address/:id/edit", checkAuthenticatedUser, updateAddress);
routerAuth.delete("/user-address/:id", checkAuthenticatedUser, deleteAddress);




routerAuth.get("/reviews", getReviews);

routerAuth.get("/review/:id", getReviewById);

routerAuth.post("/review", checkAuthenticatedUser, createReview);

routerAuth.put("/review/:id", checkAuthenticatedUser, updateReview);

routerAuth.delete("/review/:id", checkPermission, deleteReview);

routerAuth.put("/add-vourcher", addVourcher);












// routerAuth.get("/login/success", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "successful",
//     user: req.user,
//   });
// });

// routerAuth.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// routerAuth.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("http://localhost:5173/"); 
// });


// routerAuth.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// routerAuth.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login/failed", 
//     successRedirect: "/login/success", 
//   })
// );

export default routerAuth;