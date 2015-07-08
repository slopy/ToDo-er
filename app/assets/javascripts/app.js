// angular.module('todoer', [])

angular.module('todoer', ['ui.router', 'templates'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainController'
    })
    .state('goals', {
	  url: '/goals/{id}',
	  templateUrl: 'goals/_goals.html',
	  controller: 'GoalsController'
	});

  $urlRouterProvider.otherwise('home');
}])
