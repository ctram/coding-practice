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
  this.count = 0;
  // this.tailIdx = 0;
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

BinaryArrayHeap.prototype.childrenIdx = function (parentIdx) {
// childrenIdx = parentIdx * 2 + 1 (first child)
  var firstChildIdx = parentIdx * 2 + 1;
  if (firstChildIdx + 1 > this.store.length - 1) {
    // there is only one child
    return [firstChildIdx];
  } else {
    // there are two children
    return [firstChildIdx, firstChildIdx + 1];
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
  this.count -= 1;
  this.heapifyDown();
  return root.item;
};

BinaryArrayHeap.prototype.heapifyDown = function (parentIdx) {
  if (parentIdx === undefined) {
    parentIdx = 0;
  }
  var parent = this.store[parentIdx];
  if (BinaryArrayHeap.hasChildren(this.store, parentIdx)) {
    var childrenIdx = this.childrenIdx(parentIdx);
    for (var i = 0; i < childrenIdx.length; i++) {
      var child = this.store[childrenIdx[i]];
      if (child.priority < parent.priority) {
        this.switchPlaces(parentIdx, childrenIdx[i]);
        this.heapifyDown(childrenIdx[i]);
        return;
      }
    }
 }
};

BinaryArrayHeap.prototype.heapifyUp = function (idx) {
  // FIXME: infinite loop here
  if (idx === undefined) {
    idx = this.store.length - 1;
  }
  while (idx !== 0) {
    var child = this.store[idx];
    var parentIdx = Math.floor((idx - 1) / 2);
    var parent = this.store[parentIdx];
    if (parent.priority > child.priority) {
      // switch places
      this.switchPlaces(parentIdx, idx);
    }
    idx = parentIdx;
  }
};

BinaryArrayHeap.prototype.insert = function (item, priority) {
  // insert into the tail position of the array-heap
  // TODO: insert a priorityNode instead of an array.
  var priorityNode = new PriorityNode(item, priority);
  this.store.push(priorityNode);
  // this.tailIdx += 1;
  this.heapifyUp();
  this.count += 1;
};

BinaryArrayHeap.prototype.switchPlaces = function (idx1, idx2) {
  var node1 = this.store[idx1];
  var node2 = this.store[idx2];
  this.store[idx1] = node2;
  this.store[idx2] = node1;
};
