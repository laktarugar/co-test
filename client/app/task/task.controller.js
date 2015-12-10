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
}

angular
  .module('crossoverApp.task')
  .controller('TaskListCtrl', TaskListCtrl);
