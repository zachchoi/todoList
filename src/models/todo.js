var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	completed: Boolean
});

var model = mongoose.model('Todo', schema);

module.exports = model;