import express from 'express';
import auth from "../middleware/auth.js";
const router = express.Router();
import packageControllers from "../controllers/TouristResort.js"
import controller from '../controllers/Admin.js';
import uploadImage from "../middleware/imageHandel.js";


router.get("/", packageControllers.getAllTouristResort);
router.get("/:ID",
// auth(["superAdmin", "admin"]), 
packageControllers.getTouristResortById)
router.post("/add",
// auth(["superAdmin", "admin"]), 
packageControllers.addTouristResort);
router.post("/",uploadImage, packageControllers.addTouristResort);
router.put("/:ID",
// auth(["superAdmin", "admin"]),
 packageControllers.updateTouristResortById);

router.delete("/:ID",
// auth(["superAdmin", "admin"]),
 packageControllers.deleteTouristResort);

 router.get("/idUser/:idUser",packageControllers.getTouristByIdUser);

export default router;