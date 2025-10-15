const asyncHandler = require("express-async-handler");
const Student = require("../Models/Student");
const Guide = require("../Models/Guide");
const bcrypt = require("bcrypt");


const addNewStudent = asyncHandler(async (req, res) => {
  const { rollNo, emailID, name, password, dept, guide} = req.body;
  let avatarURL = "";
  if (req.file) {
    avatarURL = req.file.path;
  }
  //confirm data 
  if (!name|| !password || !dept || !rollNo || !emailID || !guide) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for duplicates

  const duplicate = await Student.findOne({ emailID }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate found" });
  }

  const guideId = Guide.findOne({name : guide}).lean().exec();

  if(!guideId){
    return res.status(404).json({success: false, message: "Guide doesn't exist"})
  }

  const hashedPasswd = await bcrypt.hash(password, 10);
  //Store the newUser
  const newUser = {
    name,
    rollNo,
    password: hashedPasswd,
    emailID,
    dept,
    guide: guideId._id,
  };

  //create user
  const user = await Student.create(newUser);

  if (user) {
    res.status(201).json({ message: "new user created" });
  } else {
    res.status(400).json({ message: "Invalid data recieved" });
  }
});


const addNewGuide = asyncHandler(async (req, res) => {
  const { emailID, name, password, dept, panel_number } = req.body;
  console.log(emailID, name, password, dept, panel_number)
  let avatarURL = "";
  if (req.file) {
    avatarURL = req.file.path;
  }
  //confirm data 
  if (!name|| !password || !dept || !emailID || !panel_number) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for duplicates

  const duplicate = await Guide.findOne({ emailID }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate found" });
  }

  const hashedPasswd = await bcrypt.hash(password, 10);
  //Store the newUser
  const newUser = {
    name,
    password: hashedPasswd,
    emailID,
    dept,
    panel_number
  };

  //create user
  const user = await Guide.create(newUser);

  if (user) {
    res.status(201).json({ message: "new user created" });
  } else {
    res.status(400).json({ message: "Invalid data recieved" });
  }
});

module.exports = { addNewStudent, addNewGuide };
