function greatestProduct (arr) {
  if (arr.length <== 3) {
    var sum = 1;
    for (num in arr) {
      sum *= num;
    }
    return sum;
  }

  // sort arr

  var negatives = [];
  for (var i < 0; i < 3; i++) {
    if (arr[i] < 0) {
      negatives.push(arr[i])
    }
  }

  var sum;
  if (negatives.length < 2) {
    sum = 1;
    for (var i < 0; i < arr.length; i++) {
      sum *= arr[arr.length -1 - i];
    }
  } else {
    // two negative numbers exist
    var sumWNegative = arr[0] * arr[1] * arr[arr.length-1];
    var sumWPositive = arr[arr.length - 1] * arr[arr.length - 2] * arr[arr.length - 3];
    sum = sumWPositive > sumWNegative ? sumWPositive : sumWNegative;
  }
  return sum;
}

function mergeSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var midIdx = Math.floor(arr.length / 2);
  var left = arr.slice(0, midIdx);
  var right = arr.slice(midIdx, arr.length - midIdx);
  return sort(mergeSort(left), mergeSort(right));
}

function sort (left, right) {
  var results = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      results.push(left.pop());
    } else {
      results.push(right.pop());
    }
  }
  return results.concat(left).concat(right);
}
