/**
 * Created by alexanderklimenko on 12/9/15.
 */
angular
  .module('crossoverApp.task')
  .factory('taskResource', taskResource);



function taskResource($http) {
  class TaskResource {
    static url = '/api/task';
    static query = () => {
      let response = [];

      response.$promise = $http.get(TaskResource.url)
        .then((httpResponse) => {
          console.log('httpResponse',httpResponse.data);

          httpResponse.data.forEach((item) => {
            response.push(new TaskResource(item));
          });
          return httpResponse;
        });
      return response;
    };

    constructor(data) {
      Object.assign(this, data);
    }

    get status() {
      if (this.build.debug === 'failed' ||
        this.build.relise === 'failed' ||
        this.unitTest.status === 'failed' ||
        this.functionalTest.status === 'failed') {
        return 'failed';
      } else if (this.build.debug === 'passed' &&
        this.build.relise === 'passed' &&
        this.unitTest.status === 'passed' &&
        this.functionalTest.status === 'passed' ) {
        return 'passed';
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
