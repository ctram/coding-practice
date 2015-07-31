function LinkedList () {
  this.head = null;
}

LinkedList.prototype.count = function () {
  var runner = this.head;
  var count = 0;

  while (runner !== null) {
    runner = runner.next;
    count += 1;
  }
  return count;
};

//  Ned:
// In your delete method, you differentiate a bunch of cases, but
// unnecessarily. If previous is null you have to change the head, but
// it's no different if the next is also null. Likewise, if next is null,
// but previous isn't, that isn't special either.
LinkedList.prototype.delete = function (val) {
  if (this.head === null) {
  // if linkedlist is empty
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

LinkedList.prototype.deleteAt = function (idx) {
  if (this.head === null) {
  // if linkedlist is empty
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

    if (count === idx) {
      // found the index, now check for the different places you are in the within the LL
      if (previous === null && next === null) {
        // LL is item of one, just the head
        this.head = null;
        return;
      } else if (previous === null) {
        // head is deleted, make head's next the new head.
        this.head = next;
      } else if (next === null) {
        // idx is the last link in LL; set the previous link's next to null
        previous.next = null;
        return;
      } else {
        // link is between two other linkedlist
        previous.next = next;
        return;
      }
    }
    if (runner === null) {
      return null; // end of LL
    }
  }
};

LinkedList.prototype.find_by_key = function (k) {
  var runner = this.head;

  while (runner !== null) {
    //
    if (runner.val.__proto__ === [].__proto__) {
      if (runner.val[0] === k) {
        return runner;
      }
    }
    runner = runner.next;
  }
  return null;
};

LinkedList.prototype.pop = function () {
  var val;

  if (this.head === null) {
    // empty linkedlist
    return null;
  } else if (this.head.next === null) {
    // linkedlist of only the head
    val = this.head.val;
    this.head = null;
    return val;
  } else {
    // linkedlist of more than one item.
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

LinkedList.prototype.push = function (val) {
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

LinkedList.prototype.set = function (val) {
  var link = this.find(val);
  if (link === null) {
    this.push(val);
  } else {
    link.val = val;
  }
};

// In your unshift method (really shift), you have an unnecessary
// conditional statement.
LinkedList.prototype.shift = function () {
  // if (this.head === null) {
  //   return null;
  // }
  //
  // var after_head = this.head.next;
  // var val = this.head.val;
  //
  // if (after_head === null) {
  //   this.head = null;
  // } else {
  //   this.head = after_head;
  // }
  // return val;

  if (this.head === null) {
    return null;
  } else {
    var after_head = this.head.next;
    var val = this.head.val;
    this.head = after_head;
    return val;
  }

};

LinkedList.prototype.unshift = function (val) {
  if (this.head === null) {
    this.head = new Link(val);
  } else {
    var former_head = this.head;
    var new_head = new Link(val, former_head);
    this.head = new_head;
  }
};
