/**
 * Created by alexanderklimenko on 12/10/15.
 */
"use strict";

class StatusComponentCtrl {
  getProgressBarStyle(value) {
    return '{width: ' + Math.round(value) + '%}';
  }
}

angular.module('status-component', [])
  .directive('statusComponent', () => ({
    restrict: 'E',
    scope: {
      status: "=",
      progress: "="
    },
    templateUrl: 'components/status-component/status-component.html',
    controller: StatusComponentCtrl,
    controllerAs: 'sc'
  }));
