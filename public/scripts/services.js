angular.module('todoListApp')
.service('dataService', function($http, $q) {

	this.getTodos =  function(callback) {
		console.log("http get has been called");
		$http.get('api/todos').then(callback);
	};

	this.deleteTodo = function(todo) {
		console.log("Delete has been called" + todo.name);
		if(!todo._id) {
			return $q.resolve();
		}
		return $http.delete('/api/todos/' + todo._id);
	};

	this.saveTodos = function(todos) {
		var queue = [];
		todos.forEach(function(todo) {
			var request;
			if(!todo._id) {
				request = $http.post('/api/todos', todo);
			}
			else {
				request = $http.put('/api/todos/' + todo._id, todo);
			}
			queue.push(request);
		});
		return $q.all(queue).then(function(results) {
			console.log("Save has been called" + todos.length);
		});
	}
});