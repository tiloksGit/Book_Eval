const mongoose = require("mongoose")

const panelSchema = mongoose.Schema({
    panel_number:{
        type: String,
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Guide",
            required: true
        },
    ]
})


module.exports = mongoose.model("Panel", panelSchema);