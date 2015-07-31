function heapSort (arr, start, len) {
  var heapSize = 0;

  // turn the array into a heap
  while (heapSize < arr.length) {
    heapSize += 1;
    heapifyUp(arr, heapSize);
  }

  // change heap back into an array
  while (heapSize > 0) {
    var min = arr[0];
    arr[0] = arr[heapSize - 1];
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
  var parent = arr[parentIdx];
  for (var i = 0; i < 2; i++) {
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
    }
    return;
  }
}

function swap (arr, parentIdx, childIdx) {
  var temp = arr[parentIdx];
  arr[parentIdx] = arr[childIdx];
  arr[childIdx] = temp;
}

var a = [-34, 3, -1, 1, 10, 0, -2, 100, 234, 34, 23423423];

console.log(heapSort(a, 0, a.length));
