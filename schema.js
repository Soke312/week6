var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    name: String,
    entry: {type: Number, _index: 1, unique: true}
}, {collection: 'my_collection'});
exports.mySchema = mySchema;

