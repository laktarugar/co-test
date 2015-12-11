/**
 * Created by alexanderklimenko on 12/10/15.
 */

class TaskListCtrl {
  constructor(TaskResource) {
    this._taskResource = TaskResource;
    this.getList();
    this.selected = -1;
  }

  getList() {
    this.list = this._taskResource.query();
  }

  select(index) {
    if (index === this.selected) {
      this.selected = -1;
    } else {
      this.selected = index;
    }
  }

  /**
   * get progress for test
   *
   * @param record
   * @returns {Array}
   */
  formatDataForProgressBar(record) {
    function getProgress(status, progress) {
      switch(status) {
        case 'running':
          return progress;
        case 'passed':
        case 'failed':
          return 1;
        default:
          return 0;
      }
    }

    function getTestStatus(status) {
      return status === "running" ? null : status
    }

    if (angular.isUndefined(record.$prorogress)) {
      record.$prorogress = [
        {
          status: ((build) => {
            switch(build.debug) {
              case 'passed':
                return build.release;
              default:
                return build.debug;
            }
          })(record.build),
          progress: getProgress(record.unitTest.status, record.unitTest.progress)
        },
        {
          status: getTestStatus(record.unitTest.status),
          progress: getProgress(record.functionalTest.status, record.functionalTest.progress)
        },
        {
          status: getTestStatus(record.functionalTest.status)
        }
      ];
    }
    return record.$prorogress;
  }
}

TaskListCtrl.$inject = ['TaskResource'];

angular
  .module('crossoverApp.task')
  .controller('TaskListCtrl', TaskListCtrl);
