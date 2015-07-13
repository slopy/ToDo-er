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

<<<<<<< Updated upstream
  $urlRouterProvider.otherwise('home');
=======
    cfpLoadingBarProvider.includeSpinner = true;
    $httpProvider.useApplyAsync(true);  
    $urlRouterProvider.otherwise('login');

>>>>>>> Stashed changes
}])

// .run(function($rootScope, $location, $state) {

//     $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
//                                                    , fromState, fromParams) {
//         if(Auth.isAuthenticated()){
//            return; // no need to redirect 
//         }
//         else {
//             e.preventDefault(); // stop current execution
//             $state.go('login'); // go to login
//         }
//     });
// });