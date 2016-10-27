var mongoose = require('mongoose');
var endpoint = mongoose.Schema({
        name: String,
        url: String,
        sequence: String,
        port: String,
        body: String,
        header: String
});

module.exports = mongoose.model('endpoints', endpoint);