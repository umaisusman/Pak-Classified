const mongoose = require('mongoose');


const citiesSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        provinceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Province",
          },
    }
)

module.exports = mongoose.model('City', citiesSchema)