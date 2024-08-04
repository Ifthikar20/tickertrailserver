import express from 'express';
import MainModel from '../models/MainModel.js';
import User from '../models/UserModel.js';
//import userdata from "../data/userdata.js"

const router =express.Router();

router.get("/kpis",async (req, res)=>{
    try{
     const kpis =await MainModel.find();
      res.status(200).json(kpis);
    }catch(error){
      res.status(404).json({message:error.message});  
    }
});

router.post("/kpis/post", async (req, res) => {
  const newKpi = new MainModel(req.body);

  try {
      await newKpi.save();
      res.status(201).json(newKpi);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
});

router.post("/kpis/subscribe", async (req, res) => {
  const newuser = new User(req.body);

  try {
      await newuser.save();
      res.status(201).json(newuser);
      console.log("User for news letter entered")
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
});



export default router;