/*
  Methods:
    insert
    extract
    heap down
    heap up
    childIdx
    parentIdx

  Properties:
    store
*/

function PriorityNode (item, priority) {
  this.item = item;
  this.priority = priority;
}

function BinaryArrayHeap () {
  this.store = [];
}

// Class method
BinaryArrayHeap.hasChildren = function (store, parentIdx) {
  var firstChildIdx = parentIdx * 2 + 1;
  if (firstChildIdx > store.length - 1) {
    return false;
  } else {
    return true;
  }
};

BinaryArrayHeap.prototype._childrenIdx = function (parentIdx) {

  // NOTE: childrenIdx = parentIdx * 2 + 1 (for the first child)
  var firstChildIdx = parentIdx * 2 + 1;

  // there is only one child
  if (firstChildIdx + 1 > this.store.length - 1) {
    return [firstChildIdx];

  // there are two children
  } else if (firstChildIdx + 1 <= this.store.length - 1) {
    return [firstChildIdx, firstChildIdx + 1];

  // there are no children; parent is a leaf
  } else {
    return [];
  }
};

BinaryArrayHeap.prototype.extract = function () {

  if (this.store.length === 0) {
    return null;
  }
  var root = this.store[0];
  var tail = this.store[this.store.length-1];
  this.store[0] = tail;
  this.store.pop();
  this._heapifyDown();
  return root.item;
};

BinaryArrayHeap.prototype._heapifyDown = function (parentIdx) {
  if (parentIdx === undefined) {
    parentIdx = 0;
  }
  var parent = this.store[parentIdx];
  if (BinaryArrayHeap.hasChildren(this.store, parentIdx)) {
    var childrenIdx = this._childrenIdx(parentIdx);
    var childOneIdx = childrenIdx[0];
    var childTwoIdx = childrenIdx[1];

    var chosenChildIdx;
    if (childTwoIdx === undefined) {
      chosenChildIdx = childOneIdx;
    } else {
      var childOne = this.store[childOneIdx];
      var childTwo = this.store[childTwoIdx];
      childOne.priority < childTwo.priority ? chosenChildIdx = childOneIdx : chosenChildIdx = childTwoIdx;
    }

    var chosenChild = this.store[chosenChildIdx];
    if (chosenChild.priority < parent.priority) {
      this._switchPlaces(parentIdx, chosenChildIdx);
      this._heapifyDown(chosenChildIdx);
      return;
    }
  }
};

BinaryArrayHeap.prototype._heapifyUp = function (idx) {
  if (idx === undefined) {
    idx = this.store.length - 1;
  }
  while (idx !== 0) {
    var child = this.store[idx];
    var parentIdx = Math.floor((idx - 1) / 2);
    var parent = this.store[parentIdx];
    if (parent.priority > child.priority) {
      this._switchPlaces(parentIdx, idx);
    }
    idx = parentIdx;
  }
};

BinaryArrayHeap.prototype.insert = function (item, priority) {
  var priorityNode = new PriorityNode(item, priority);

  // insert into the tail position of the array-heap
  this.store.push(priorityNode);
  this._heapifyUp();
};

BinaryArrayHeap.prototype._switchPlaces = function (idx1, idx2) {
  var node1 = this.store[idx1];
  var node2 = this.store[idx2];
  this.store[idx1] = node2;
  this.store[idx2] = node1;
};
