// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngLodash'])

.run(function($ionicPlatform, $window, BeaconManagerService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Gimbal2.initialize('f640b178-9bcb-44e1-b3c9-d347c4c080cc');

        Gimbal2.startBeaconManager();
        console.log('beaconManager started');
        angular.element($window).on('beaconsighting', function(data){
            console.log('Beaconsighting: ', data);
            BeaconManagerService.storeVisitedBeacons(data);
      });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.fixtures', {
    url: '/fixtures',
    views: {
      'tab-fixtures': {
        templateUrl: 'templates/tab-fixtures.html',
        controller: 'FixturesCtrl'
      }
    }
  })

  .state('tab.players', {
      url: '/players',
      views: {
        'tab-players': {
          templateUrl: 'templates/tab-players.html',
          controller: 'PlayersCtrl'
        }
      }
    })


  .state('tab.highlights', {
    url: '/highlights',
    views: {
      'tab-highlights': {
        templateUrl: 'templates/tab-highlights.html',
        controller: 'HighlightsCtrl'
      }
    }
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller : 'DashboardController',

  })
  .state('locator', {
    url: '/locator',
    templateUrl: 'templates/locator.html',
    controller : 'LocatorController',

  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dashboard');

});
