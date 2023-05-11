import express from "express";
const router = express.Router();
import userControllers from "../controllers/User.js";
// import auth from "../middleware/auth.js";

router.post("/add", userControllers.createUser);
router.get("/",
// auth(["superAdmin", "admin"]),
 userControllers.getAllUser);
router.get("/:ID",
// auth(["user", "admin", "superAdmin"]),
 userControllers.getUserByParam);
router.put("/:ID",
// auth(["user", "admin", "superAdmin"]),
userControllers.updateUserById);
router.delete("/:ID",
// auth(["user", "admin", "superAdmin"]),
userControllers.deleteUserById);
// router.post("/login",userControllers.login);
export default router;