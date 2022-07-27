const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    tags: {type: Intl,required: true },
    name: {type: String, required: true },
    description: {type: String, required: true },
    creationdate: {type: String, required: true },

})

module.exports = mongoose.model('Album', albumSchema);