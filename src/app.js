var express = require('express');

var app = express();

app.use(express.static('public'));

var router = express.Router();

var parser = require('body-parser');
app.use(parser.json());

require('./database');
require('./seed');

var Todo = require('./models/todo');

//GET route
router.get('/todos', function(req, res) {
	Todo.find({}, function(err, todos) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({todos: todos});
	});
});

//POST route
router.post('/todos', function(req, res) {
	var todo = req.body;
	Todo.create(todo, function(err, todo) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({todo: todo});
	});
});

//PUT route
router.put('/todos/:id', function(req, res) {
	var id = req.params.id;
	var todo = req.body;
	Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({todo: todo});
	});
});

//DELETE route
router.delete('/todos/:id', function(req, res) {
	var id = req.params.id;
	Todo.findByIdAndRemove(id, function(err, todo) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		else {
			res.json({message: "Todo deleted"});
		}
	});
});

app.use('/api', router);

app.listen(3000, function() {
	console.log("The server is running on port 3000");
});