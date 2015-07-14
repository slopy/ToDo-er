angular.module('todoer', ['ui.router', 'templates', 'Devise','angular-loading-bar','ngAnimate'])
.config([
'$stateProvider',
'$urlRouterProvider',
'$httpProvider',
'cfpLoadingBarProvider',
function($stateProvider, $urlRouterProvider,$httpProvider,cfpLoadingBarProvider, Auth) {

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainController',
        module: 'private',
        resolve: {
            Promise: ['$q','Auth', function($q,Auth){
              var userInfo = Auth.currentUser();
     
              if (Auth.isAuthenticated()) {
                return $q.when(userInfo);
              } else {
                return $q.reject({ authenticated: false });
              }
            }]
        }
    })
    .state('goal', {
        url: '/goal/:id',
        templateUrl: 'goals/_goal.html',
        controller: 'GoalsController',
        module: 'private'
    })
    .state('user_profile',{
        url: '/my_profile',
        templateUrl: 'users/_user_profile.html',
        module: 'private',
        controller: 'UsersController',
        resolve: {
            Promise: ['$q','Auth', function($q,Auth){
              var userInfo = Auth.currentUser();
     
              if (Auth.isAuthenticated()) {
                return $q.when(userInfo);
              } else {
                return $q.reject({ authenticated: false });
              }
            }]
        }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthController',
      module: 'public'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthController',
        module: 'public'
    })

    cfpLoadingBarProvider.includeSpinner = true;
    $httpProvider.useApplyAsync(true);  
    $urlRouterProvider.otherwise('login');

}]).run(function($rootScope, $http, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {

        Auth.currentUser().then(function(user) {
            if (toState.module === 'private'){    
            } else if  (toState.module === 'public'){
                // e.preventDefault()
                e.preventDefault()
                $state.go("home")
            }
        }, function(error) {

            if (toState.module === 'private'){
                e.preventDefault()
                $state.go("login")
            } else if  (toState.module === 'public'){
    
            }
        }); 
    });
});

