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

    alert(goals.goals.length)
    $scope.goals = goals.goals

    var active_goals = []
    var done_goals = []
    var waiting_goals = []
    var all_goals = []

    angular.forEach(goals.goals,function(goal){
        
        if (goal.active == true) {
            active_goals.push(goal)
        } else {
            waiting_goals.push(goal)
            alert(goal.constructor.name)
        }
        
        if (goal.done == true) {
            done_goals.push(goal)
        }
       
    })

    $scope.waiting_goals = waiting_goals // 1st column
    $scope.active_goals = active_goals
    $scope.done_goals = active_goals
    $scope.all_goals = goals.goals

} // end of function

])