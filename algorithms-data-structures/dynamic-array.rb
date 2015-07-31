static array has the methods

class DynamicArray
  attr_accessor :capacity, :length, :store

  def initialize
    @store = StaticArray.new(10) # let the value passed into StaticArray be the capacity of our imaginary StaticArray class.
    @length = 0
    @capacity = 10
  end

  def push val
  end

  def resize
    static_array = StaticArray.new(capacity * 2)
    @store.each do |el|

    end
  end

end
