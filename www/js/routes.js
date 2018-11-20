angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('splash', {
    url: '/splash',
    templateUrl: 'templates/splash.html',
    controller: 'splashCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'searchCtrl'
  })
.state('setting', {
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'settingCtrl'
  })
  .state('toRate', {
    url: '/toRate/:id',
    templateUrl: 'templates/toRate.html',
    controller: 'toRateCtrl'
  })
  .state('icons', {
    url: '/icons',
    templateUrl: 'templates/icons.html',
    controller: 'iconsCtrl'
  })

  .state('searchResult', {
    url: '/searchResult',
    templateUrl: 'templates/searchResult.html',
    controller: 'searchResultCtrl'
  })

  .state('tEST', {
    url: '/page7',
    templateUrl: 'templates/tEST.html',
    controller: 'tESTCtrl'
  })

  .state('disclaimer', {
    url: '/disclaimer',
    templateUrl: 'templates/disclaimer.html',
    controller: 'registerCtrl'
  })

 .state('iFollow', {
    url: '/iFollow',
    templateUrl: 'templates/iFollow.html',
    controller: 'iFollowCtrl'
  })

  .state('follow', {
    url: '/follow',
    templateUrl: 'templates/follow.html',
    controller: 'followersCtrl'
  })

  .state('profile', {
    url: '/profile/:id',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('myProfile', {
    url: '/myProfile/:id',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl'
  })

  .state('addPost', {
    url: '/addPost',
    templateUrl: 'templates/addPost.html',
    controller: 'addPostCtrl'
  })

$urlRouterProvider.otherwise('/splash')

  

});
