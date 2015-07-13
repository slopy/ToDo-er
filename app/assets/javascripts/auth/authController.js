angular.module('todoer')

.controller('AuthController', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){

    $scope.login = function() {
        Auth.login($scope.user).then(function(){
            $state.go('home');
        });
    };

    $scope.register = function() {
        Auth.register($scope.user).then(function(){
            $state.go('home');
            alert("6")
        });
    };

}]);