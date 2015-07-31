describe('Linked List Class', function () {
  var ll;

  beforeEach(function () {
    ll = new LinkedList();
  });

  describe('on initialize', function () {
    it('should have a ivar head of null by default', function () {
      expect(ll.head).toEqual(null);
    });
  });

  describe('#count', function () {
    it('should return zero if there are no links in itself', function () {
      expect(ll.count()).toEqual(0);
    });
    it('should return the correct count of links it contains', function () {
      ll.push(123);
      ll.push(321);
      ll.push(121);
      expect(ll.count()).toEqual(3);
    });
  });

  describe('#delete', function () {
    it('should return null if the list is empty', function () {
      expect(ll.delete()).toEqual(null);
    });
    it('should delete the correct link from the list', function () {
      ll.push(1);
      ll.push(2);
      ll.push(3);
      ll.delete(2);
      expect(ll.pop()).toEqual(3);
      expect(ll.pop()).toEqual(1);
    });
  });

  describe('#deleteAt', function () {
    it('should return null if the list is empty', function () {
      expect(ll.deleteAt(0)).toEqual(null);
    });
    it('should delete the correct nth link', function () {
      ll.push(1);
      ll.push(2);
      ll.push(3);
      ll.deleteAt(1);
      expect(ll.pop()).toEqual(3);
      expect(ll.pop()).toEqual(1);
    });
  });

  describe("when a link's value is a two element array", function () {
    describe('#find_by_key', function () {
      it('should return null if key is not found', function () {
        expect(ll.find_by_key(2)).toEqual(null);
      });
      it('should return the correct value given a key', function () {
        ll.push(['hank', 1]);
        ll.push(['tom', 2]);
        expect(ll.find_by_key('hank').val[1]).toEqual(1);
      });
    });
  });

  describe('#pop', function () {
    it('should return null if the list is empty', function () {
      expect(ll.pop()).toEqual(null);
    });
    it('should return the value of the last link in the list', function () {
      ll.push(1);
      ll.push(2);
      ll.push(3);
      expect(ll.pop()).toEqual(3);
    });
  });

  describe('#push', function () {
    it('should increase the count of the list by one', function () {
      var formerCount = ll.count();
      ll.push(1);
      expect(ll.count()).toEqual(formerCount + 1);
    });
    it('should add the correct value to the end of the list', function () {
      ll.push(1);
      expect(ll.head.val).toEqual(1);
    });
  });
});
