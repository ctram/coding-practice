describe('quickSort()', function () {
  it('should sort an empty array', function () {
    var arr = [];
    expect(quickSort(arr)).toEqual([]);
  });

  it('should sort an array of one element', function () {
    var arr = [1];
    expect(quickSort(arr).toEqual([1]));
  });
});
