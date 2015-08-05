require 'byebug'
# algorithm: for a given array of elements, pick the first element which is called the pivot. compare all following elements to this pivot. elements go to two different buckets depending on whether the elements are less than or greater than the pivot. now run these two new arrays through the algorithm again. return the return of the algorith with the lesser passed through, followed by the pivot, followed by the greater passed through.

def quick_sort arr
  if arr.length <= 1
    return arr
  end

  pivot = arr.first

  lesser, greater = [], []

  (1..arr.length-1).each do |idx|
    el = arr[idx]
    if el <= pivot
      lesser.push el
    else
      greater.push el
    end
  end

  return quick_sort(lesser) + [pivot] + quick_sort(greater)
end

# time: iterator to compare elements is O(n)? how does recursion affect the time complexity?
# space: O(n) or O(nlogn)

# ask ned about how to come up with time and space complexities for both versions o quick sort, in place and out of place.

def quick_sort_in_place! arr, s_idx = 0, e_idx = arr.length-1

  e_idx = 0 if e_idx < 0
  if e_idx - s_idx < 1
    return
  end

  pivot_idx = partition_and_idx! arr, s_idx, e_idx
  quick_sort_in_place! arr, s_idx, pivot_idx - 1
  quick_sort_in_place! arr, pivot_idx + 1, e_idx
  return arr
end

def partition_and_idx! arr, s_idx, e_idx
  pivot = arr[e_idx]
  store_idx = s_idx
  (s_idx..e_idx-1).each do |idx|
    el = arr[idx]
    if el < pivot
      store = arr[store_idx]
      arr[store_idx] = arr[idx]
      arr[idx] = store
      store_idx += 1
    end
  end
  store = arr[store_idx]
  arr[store_idx] = pivot
  arr[e_idx] = store
  store_idx
end

p quick_sort_in_place! [5,4,8,4,5,7,4,2,2,3,55,66,77,33,44,22,33, -234,-345,-345345,-34535]
