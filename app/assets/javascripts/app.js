// angular.module('todoer', [])

angular.module('todoer', ['ui.router', 'templates', 'Devise','angular-loading-bar','ngAnimate'])
.config([
'$stateProvider',
'$urlRouterProvider',
'cfpLoadingBarProvider',
function($stateProvider, $urlRouterProvider,cfpLoadingBarProvider) {

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function(user) {
            }, function(error) {
                $state.go('login');  
            });
        }]
    })
    .state('goal', {
        url: '/goal/:id',
        templateUrl: 'goals/_goal.html',
        controller: 'GoalsController',
        resolve: {
            goalPromise: ['goals','$stateParams', function(goals, $stateParams){
                return goals.show($stateParams.id); }]
        },
        onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function(user) {},
            function(error) {
                $state.go('login');  
            });
        }]

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
    })
    .state('user_profile',{
        url: '/my_profile',
        templateUrl: 'users/_user_profile.html',
        controller: 'UsersController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function(user) {
            }, function(error) {
                $state.go('login');  
            });
        }]
    })

  $urlRouterProvider.otherwise('home');

  cfpLoadingBarProvider.includeSpinner = true;
  

}])
