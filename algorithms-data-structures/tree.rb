require 'byebug'
require_relative 'node'

class Tree
  attr_accessor :root

  def initialize
    @root = nil
  end

  def add val, parent=nil
    if parent.nil?
      @root = Node.new val
      return
    end
    parent = find parent
    new_node = Node.new val, parent
  end

  def find val
    if @root.nil?
      return nil
    end

    nodes = [@root]

    until nodes.empty?
      node = nodes.shift
      if node.val == val
        return node
      end
      unless node.children.empty?
        nodes += node.children
      end
    end
    return nil
  end

  def print_all_node_values
    # starting from the root
    #
    if @root.nil?
      print nil
      return
    end

    nodes = [@root]

    until nodes.empty?

      node = nodes.shift
      puts node.val
      unless node.children.empty?
        nodes += node.children
      end
    end
    print nil
  end

end

tree = Tree.new
tree.add 3
tree.add 4, 3
tree.add 5, 4
tree.add 6, 4
tree.add 7, 4
tree.add 11, 7
tree.add 12, 11
tree.add 15, 11

tree.print_all_node_values
p tree
