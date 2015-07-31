describe('Link Class', function () {
  var link;
  var val;


  beforeEach(function () {
    val = 123;
    link = new Link(val);
  });

  it('should hold a value', function () {
    expect(link.val).toEqual(val);
  });

  describe('has a next property', function () {
    it('should have a next of null by default', function () {
      expect(link.next).toEqual(null);

    });

    it('should point to the next link if it has one', function () {
      var nextLink = new Link(321);
      link = new Link(123, nextLink);
      expect(link.next).toEqual(nextLink);
    });
  });
});
