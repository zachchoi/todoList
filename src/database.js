var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-todo', function(err) {
	if(err) {
		console.log("Failed mongodb");
	}
	else {
		console.log("Connected to mongodb");
	}
});