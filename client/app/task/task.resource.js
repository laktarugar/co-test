/**
 * Created by alexanderklimenko on 12/9/15.
 */
angular
  .module('crossoverApp.task')
  .factory('taskResource', taskResource);

function taskResource($resource) {
  return $resource('/api/task/:taskId', {}, {
    query: {
      isArray: true,
      transformResponse: (data) => {
        data = JSON.parse(data);
        data.forEach((item) => {
          item.timeStarted = new Date(item.timeStarted);
        });
        return data;
      }
    }
  });
}

taskResource.$inject = ['$resource'];
