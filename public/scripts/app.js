angular.module('todoListApp', [])
.controller('mainCtrl', function($scope, dataService) {

	dataService.getTodos(function(response) {
		var todos = response.data.todos;
		$scope.todos = todos;
	});

	$scope.newTodo = function() {
		$scope.todos.unshift({name: "New todo", completed: false});
	};

	$scope.deleteTodo = function(todo, index) {
		dataService.deleteTodo(todo).success(function() {
			$scope.todos.splice(index, 1);
		});
	};

	$scope.saveTodos = function() {
		var filteredTodos = $scope.todos.filter(function(todo) {
			if(todo.edited) {
				return todo;
			};
		});
		dataService.saveTodos(filteredTodos).finally($scope.resetTodos());
	};

	$scope.resetTodos = function() {
		$scope.todos.forEach(function(todo) {
			todo.edited = false;
		});
	};
});