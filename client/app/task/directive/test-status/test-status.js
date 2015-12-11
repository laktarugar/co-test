/**
 * Created by alexanderklimenko on 12/10/15.
 */
"use strict";

class TestStatusController {
  options = {
    chart: {
      type: 'pieChart',
      height: 140,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.y;
      },
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legendPosition: 'right',
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
    console.log(this.report);
    this.data =  [
      {
        key: this.report.done,
        y: this.report.done
      },
      {
        key: this.report.skip,
        y: this.report.skip
      }
    ];
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
