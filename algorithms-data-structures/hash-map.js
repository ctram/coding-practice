// HASHMAP////////////////////////////////////////////////

function HashMap (capacity) {
  // capacity is the size of the underlining array that makes up this.store
  if (capacity === undefined) {
    capacity = 1;
  }
  this.capacity = capacity;
  this.store = new Array(capacity); // array of "buckets"; each bucket may hold a linked list of key/value pairs.
  this.numBucketsFilled = 0; // keep track of number of buckets filled. Once all buckets have been filled, double the number of buckets.
  this.numPairs = 0; // keep track of numbers of pairs within the HashMap; on average, this.numPairs should never exceed this.numBucketsFilled
}

HashMap.prototype.checkForFilledBuckets = function () {
  if (this.numBucketsFilled === this.capacity) {
    this.resize(this.capacity * 2);
  }
};

HashMap.prototype.delete = function (k) {
  var hash = k.hash();
  var bucketNum = k.hash() % this.capacity;
  var ll = this.store[bucketNum];
  if (ll === undefined) {
    return null;
  } else {
    var link = ll.find_by_key(k);
    ll.delete(link.val);
    this.numPairs -= 1;
    if (ll === null) {
      this.numBucketsFilled -= 1;
    }
  }
};

HashMap.prototype.get = function (k) {
  var hash = k.hash();
  var bucketNum = k.hash() % this.capacity;
  var ll = this.store[bucketNum];
  if (ll === undefined) {
    return null;
  } else {
    var link = ll.find_by_key(k);
    return link.val[1];
  }
};

HashMap.prototype.resize = function () {
  var newHashMap = new HashMap(this.capacity * 2);
  this.store.forEach(function (bucket, idx, buckets) {
    var ll = bucket;
    if (ll !== null) {
      while (ll.count() !== 0) {
        var arr = ll.pop();
        var key = arr[0];
        var val = arr[1];
        newHashMap.set(key, val);
      }
    }
  });
  this.capacity = newHashMap.capacity;
  this.numBucketsFilled = newHashMap.numBucketsFilled;
  this.store = newHashMap.store;
};

HashMap.prototype.set = function (k, v) {
  var hash = k.hash(); // k is a string; #hash returns a string of numbers
  var bucketNum = hash % this.capacity;
  var ll = this.store[bucketNum];
  if (ll === undefined) {
    // bucket is empty - set a linked list there.
    ll = new LinkedList();
    ll.push([k, v]); // maybe here, instead of storing the key and value in an array, I should write the Link class to hold a key and value as ivars?
    this.store[bucketNum] = ll;
    this.numPairs += 1;
    this.numBucketsFilled += 1;
    this.checkForFilledBuckets();
  } else {
    // bucket has an existing linked list
    link = ll.find_by_key(k); // NOTE: gave my LinkedList class a method to find a link when the argument is an array...
    if (link === null) {
      // no link exists yet for this key/vale pair; push key/value into the linked list.
      ll.push([k, v]);
      this.numPairs += 1;
    } else {
      // key exists; find link and set new value;
      var link = ll.find_by_key(k);
      link.val[1] = v;
    }
  }
};

// Simple take on hashing a string.
String.prototype.hash = function () {
  var chars = this.split('');
  var result = '';
  chars.forEach(function (char, index, arr) {
    result += char.charCodeAt(0);
  });

  return result;
};
