require 'byebug'
require_relative '../data-structures/tree'

=begin
you are given an array. the indices represent cities. the values represent the parent city.
          0  1  2  3  4  5  6  7  8  9  10 (city number)
cities = [1, 1, 3, 4, 1, 4, 4, 4, 6, 6, 6] (parent city)

  indices are cities, values are children
  0  1  2  3  4  5  6  7  8  9  10 (parent city)
  [[], [0, 4, 5], [], [2], [3, 5, 6], [], [8, 9, 10], [], [], [], []]

the capital city is the city whose parent is itself

starting from the capital city, determine how many cities are X number of roads away from the city. for the above example:

roads away   |   num of cities
1            |    2
2            |    4
3            |    4
=end
####################################

=begin
  convert the array of cities into a hash
  find the capital city
  we know what the capital city number is; we can iterate through hash looking for cities whose parent is the capital city. those cities are all the same distance away from the previous parent (the capital city in the first iteration) - we now want to find cities whose parents are the cities we just came across - so we store what the new parents should be and iterate across the hash again (we can delete cities we've already seen) - each iteration is one unit distance away from the capital

  at the end, iterate through the hsh matching distance with number of cities and print each pairing
=end

def count_cities_by_distance arr # arr is a representation of a tree
  # 
  hsh_cities_to_parents = Hash.new(0)

  # convert array into a hash
  capital = nil
  O(n)
  arr.each_with_index do |parent, city_num|
    if parent == city_num
      capital = city_num
      next
    end
    hsh_cities_to_parents[city_num] = parent
  end

  parents_of_next_children = [[capital]]
  hsh_distance_num_cities = Hash.new(0)
  distance = 0
  # 
  until parents_of_next_children.empty?
    parents = parents_of_next_children.shift
    distance += 1
    frontier = []
    hsh_cities_to_parents.each do |city_num, parent|
      if parents.include? parent
        hsh_distance_num_cities[distance] += 1
        frontier.push city_num
        hsh_cities_to_parents.delete city_num # delete cities that we've already looked at - free up memory
      end
    end
    break if frontier.empty?
    parents_of_next_children.push frontier
  end

  hsh_distance_num_cities.each do |distance, num_cities|
    puts "#{distance}, #{num_cities}"
  end

end
#
# cities = [1, 4, 1, 2, 4, 1, 2, 6, 6, 6, 8]
# # 1 => 1, 2 => 3, 3 => 2, 4 => 3, 5 => 1
#
# # 0 1 2 3 4 5 6 7
# # 0 3 1 4 0 3 3 4
#
# p count_cities_by_distance(cities)
#
# given a root in a tree, count the number of children at each level away from the root


def count_all_children tree
  root = tree.root
  output = Hash.new(0)
  count_children root, output, 1
  output
end

def count_children node, output, level=0
  return if node.children.empty?
  output[level] += node.children.count

  level += 1
  node.children.each do |child|
    count_children child, output, level
  end
end


tree = Tree.new
tree.add 4
tree.add 1, 4
tree.add 5, 1
tree.add 0, 1
tree.add 2, 1
tree.add 3, 2
tree.add 6, 2
tree.add 9, 6
tree.add 7, 6
tree.add 8, 6
tree.add 10, 8

p count_all_children tree
