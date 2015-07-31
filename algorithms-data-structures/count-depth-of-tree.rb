# find the depth of a tree

def count_depth root
  if root.children.count == 0
    return 1
  end

  deeper_levels = []
  root.children.each do |child|
    deeper_levels.push(count_depth(child))
  end

  return deeper_levels.max + 1
end
