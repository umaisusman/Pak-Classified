const mongoose = require('mongoose');

const advertismentStatusSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
    }
)

module.exports = mongoose.model("Status", advertismentStatusSchema)