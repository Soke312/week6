var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    entry: {type: String, _index: 1, required: true}
}, {collection: 'my_collection'});
exports.mySchema = mySchema;

