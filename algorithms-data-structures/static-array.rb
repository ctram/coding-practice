class Cell
  attr_accessor :address, :val

  def initialize address, val
    @address = address
    @val = val
  end
end

class StaticArray
  attr_accessor :capacity, :length

  def initialize
    @start_address = start_address # memory address of the start of the array
    @capacity = capacity # num of cells allocated
    @length = 0 # num of cells used
  end

  def push val
    if length == capacity
      resize
    end

    find the address of the last occupied cell in the array.
      address_last = @start_address + 8 * length
    go to that cell and place val into it.
    increase length by one.
  end

  def pop
    find the address of the last cell in the array
      address_last = @start_address + 8 * length
    save the val in the last occupied cell
    decrease the length by one
    return val
  end

  def unshift val
    allocate a whole new array with capacity n + 1 to make room for the new element
    place val at the start of the new array. copy all other elements into the new array.
  end

  def shift
    save the val of the first cell.
    move the start of the head to the next cell over.
    return val
  end

end
