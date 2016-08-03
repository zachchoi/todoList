var Todo = require('./models/todo.js');

Todo.find({}, function(err, todos) {
	if(!err && !todos.length) {
		Todo.create({completed: false, name: "Add your first todo"});
	}
});