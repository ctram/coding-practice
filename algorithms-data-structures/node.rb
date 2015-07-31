require 'byebug'

class Node
  attr_accessor :children, :parent, :val

  def initialize val, parent = nil
    @val = val
    @parent = parent
    @children = []

    unless @parent.nil?
      attach_to_parent
    end
  end

  def attach_to_parent
    #
    @parent.children.push self
  end


end
