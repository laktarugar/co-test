/**
 * Created by alexanderklimenko on 12/9/15.
 */
angular
  .module('crossoverApp.task')
  .factory('TaskResource', taskResource);

const PendingStatus = 'pending',
  PassStatus = 'passed',
  FailStatus = 'failed',
  RunStatus = 'running';


function taskResource($http) {
  class TaskResource {
    static url = '/api/task';
    static query = () => {
      let response = [];

      response.$promise = $http.get(TaskResource.url)
        .then((httpResponse) => {
          httpResponse.data.forEach((item) => {
            response.push(new TaskResource(item));
          });
          return httpResponse;
        });
      return response;
    };

    constructor(data) {
      _.extend(this, data);
    }

    set timeStarted(_) {
      if (angular.isDate(_)) {
        this._timeStarted = _;
      } else {
        this._timeStarted = new Date(_);
      }
    }

    get timeStarted() {
      return this._timeStarted;
    }

    get status() {
      if (this.build.debug === FailStatus ||
        this.build.release === FailStatus ||
        this.unitTest.status === FailStatus ||
        this.functionalTest.status === FailStatus) {

        return FailStatus;
      } else if (this.build.debug === PassStatus &&
        this.build.release === PassStatus &&
        this.unitTest.status === PassStatus &&
        this.functionalTest.status === PassStatus ) {

        return PassStatus;
      } else if (this.build.debug === 'pending') {

        return 'pending';
      } else {

        return 'running';
      }
    }
  }

  return TaskResource;

  //return $resource('/api/task/:taskId', {}, {
  //  query: {
  //    isArray: true,
  //    transformResponse: (data) => {
  //      data = JSON.parse(data);
  //      data.forEach((item) => {
  //        item.timeStarted = new Date(item.timeStarted);
  //      });
  //      console.log('test', data.map((item) => new TaskResource(item)));
  //      return data.map((item) => new TaskResource(item));
  //    }
  //  }
  //});
}

taskResource.$inject = ['$http'];
