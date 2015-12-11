'use strict';

angular.module('crossoverApp', [
  'crossoverApp.constants',
  'crossoverApp.task',
  'ngSanitize',
  'ui.router'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/task/task.html'
      });
  })
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
