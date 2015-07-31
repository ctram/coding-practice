describe('HashMap Class', function () {
  var hash;

  beforeEach(function () {
    hash = new HashMap();
  });

  describe('numPairs property', function () {
    it('should be zero for an empty HashMap', function () {
      expect(hash.numPairs).toEqual(0);
    });

    it('should return the number of key/value pairs', function () {
      hash.set('hank', 1);
      hash.set('tom', 2);
      expect(hash.numPairs).toEqual(2);
    });
  });

  describe('#delete', function () {
    it('should return null if there is no matching key', function () {
      expect(hash.delete('hank')).toEqual(null);
    });
    it('should reduce the count of the HashMap by one', function () {
      hash.set('hank', 1);
      hash.set('tom', 2);
      hash.set('bill', 3);
      var formerCount = hash.numPairs;
      hash.delete('bill');
      expect(hash.numPairs).toEqual(formerCount-1);
    });
  });

  describe('#get', function () {
    it('should return a value given a key', function () {
      hash.set('hank', 1);
      expect(hash.get('hank')).toEqual(1);
    });
  });

  describe('#resize', function () {
    it('should double the number of buckets when all buckets have been filled', function () {
      var formerCapacity = hash.capacity;

      hash.set('hank', 'tom');
      expect(hash.capacity).toEqual(2);
      hash.set('bill', 'silly'); // guaranteed to fill all buckets because 'bill' hashes to a different bucket than 'hank'
      expect(hash.capacity).toEqual(4);
    });

    it('should re-hash all key/value pairs and move them into the new store', function () {
      hash.set('hank', 'tom');
      expect(hash.capacity).toEqual(2);
      hash.set('bill', 'silly'); // guaranteed to fill all buckets because 'bill' hashes to a different bucket than 'hank'
      expect(hash.get('hank')).toEqual('tom');
    });
  });

  describe('#set', function () {
    it('should set a key and value', function () {
      var formerCount = hash.numPairs;
      hash.set('hank', 1);
      expect(hash.numPairs).toEqual(formerCount + 1);
    });
  });


});
