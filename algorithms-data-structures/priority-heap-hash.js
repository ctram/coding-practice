function PriorityHeapHash () {
  this.hsh = {};
  this.heap = []
}

PriorityHeapHash.prototype._childrenIdx = function (parentIdx) {

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

PriorityHeapHash.prototype._heapifyDown = function (parentIdx) {
  if (parentIdx === undefined) {
    parentIdx = 0;
  }
  var parent = this.heap[parentIdx];
  var childrenIdx = this._childrenIdx(parentIdx);

  // reached a leaf, no children;
  if (childrenIdx.length === 0) {
    return;
  }

  var childOneIdx = childrenIdx[0];
  var childTwoIdx = childrenIdx[1];

  var chosenChildIdx;
  if (childTwoIdx === undefined) {
    chosenChildIdx = childOneIdx;
  } else {
    var childOne = this.heap[childOneIdx];
    var childTwo = this.heap[childTwoIdx];
    childOne.priority < childTwo.priority ? chosenChildIdx = childOneIdx : chosenChildIdx = childTwoIdx;
  }

  var chosenChild = this.heap[chosenChildIdx];
  if (chosenChild.priority < parent.priority) {
    this._switchPlaces(parentIdx, chosenChildIdx);
    this._heapifyDown(chosenChildIdx);
    return;
  }
};

PriorityHeapHash.prototype._heapifyUp = function (idx) {
  if (idx === undefined) {
    idx = this.heap.length - 1;
  }
  while (idx !== 0) {
    var child = this.heap[idx];
    var parentIdx = Math.floor((idx - 1) / 2);
    var parent = this.heap[parentIdx];
    if (parent.priority > child.priority) {
      this._switchPlaces(parentIdx, idx);
    }
    idx = parentIdx;
  }
};

PriorityHeapHash.prototype._extract = function () {
  var node = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heap.heapifyDown();
  return node.value;
};

PriorityHeapHash.prototype.get = function (k) {
  var idx = this.hsh[k];
  this.heap[idx].value;
};

PriorityHeapHash.prototype._insert = function (k, v, p) {
  this.hsh[k] = this.heap.length - 1; // let value be the index of the node in the array-heap
  this.head.push({key: k, value: v, priority: p});
  this.heapifyUp();
};

PriorityHeapHash.prototype.set = function (k, v, p) {
  if (this.hsh[k] === undefined) {
    this._insert(k, v, p);
  } else {
    this._update(k, v, p);
  }
};

PriorityHeapHash.prototype._switchPlaces = function (idx1, idx2) {
  var node1 = this.heap[idx1];
  var node2 = this.heap[idx2];
  this.heap[idx1] = node2;
  this.hsh[node2.key] = idx1;

  this.heap[idx2] = node1;
  this.hsh[node1.key] = idx2;
};

// assumed that key/value already exists for a passed key
PriorityHeapHash.prototype._update = function (k, v, p) {
  var currIdx = this.hsh[k]
  var currNode = this.heap[currIdx];

  if (currNode.priority > p) {
    currNode.priority = p;
    currNode.value = v;
    this.heapifyUp(currIdx);

  // passed priority is less than current priority for the given key - no update should occur.
  } else {
    null
  }
};
