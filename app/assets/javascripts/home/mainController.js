angular.module('todoer')

.controller('MainController', [
'$scope',
'goals',
function($scope, goals){

	goals.getAll()

    $scope.goals = goals
    
    $scope.addGoal = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.description || $scope.description === '') { return; }

        goals.create({
            title: $scope.title,
            description: $scope.description,
        });

        $scope.title = ""
        $scope.description = ""

        goals.getAll()

        $scope.goals = goals

        $.fancybox.close()

    }; // end of addGoal

    $scope.toggleActive = function(id) {
      
        goals.toggleActiveState(id)
        goals.getAll()

        $scope.goals = goals
        
    } // end of toggleActive

    $scope.toggleDone = function(id) {
      
        goals.toggleDoneState(id)
        goals.getAll()

        $scope.goals = goals
        
    } // end of toggleActive

} // end of function

])