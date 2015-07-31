function heapSort (arr) {
  var heapSize = 0;

  // turn the array into a heap
  while (heapSize < arr.length) {
    heapSize += 1;
    heapifyUp(arr, heapSize);
  }
// debugger
  // change heap back into an array
  // TODO: heapSort() not working for big sets.
  while (heapSize > 0) {
    var min = arr[0];
    arr[0] = arr[heapSize - 1];
    arr[heapSize - 1] = null;
    heapSize -= 1;
    heapifyDown(arr, heapSize);
    arr[heapSize] = min;
  }

  return arr; // returns arr sorted by min or max depending on whether a min or max heap is used.
}

function heapifyDown (arr, len, parentIdx) {
  if (parentIdx === undefined) {
    parentIdx = 0;
  }

  var childrenIdx = [parentIdx * 2 + 1, parentIdx * 2 + 2 ];
  for (var i = 0; i < 2; i++) {
    var parent = arr[parentIdx];
    var childIdx = childrenIdx[i];

    // check that childIdx is within the array-heap; if not, this parent has no more children, no need to check child against parent;
    if (childIdx >= len) {
      continue;
    }

    var child = arr[childIdx];

    // check whether child is higher priority than parent; if so, switch their places.
    if (child < parent) {
      swap(arr, parentIdx, childIdx);
      heapifyDown(arr, len, childIdx);
    }
  }
}

function heapifyUp (arr, len) {
  var childIdx = len - 1;
  while (childIdx > 0) {
    var parentIdx = Math.floor((childIdx - 1) / 2);
    if (arr[parentIdx] > arr[childIdx]) {
      swap(arr, parentIdx, childIdx);
      childIdx = parentIdx;
    } else {
      return;
    }
  }
}

function swap (arr, parentIdx, childIdx) {
  var temp = arr[parentIdx];
  arr[parentIdx] = arr[childIdx];
  arr[childIdx] = temp;
}
