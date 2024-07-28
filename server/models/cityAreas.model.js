const mongoose = require('mongoose');


const cityAreasSchema = mongoose.Schema(
    {
        name: {
          type : String,
            required : true
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "City",
          },
    }
)

module.exports = mongoose.model('CityArea', cityAreasSchema)