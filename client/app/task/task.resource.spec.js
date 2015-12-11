/**
 * Created by alexanderklimenko on 12/11/15.
 */
describe('task resource', () => {
  var TaskResource, $httpBackend;

  beforeEach(module('crossoverApp.task'));

  beforeEach(inject(function (_TaskResource_, _$httpBackend_) {
    TaskResource = _TaskResource_;
    $httpBackend = _$httpBackend_;
  }));

  it('query to server', () => {
    $httpBackend.whenGET('/api/task').respond(200, JSON.stringify([{_id: "1"}, {_id: "2"}]));

    let resArray = TaskResource.query();
    expect(resArray.length).toBe(0);

    $httpBackend.flush();

    expect(resArray.length).toBe(2);
    expect(resArray[0] instanceof TaskResource).toBe(true);
  });

  describe('status fail', () => {
    let testR;

    beforeEach(()=> {
      testR = new TaskResource({
        build: {
          debug: PassStatus,
          release: PassStatus
        },
        unitTest: {
          status: PassStatus
        },
        functionalTest: {
          status: PassStatus
        }
      });
    });

    it('All are passed', () => {
      expect(testR.status).toBe(PassStatus);
    });

    it('if failed release build then status will be failed', () => {
      testR.build = {
        debug: PassStatus,
        release: FailStatus
      };

      expect(testR.status).toBe(FailStatus);
    });

    it('if failed unit tests then status will be failed', () => {
      testR.unitTest.status = FailStatus;

      expect(testR.status).toBe(FailStatus);
    });

  });

});
