angular.module('todoer')

.controller('UsersController', [
'$scope',
'$state',
'Auth',
function($scope,$state,Auth){
    $scope.user = Auth._currentUser
}
]);