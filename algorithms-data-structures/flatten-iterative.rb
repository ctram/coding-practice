require 'byebug'

# overall time complexity: O(n + k) where n is the number of non-array objects and k is the number of nested array within the original array.
# overall space complexity: O(n + k), same variables;
def flatten_iterative arr
  results = []
  queue = []

  # top level iteratio is O(n)
  arr.each do |el|
    if el.class == Array
      queue.push el
    else
      results.push el
    end

    # this while loop varies in time complexity depending on how deep a nested array goes
    while queue.length > 0
      nested_arr = queue.first
      if nested_arr.first.class == Array
        queue.unshift nested_arr.shift
        next
      elsif nested_arr.length == 0
        queue.shift
      else
        results.push nested_arr.shift
      end
    end
  end
  return results
end

a = [[[[[-1, 0], 0.5]]], 1, [4, [5,6,7], 9, [[[[10]]]]]]

p flatten_iterative a
