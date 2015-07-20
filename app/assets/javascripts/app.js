var app = angular.module('todoer',
 ['ui.router', 'templates', 'Devise','angular-loading-bar','ngAnimate','ngFileUpload'])

app.constant("versionUrl", 'v1/')

app.config([
'$stateProvider',
'$urlRouterProvider',
'$httpProvider',
'cfpLoadingBarProvider',
'AuthProvider',
'versionUrl',
'AuthInterceptProvider',
function($stateProvider, $urlRouterProvider,$httpProvider,cfpLoadingBarProvider, AuthProvider,versionUrl,AuthInterceptProvider,Auth) {

  $stateProvider.state('home', {
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
        url: '/goal/:id?goal',
        templateUrl: 'goals/_goal.html',
        controller: 'GoalsController',
        module: 'private',
        animationClassName: 'slide_right',
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

//DEVISE
        
    // Customize login
    AuthProvider.loginMethod('POST');
    AuthProvider.loginPath('/api/' + versionUrl+ 'users/sign_in.json');

    // Customize logout
    AuthProvider.logoutMethod('DELETE');
    AuthProvider.logoutPath('/api/' + versionUrl+ 'users/sign_out.json');

    // Customize register
    AuthProvider.registerMethod('POST');
    AuthProvider.registerPath('/api/' + versionUrl + 'users.json');

    // Customize the resource name data use namespaced under
    // Pass false to disable the namespace altogether.
    // AuthProvider.resourceName(false);

    // Customize user parsing
    // NOTE: **MUST** return a truth-y expression
    // AuthProvider.parse(function(response) {
    //     return response.data.user;
    // });

    // Intercept 401 Unauthorized everywhere
    // Enables `devise:unauthorized` interceptor
    // AuthInterceptProvider.interceptAuth(true);
// 
}])

app.run(function($rootScope, $http, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
        
        $rootScope.animateViewChange = toState.animationClassName || 'slide_from_top';

        if ((toState.animationClassName == 'slide_right') && (toParams.goal == 'prev')) {
            $rootScope.animateViewChange = 'slide_left'
        }
    
        Auth.currentUser().then(function(user) {
            if (toState.module == 'private'){   
            } else if  (toState.module == 'public'){
                e.preventDefault()
                $state.go("home")
            }
        }, function(error) {
            if (toState.module == 'private'){
                e.preventDefault()
                $state.go("login")
            } else if  (toState.module == 'public'){

            }
        }); 
    });
});
