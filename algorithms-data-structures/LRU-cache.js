function LRUCache () {
  this.linkedList = new DoublyLinkedList();
  this.hsh = new HashMap();
  this.maxLength = 10;
  this.count = 0;
}

LRUCache.prototype.evict = function () {
  this.linkedList.shift();
  this.count--;
};

LRUCache.prototype.get = function (k) {
  var link = this.hsh.get(k);
  // key does not exist in the LRUCache
  if (link === null) {
    return null;

  // return the value and the move the link containing the value to the back of the list (i.e. the most recent link)
  } else {
    var key = link.k;
    var val = link.v;
    link.remove();
    this.linkedList.push(key, val);
    return val;
  }
};

LRUCache.prototype.insert = function (k, v) {
  if (this.hsh.hasKey(k)) {
    hsh[k].remove();
    this.count--;
  }

  // remove the least used link, add new link to the list
  if (this.linkedList.length === this.maxLength) {
    this.evict();
  } else {
    this.count++;
  }
  this.hsh.set(k, this.linkedList.push(k, v));
}
