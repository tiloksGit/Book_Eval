const asyncHandler = require("express-async-handler")
const Guide = require("../Models/Guide")
const Panel = require("../Models/Panels")

const addPanel = asyncHandler( async (req,res) => {
    const {panel_number, Members} = req.body
    console.log(Members)
    if(!panel_number, !Members) {
        return res.status(400).json({success: false, Message: "All fields are required"})
    }

    findDuplicate = await Panel.findOne({panel_number}).lean().exec()

    if(findDuplicate){
        console.log(findDuplicate)
        return res.status(400).json({success: false, message: "Duplicate panel found"})
    }

    let members = []
    for(const guide of Members){
        const gde = await Guide.findOne({emailID : guide}).lean().exec()
        if(!gde){
            return res.status(404).json({success: false, message: `${guide} not yet registered`})
        }
        members.push(gde._id)
    };
    
    if(members.length){
    const panel = {
        panel_number,
        members
    }   
    

    const newPanel = await Panel.create(panel);

    if(newPanel){
        return res.status(200).json({success: true, message: "Panel Added Successfully"})
    }
    else{
        return res.status(400).json({success: false, message: "Panel Addition failed"})

    }
    }
})

module.exports = {addPanel}