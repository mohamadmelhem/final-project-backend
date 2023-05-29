import express from 'express';
import auth from "../middleware/auth.js";
const router = express.Router();
import HousesControllers from "../controllers/Houses.js"
import controller from '../controllers/Admin.js';
import uploadImage from "../middleware/imageHandel.js";


router.get("/", HousesControllers.getAllHouses);
router.get("/:ID",
// auth(["superAdmin", "admin"]), 
HousesControllers.getHousesById)
router.post("/add",uploadImage,
// auth(["superAdmin", "admin"]), 
HousesControllers.addHouses);
router.put("/:ID",
// auth(["superAdmin", "admin"]),
 HousesControllers.updateHousesById);

router.delete("/:ID",
// auth(["superAdmin", "admin"]),
 HousesControllers.deleteHouses);
 router.post("/",uploadImage, HousesControllers.addHouses);
 router.get("/space/:space",HousesControllers.filterBySpace);
 router.get("/price/:pricePerNight",HousesControllers.filterByPrice);
 router.get("/location/:location",HousesControllers.filterByLocation);


export default router;