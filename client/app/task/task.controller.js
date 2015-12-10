/**
 * Created by alexanderklimenko on 12/10/15.
 */

class TaskListCtrl {
  constructor(taskResource) {
    this._taskResource = taskResource;
    this.getList();
  }

  getList() {
    this.list = this._taskResource.query();
  }
}

angular
  .module('crossoverApp.task')
  .controller('TaskListCtrl', TaskListCtrl);
