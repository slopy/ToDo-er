angular.module('todoer')

.controller('GoalsController', [
'$scope',
'$stateParams',
'goals',
function($scope, $stateParams, goals){
    $scope.goal = goals.goals
}
])