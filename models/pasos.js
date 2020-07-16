const mongoose = require('mongoose')

const pasosSchema = new mongoose.Schema({
    brojPasosa:{
        type: String,
        required: true
    },
    datumIzdavanja:{
        type: Date,
        required: true,
        default: Date.now
    },
    idZivotinje:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('pasos', pasosSchema)