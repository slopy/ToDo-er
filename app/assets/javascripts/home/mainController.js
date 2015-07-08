angular.module('todoer')

.controller('MainController', [
'$scope',
'goals',
function($scope, goals){
	
	$scope.addGoal = function(){

	if(!$scope.title || $scope.title === '') { return; }
	if(!$scope.description || $scope.description === '') { return; }

	goals.create({
		title: $scope.title,
		description: $scope.description,
	});

	$scope.title = ""
	$scope.description = ""


	}; // end of addGoal

	goals.getAll()
	$scope.goals = goals.goals
} // end of function

])