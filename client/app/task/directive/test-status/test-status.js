/**
 * Created by alexanderklimenko on 12/10/15.
 */
"use strict";

class TestStatusController {
  options = {
    chart: {
      // rotate pie
      startAngle: (d) => d.startAngle+Math.PI/4,
      endAngle: (d) => d.endAngle+Math.PI/4,
      type: 'pieChart',
      height: 140,
      width: 250,
      x: (d) => d.key,
      y: (d) => d.value,
      duration: 500,
      labelThreshold: 0.01,
      legendPosition: 'right',
      showLabel: false,
      disableTooltip: true,
      color: [
        '#f8ac59',
        '#1ab394',
        '#ed5565'
      ],
      margin: {
        top: 5, right: 5, bottom: 5, left: 5
      },
      labelType: 'y',
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  constructor() {
    if (!angular.isUndefined(this.report.test)) {
      this.data = ['skipped', PassStatus, FailStatus].map((key) => ({
        key,
        value: this.report.test[key] ? this.report.test[key] : 0
      }));
    }
  }
}

angular
  .module('crossover.task.test-status', [
    'nvd3'
  ])
  .directive('testStatus', () => ({
    restrict: 'E',
    scope: {
      report: "=",
      name: '@'
    },
    bindToController: true,
    templateUrl: 'app/task/directive/test-status/test-status.html',
    controller: TestStatusController,
    controllerAs: 'tsc'
  }));
