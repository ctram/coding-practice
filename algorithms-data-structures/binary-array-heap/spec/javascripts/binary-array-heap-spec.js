describe('PriorityNode', function () {
  var priorityNode;

  beforeEach(function () {
    priorityNode = new PriorityNode('Hugh', 1);
  });

  it('has an item property', function () {
    expect(priorityNode.item).toEqual('Hugh');
  });

  it('has a priority property', function () {
    expect(priorityNode.priority).toEqual(1);
  });
});

describe('BinaryArrayHeap', function () {
   var heap;

  beforeEach(function () {
    heap = new BinaryArrayHeap();
  });

  describe('#extract', function () {
    it('should reduce the number of nodes', function () {
      heap.insert('Hugh', 3);
      heap.insert('Frank', 2);
      heap.insert('Stella', 1);
      var formerCount = heap.count;

      heap.extract();
      expect(heap.count).toEqual(formerCount - 1);
    });

    it('should return the highest priority item', function () {
      heap.insert('Hugh', 3);
      heap.insert('Frank', 2);
      heap.insert('Stella', 1);
      expect(heap.extract()).toEqual('Stella');
      heap.insert('Steve', 5);
      heap.insert('Hugh', 4);
      heap.insert('Frank', 3);
      heap.insert('Stella', 2);
      heap.insert('Billy', 1);
      expect(heap.extract()).toEqual('Billy');
      expect(heap.extract()).toEqual('Stella');
    });
  });

  describe('#insert', function () {
    it('should increase the number of nodes', function () {
      var formerCount = heap.count;
      heap.insert('Hugh', 2);
      expect(heap.count).toEqual(formerCount + 1);
      formerCount = heap.count;
      heap.insert('Stella', 1);
      expect(heap.count).toEqual(formerCount + 1);
    });

    it('should correctly heapifyUp the newly added item if it has higher priority', function () {
      heap.insert('Hugh', 3);
      heap.insert('Frank', 2);
      heap.insert('Stella', 1);
      expect(heap.store[0].item).toEqual('Stella');
      expect(heap.store[1].item).toEqual('Hugh');
      expect(heap.store[2].item).toEqual('Frank');

    });
  });

});
