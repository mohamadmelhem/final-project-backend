import TouristResortModel from "../models/TouristResort.js";

const getAllTouristResort = async (req, res) => {
    try {
        const TouristResort = await TouristResortModel.find({});
        return res.status(200).send({ success: true, message:"Tourist Resort data retrieved successfully", data:TouristResort });
      } catch (err) {
        return res.status(412).send({error:true, message:"There is a problem retreiving the Tourist Resort data"})
      }
};
/**
 * @description get Tourist Resort by id
 * @param {String} req.params.ID 
 */
const getTouristResortById = async (req, res) => {
    try {
        const TouristResort = await TouristResortModel.find({_id:req.params.ID});
        return res.status(200).send({ success: true, message:"Tourist Resort data retrieved successfully", data:TouristResort  });
      } catch (err) {
        return res.status(412).send({error:true, message:"There is a problem retreiving the Tourist Resort data"})
      }
};
/**
 * @description add a Tourist Resort
 * @param {object} req.body
 */
const addTouristResort = async (req, res) => {
    console.log(req.body);
    let { location, description,images , isStatus, idUser } = req.body;
    let body = {  description: description, location: location, images:images , isStatus: isStatus,  idUser: idUser };
    const newTouristResort = new TouristResortModel({
      description, images , isStatus, location,  idUser
    });
    newTouristResort
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
  // const addTouristResort = async (req, res) => { 
  //   const newTouristResort = new TouristResortModel(req.body);
  //   newTouristResort 
  //     .save()
  //     .then((response) => {
  //       res.status(200).send({ success: true, response });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: `ERROR ${err}`,
  //         success: false,
  //       });
  //     });
  // }
  
  
/**
 * @description update a Tourist Resort by id
 * @param {object} req.body
 * @param {String} req.params.ID
 */
const updateTouristResortById = async (req, res) => {
    let body=req.body
    try{
    const updateTouristResort = await TouristResortModel.findOneAndUpdate({_id:req.params.ID}, {$set:body});
    return res.status(200).send({success:true, message:"The Tourist Resort data has been updated"})
}catch(error){
    console.log(error)
   return res.status(410).send({error:true, message:"The is a problem validating the Tourist Resort data", data:error})

}
};
/**
 * @description delete a Tourist Resort by id
 * @param {String} req.params.ID
 */
const deleteTouristResort = async (req, res) => {
    try {
      const deletedTouristResort = await TouristResortModel.findOneAndDelete({
        _id: req.params.ID,
      });
  
      if (deletedTouristResort) {
        return res.status(200).send({ success: true, message: "Tourist resort deleted successfully" });
      } else {
        return res.status(404).send({ error: true, message: "Tourist resort not found" });
      }
    } catch (error) {
      return res.status(500).send({ error: true, message: "There is a problem deleting the tourist resort" });
    }
  }
  


const controllers = {
  getAllTouristResort,
  getTouristResortById,
  addTouristResort,
  updateTouristResortById,
  deleteTouristResort,
};
export default controllers;
