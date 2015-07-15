app.controller('GoalsController', [
'$scope',
'$stateParams',
'goals',
function($scope, $stateParams, goals){

    goals.show($stateParams.id)
    console.log(JSON.stringify(goals.goal))
    $scope.goal = goals.goal
    // console.log(JSON.stringify(goals))

}
])