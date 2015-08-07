function LRUCache () {
  this.linkedList = new DoublyLinkedList();
  this.hsh = new HashMap();
  this.maxLength = 10;
}

LRUCache.prototype.evict = function () {

};

LRUCache.prototype.get = function (k) {
  var link = this.hsh.get(k);
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
  this.linkedList.push(k, v);

  // TODO: need to evict a link if the cache is full
}
