require 'byebug'

def quick_sort arr
  if arr.length <= 1
    return arr
  end

  left = []
  right = []
  pivot = arr.first

  (1..arr.length-1).each do |idx|
    el = arr[idx]
    if el <= pivot
      left.push el
    else
      right.push el
    end
  end

  return quick_sort(left) + [pivot] + quick_sort(right)
end

def quick_sort_in_place arr, start_e, end_e

  if end_e < 0
    end_e = 0
  end
  if start_e > end_e
    start_e = end_e
  end

  # arr of one element, already sorted, so return
  if start_e == end_e
    return
  end

  # sort the arr in place - find index of the pivot - everything to the left of
  # the pivot is less than the pivot, but not necessarily in order - same goes
  # for the right of the pivot, so we need to continue sorting the left and
  # right sides
  pivot_idx = partition arr, start_e, end_e

  quick_sort_in_place arr, 0, pivot_idx-1 # sort the left side of the pivot
  quick_sort_in_place arr, pivot_idx+1, end_e # sort the right side of the pivot

  return arr
end

# sort a given range within an arr, in place, then RETURNS the store_idx, which is the location of the pivot.
def partition arr, start_e, end_e
  pivot = arr[end_e]
  store_idx = start_e

  (start_e..end_e-1).each do |i|
    el = arr[i]
    if el < pivot
      arr[i] = arr[store_idx]
      arr[store_idx] = el
      store_idx += 1
    end
  end

  arr[end_e] = arr[store_idx]
  arr[store_idx] = pivot
  store_idx
end

arr = [3, 2, 1,5, -2]
p quick_sort_in_place arr, 0, arr.length-1
