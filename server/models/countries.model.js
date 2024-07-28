const mongoose = require('mongoose');


const countriesSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        code : {
            type : String,
            required : true
        }
    }
)

module.exports = mongoose.model('Country', countriesSchema)