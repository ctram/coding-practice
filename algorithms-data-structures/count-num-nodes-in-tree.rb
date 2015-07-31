# given a tree, count the number of nodes within the tree.

def count_nodes root
  # assume a node has a children method which returns an array of its children
  count = children.count

  children.each do |child|
    count += count_nodes child
  end

  count
end
