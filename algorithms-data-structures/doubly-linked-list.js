function Link (k, v, previous, next) {
  this.k = k || null;
  this.v = v || null;
  this.previous = previous || null;
  this.next = next || null;
}

Link.prototype.remove = function () {
  var previous = this.previous;
  var next = this.next;
  previous.next = next;
  next.previous = previous
};

// link should have #remove method that removes itself from the LL
// LRU class should have #insert, #get, #evict
function DoublyLinkedList () {
  this.frontSentinel = new Link();
  this.rearSentinel = new Link();
  this.frontSentinel.next = this.rearSentinel;
  this.rearSentinel.previous = this.frontSentinel;
}

DoublyLinkedList.prototype.push = function (k, v) {
  var newLink;
  if (this.frontSentinel.next === this.rearSentinel) {
    newLink = new Link(k, v, this.frontSentinel, this.rearSentinel);
    this.frontSentinel.next = newLink;
    this.rearSentinel.previous = newLink;
  } else {
    var previousTail = this.rearSentinel.previous;
    newLink = new Link(k, v, previousTail, this.rearSentinel);
    previousTail.next = newLink;
    this.rearSentinel.previous = newLink;
  }
}

DoublyLinkedList.prototype.shift = function (k, v) {
  var newLink;
  if (this.frontSentinel.next === this.rearSentinel) {
    newLink = new Link(k, v, this.frontSentinel, this.rearSentinel);
    this.frontSentinel.next = newLink;
    this.rearSentinel.previous = newLink;
  } else {
    var previousHead = this.frontSentinel.next;
    newLink = new Link(k, v, this.frontSentinel, previousHead);
    previousHead.previous = newLink;
    this.frontSentinel.next = newLink;
  }
}
