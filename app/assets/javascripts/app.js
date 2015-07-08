// angular.module('todoer', [])

angular.module('todoer', ['ui.router', 'templates', 'Devise'])
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
        controller: 'GoalsController',
        resolve: {
          goalPromise: ['goals', function(posts){
            return goals.getAll(); }]
        }
	   })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('home');
}])
