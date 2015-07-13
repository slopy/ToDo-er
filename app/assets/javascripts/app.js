angular.module('todoer', ['ui.router', 'templates', 'Devise','angular-loading-bar','ngAnimate'])
.config([
'$stateProvider',
'$urlRouterProvider',
'$httpProvider',
'cfpLoadingBarProvider',
function($stateProvider, $urlRouterProvider,$httpProvider,cfpLoadingBarProvider) {

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainController',
        module: 'private'
    })
    .state('goal', {
        url: '/goal/:id',
        templateUrl: 'goals/_goal.html',
        controller: 'GoalsController',
        module: 'private',
        resolve: {
            goalPromise: ['goals','$stateParams', function(goals, $stateParams){
                return goals.show($stateParams.id); }]
        }
    })
    .state('user_profile',{
        url: '/my_profile',
        templateUrl: 'users/_user_profile.html',
        module: 'private',
        controller: 'UsersController'
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


}]).run(function($rootScope, $http, $state) {

    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
    var loggedin

    $http.get('/loggedin.json').success(function(data){
        loggedin = true
        alert("1")

    }).error(function(data){
        loggedin = false
        alert("2")
    })   
        if ((loggedin == false) && (toState.module === 'private')){
            e.preventDefault()
            $state.go('login')
        alert("3")

        } else if ((loggedin == true) || (toState.module === 'public')){
     
        alert("4")

        }
    });

});

