// immutable binary search tree

function BSTree (k, v) {
  if (k === undefined) {
    this.root = null;
  } else if (k instanceof BSTNode) {
    this.root = k;
  } else {
    this.root = new BSTNode(k, v, null, null);
  }
}

BSTree.prototype.set = function (k, v) {
  if (this.root === null) {
    return new BSTree(k, v);
  } else {
    return new BSTree(this.root.set(k, v));
  }
};

function BSTNode (k, v, left, right) {
  this.k = k;
  this.v = v;

  if (left !== undefined && right !== undefined) {
    this.left = left;
    this.right = right;
  } else if (left === undefined) {
    this.left = null;
    this.right = null;
  } else {
    this.left = left;
    this.right = null;
  }
}

// class function; recursively sets key/value pair
BSTNode.setRecursively = function (node, k, v) {
  if (node === null) {
    return new BSTNode(k, v, null, null);
  }

  if (node.k === k) {
    return new BSTNode(k, v, node.left, node.right);
  }

  if (k < node.k) {
    return new BSTNode(node.k, node.v, BSTNode.setRecursively(node.left, k, v), node.right);
  } else {
    return new BSTNode(node.k, node.v, node.left, BSTNode.setRecursively(node.right, k, v));
  }
};

BSTNode.prototype.get = function (k) {
  if (this.k === k) {
    return this.v;
  }
  if (k < this.k && this.left !== null) {
    return this.left.get(k);
  } else if (k > this.k && this.right !== null) {
    return this.right.get(k);
  } else {
    return null;
  }
};

BSTNode.prototype.hasKey = function (k) {
  if (this.k === k) {
    return true;
  }
  if (k < this.k && this.left !== null) {
    return this.left.hasKey(k);
  } else if (k > this.k && this.right !== null) {
    return this.right.hasKey(k);
  } else {
    return false;
  }
};

// instance method; iterative
BSTNode.prototype.set = function (k, v) {
  if (k === this.k) {
    var newNode = new BSTNode(k, v, this.left, this.right);
    return newNode;
  }

  var nodes = [];
  var runner = this;

  while (true) {
    if (runner === null || runner.k === k) {
      break;
    }

    if (k < runner.k) {
      nodes.push({runner: runner, left: null, right: runner.right});
      runner = runner.left;
    } else {
      nodes.push({runner: runner, left: runner.left, right: null});
      runner = runner.right;
    }
  }

  var child;
  var parent;
  var formerParent;
  while (nodes.length > 0) {

    // occurs on the first iteration of the loop; set k/v pair.
    if (child === undefined) {
      // runner is a leaf with no children
      if (runner === null) {
        child = new BSTNode(k, v, null, null);
      // runner has children
      } else {
        child = new BSTNode(k, v, runner.left, runner.right);
      }
    }
    formerParent = nodes.pop(); // need references to the formerParent's children
    if (k < formerParent.runner.k) {
      parent = new BSTNode(formerParent.runner.k, formerParent.runner.v, child, formerParent.right );
    } else {
      parent = new BSTNode(formerParent.runner.k, formerParent.runner.v, formerParent.left, child);
    }
    child = parent;
  }
  return child;
};
