function heapSort (arr) {
  var heapSize = 0;

  // turn the array into a heap
  while (heapSize < arr.length) {
    heapSize += 1;
    heapifyUp(arr, heapSize);
  }

  // change heap back into an array
  while (heapSize > 0) {
    var min = arr[0]; // save first el in the heap to a temp
    arr[0] = arr[heapSize - 1]; // copy the last el in the heap to the front of the heap
    arr[heapSize - 1] = null; // set the last el to null for ease of debugging; otherwise there will briefly be duplicate numbers in the array
    heapSize -= 1;
    heapifyDown(arr, heapSize); // restructure the heap
    arr[heapSize] = min; // place the next number back into the array
  }

  return arr; // returns arr sorted by min or max depending on whether a min or max heap is used.
}

function heapifyDown (arr, len, parentIdx) {
  if (parentIdx === undefined) {
    parentIdx = 0;
  }

  var childOneIdx = parentIdx * 2 + 1;
  var childTwoIdx = childOneIdx + 1;
  var childOne = arr[childOneIdx];
  var childTwo = arr[childTwoIdx];
  if (childOneIdx > len - 1) {
    return;
  } else if (childTwoIdx > len - 1) {
    minChild = childOne;
  } else {
    minChild = Math.min(childOne, childTwo);
  }
  var minChildIdx = minChild === childOne ? childOneIdx : childTwoIdx;

  if (minChild < arr[parentIdx]) {
    swap(arr, minChildIdx, parentIdx);
    heapifyDown(arr, len, minChildIdx);
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
