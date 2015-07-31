// [1,4,6,8,7,6,4,3,2]

function heapSort (arr, start, len) {
  // 1 - turn the array into a heap
  // 2 - turn the the heap back into an array, which will now be sorted.
  var heapSize = 0;

  // turn the array into a heap
  // FIXME: infinite loop problem situation
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
  }

  return arr; // returns arr sorted by min or max depending on whether a min or max heap is used.
}

function heapifyDown (arr, len) {
  var parentIdx = arr[0];
  while (parentIdx < len - 1) {
    var childrenIdx = [parentIdx * 2 + 1, parentIdx * 2 + 2];
    for (var i = 0; i < 2; i++) {
      if (arr[childrenIdx[i]] < arr[parentIdx]) {
        swap(arr, childrenIdx[i], parentIdx);
        parentIdx = childrenIdx[i];
        break;
      }
    }
  }
}

function heapifyUp (arr, len) {
  var childIdx = arr[len - 1];
  while (childIdx > 0) {
    var parentIdx = Math.floor((childIdx - 1) / 2);
    if (arr[parentIdx] > arr[childIdx]) {
      swap(arr, parentIdx, childIdx);
      childIdx = parentIdx;
    }
  }
}

function swap (arr, parentIdx, childIdx) {
  var temp = arr[parentIdx];
  arr[parentIdx] = arr[childIdx];
  arr[childIdx] = temp;
}
