import express from "express";
import Controllers from "../controllers/Inbox.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
router.get("/",
// auth(["superAdmin", "admin"]),
 Controllers.getAllInbox);
router.get("/:ID",
// auth(["superAdmin", "admin"]),
 Controllers.getByIdInbox);
router.post("/add",
// auth(["superAdmin", "admin"]),
 Controllers.postInbox);
router.put("/:ID",
//  auth(["superAdmin", "admin"]),
 Controllers.putInbox);
router.delete("/:ID",
// auth(["superAdmin", "admin"]), 
Controllers.deleteInbox);
export default router;
