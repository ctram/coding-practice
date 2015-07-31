function quickSort (arr, start, len) {
  if (len <= 1) {
    return arr;
  }

  var pivotIdx = partition(arr, start, len);
  quickSort(arr, start, pivotIdx - start); // do not include the element at pivotIdx in the next call to quickSort - it's already in the correct position.
  if (pivotIdx + 1 <= arr.length - 1) {
    quickSort(arr, pivotIdx + 1, len - (pivotIdx - start) - 1);
  }
  return arr;
}

function partition (arr, start, len) {
  var pivot = arr[start + len-1]; // let last element always be pivot
  var runnerIdx = start;
  var temp;
  for (var i = start; i < start + len - 1; i++) {
    if (arr[i] < pivot) {
      temp = arr[i];
      arr[i] = arr[runnerIdx];
      arr[runnerIdx] = temp;
      runnerIdx += 1;
    }
  }

  temp = arr[runnerIdx];
  arr[runnerIdx] = pivot;
  arr[start + len - 1] = temp;
  return runnerIdx;
}

a = [ -1, 3, -1, -14, 4, 5, 6, -2, -3, -4, 24 , -234 , -1123 , 234, 45, 2, 43 , 2, 0, 0 ,23, 304, 03, 0];
 // a = [];
console.log(quickSort(a, 0, a.length));
