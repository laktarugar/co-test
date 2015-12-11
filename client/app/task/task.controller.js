/**
 * Created by alexanderklimenko on 12/10/15.
 */

class TaskListCtrl {
  constructor(taskResource) {
    this._taskResource = taskResource;
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

  formatDataForProgressBar(record) {
    if (angular.isUndefined(record.$prorogress)) {
      record.$prorogress = [
        {
          status: record.build.release === null ? record.build.debug : record.build.release,
          progress: record.unitTest.progress | 0
        },
        {
          status: record.unitTest.status,
          progress: record.functionalTest.progress | 0
        },
        {
          status: record.functionalTest.status
        }
      ];
    }
    return record.$prorogress;
  }
}

angular
  .module('crossoverApp.task')
  .controller('TaskListCtrl', TaskListCtrl);
