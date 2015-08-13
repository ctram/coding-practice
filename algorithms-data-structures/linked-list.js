function SinglyLinkedList () {
  this.head = null;
}

SinglyLinkedList.prototype.count = function () {
  var runner = this.head;
  var count = 0;

  while (runner !== null) {
    runner = runner.next;
    count += 1;
  }
  return count;
};

SinglyLinkedList.prototype.delete = function (val) {
  // if linkedlist is empty
  if (this.head === null) {
    return null;
  }

  var previous = null;
  var runner = this.head;
  var next = this.head.next;

  while (runner !== null) {
    if (runner.val === val) {
      if (previous === null) {
        this.head = next;
        return;
      } else {
        previous.next = next;
        return;
      }
    }
    previous = runner; // on first iteration, previous is null
    runner = next; // on first iteration, runner is the head
    next = next.next; // on first iteration, count is zero
  }
  return null; // val not found within the LL
};

SinglyLinkedList.prototype.deleteAt = function (idx) {
  // if linkedlist is empty
  if (this.head === null) {
    return null;
  }

  // linkedlist is more than one long
  var previous = null;
  var runner = null;
  var next = this.head;
  var count = -1; // to ensure that the runner's index matches passed in idx.

  while (true) {
    count += 1;
    previous = runner;
    runner = next;

    if (next !== null) {
      next = next.next; // ensure that next property is not called on a null value;
    }

    // found the index, now check for the different places you are in the within the LL
    if (count === idx) {

      // LL is item of one, just the head
      if (previous === null && next === null) {
        this.head = null;
        return;

      // head is deleted, make head's next the new head.
      } else if (previous === null) {
        this.head = next;

      // idx is the last link in LL; set the previous link's next to null
      } else if (next === null) {
        previous.next = null;
        return;

      // link is between two other linkedlist
      } else {
        previous.next = next;
        return;
      }
    }

    if (runner === null) {
      return null; // end of LL
    }
  }
};

SinglyLinkedList.prototype.find_by_key = function (k) {
  var runner = this.head;

  while (runner !== null) {
    if (runner.val.__proto__ === [].__proto__) {
      if (runner.val[0] === k) {
        return runner;
      }
    }
    runner = runner.next;
  }
  return null;
};

SinglyLinkedList.prototype.pop = function () {
  var val;

  // empty linkedlist
  if (this.head === null) {
    return null;

  // linkedlist of only the head
  } else if (this.head.next === null) {
    val = this.head.val;
    this.head = null;
    return val;

  // linkedlist of more than one item.
  } else {
    var previous = null;
    var runner = this.head;
    while (runner.next !== null) {
      previous = runner;
      runner = runner.next;
    }
    val = runner.val;
    previous.next = null;
    return val;
  }
};

SinglyLinkedList.prototype.push = function (val) {
  if (this.head === null) {
    this.head = new Link(val, null);
    return;
  }

  var runner = this.head;
  while (runner.next !== null) {
    runner = runner.next;
  }
  runner.next = new Link(val, null);
};

SinglyLinkedList.prototype.set = function (val) {
  var link = this.find(val);
  if (link === null) {
    this.push(val);
  } else {
    link.val = val;
  }
};

SinglyLinkedList.prototype.shift = function () {
  if (this.head === null) {
    return null;
  } else {
    var after_head = this.head.next;
    var val = this.head.val;
    this.head = after_head;
    return val;
  }
};

SinglyLinkedList.prototype.unshift = function (val) {
  if (this.head === null) {
    this.head = new Link(val);
  } else {
    var former_head = this.head;
    var new_head = new Link(val, former_head);
    this.head = new_head;
  }
};
