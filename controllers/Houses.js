import HousesModel from "../models/Houses.js";
import TouristResortModel from "../models/TouristResort.js";


/**
 * @description get all HOuses
 */
const getAllHouses = async (req, res) => {
    try {
        const Houses = await HousesModel.find({});
        return res.status(200).send({ success: true, message:"Houses data retrieved successfully", data:Houses });
      } catch (err) {
        return res.status(412).send({ message: `ERROR ${err}`,
        success: false,})
      }
};
/**
 * @description get package by id
 * @param {String} req.params.ID 
 */
const getHousesById = async (req, res) => {
    try {
      console.log(req.params.ID)
        const Houses = await HousesModel.findById({_id:req.params.ID});
        console.log(Houses)
        return res.status(200).send({ success: true, message:"Houses data retrieved successfully", data:Houses });
      } catch (err) {
        return res.status(412).send({error:true, message:"There is a problem retreiving the Houses data"})
      }
};
/**
 * @description add a Houses
 * @param {object} req.body
 */
const addHouses = async (req, res) => { 
    const newHouses = new HousesModel(req.body);
    newHouses
      .save()
      .then((response) => {
        res.status(200).send({ success: true, response });
      })
      .catch((err) => {
        res.status(500).json({
          message: `ERROR ${err}`,
          success: false,
        });
      });
  }
  
/**
 * @description update a Houses by id
 * @param {object} req.body
 * @param {String} req.params.ID
 */
const updateHousesById = async (req, res) => {
    let body=req.body;
    console.log(req.params.ID, req.body);
    try{
    const updateHouses = await HousesModel.findOneAndUpdate({_id:req.params.ID}, {$set:body});
    return res.status(200).send({success:true, message:updateHouses})
}catch(error){
    console.log(error)
   return res.status(410).send({error:true, message:"The is a problem validating the Houses data", data:error})

}
};
/**
 * @description delete a package by id
 * @param {String} req.params.ID
 */
// const deleteHouses = async (req, res) => {
//   try {
//     const deletedHouses = await HousesModel
//       .findOneAndDelete({
//         _id: req.params.ID,
//       });
//       deletedHouses.then({
//         function(success) {
//           return res.status(200).semd({ success: true, message: "This package deleted successfully" });
//         },
//         function(reject) {
//           return res.status(412).send({
//               error: true,
//               message: "There is a problem deleting the package",
//             });
//         },
//       });
//   } catch (err) {
//    return  res
//       .status(410)
//       .send({
//         message: `ERROR ${err}`,
//         success: false,
//       });
//   }
// };
const deleteHouses = async (req, res) => {
  try {
    const deletedHouses = await HousesModel.findOneAndDelete({
      _id: req.params.ID,
    });

    if (deletedHouses) {
      return res.status(200).send({ success: true, message: "This Houses deleted successfully" });
    } else {
      return res.status(412).send({ error: true, message: "There is a problem deleting the Houses" });
    }
  } catch (err) {
    return res.status(410).send({
      message: `ERROR ${err}`,
      success: false,
    });
  }
};

const filterBySpace = async (req, res, next)=>{
	try{
		const space = req.params.space;
		const spaces = await HousesModel.find({space})
		if(space.length < 1){
			return res.status(404).json("not found")
		}
		res.status(201).json(spaces)
	} catch(err){
		next(err)
	}
}
const filterByPrice = async (req, res, next)=>{
	try{
		const pricePerNight = req.params.pricePerNight;
		const prices = await HousesModel.find({pricePerNight})
		if(!prices){
			return res.status(404).json("not found")
		}
		res.status(201).json(prices)
	} catch(err){
		next(err)
	}
}
const filterByLocation = async (req, res, next)=>{
	try{
		const location = req.params.location;
		const locations = await TouristResortModel.find({location})
		if(!locations){
			return res.status(404).json("not found")
		}
		res.status(201).json(locations)
	} catch(err){
		next(err)
	}
}

const controllers = {
  getAllHouses,
  getHousesById,
  addHouses,
  updateHousesById,
  deleteHouses,
  filterBySpace,
  filterByPrice,
  filterByLocation,
};
export default controllers;
