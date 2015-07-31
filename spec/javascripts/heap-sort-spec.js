describe('heapSort()', function () {
  it('should sort an empty array', function () {
    var arr = [];
    expect(heapSort(arr)).toEqual([]);
  });

  it('should sort an array of one element', function () {
    var arr = [1];
    expect(heapSort(arr)).toEqual([1]);
  });

  it('should sort an array of three elements', function () {
    var arr = [2,3,4];
    expect(heapSort(arr)).toEqual([4,3,2]);
  });

  it('should sort three massive arrays', function () {
    var testSets = [];
    var numSets = 1;
    var arrLen = 40;
    var max = 1000;
    var set;
    for (var i = 0; i < numSets; i++) {
      set = [];
      for (var j = 0; j < arrLen; j++) {
        var sample = Math.floor(max * Math.random());
        if (Math.random() < 0.5) {
          sample *= -1;
        }
        set.push(sample);
      }
      testSets.push(set);
    }
    for (i = 0; i < numSets; i++) {
      set = testSets[i];
      sortFn = function (a, b) {
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      };
    }
  });
});
