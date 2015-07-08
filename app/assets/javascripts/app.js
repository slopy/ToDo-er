angular.module('todoer', [])

angular.module('todoer', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainController'
    });

  $urlRouterProvider.otherwise('home');
}])

.controller('MainController', [
'$scope',
function($scope){
	$scope.test = "Test test"
}
])




.factory('goals', [function(){
  // service body
}])