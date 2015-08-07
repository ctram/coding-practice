// Self-Balancing Immutable Binary Search Tree ////////////////////////////////
// CONSTRUCTOR
// function BSTree (k, v) {
//   if (k === undefined) {
//     this.root = null;
//   } else if (k instanceof BSTNode) {
//     this.root = k;
//   } else {
//     this.root = new BSTNode(k, v, null, null);
//   }
// }
//
// BSTree.prototype.set = function (k, v) {
//   if (this.root === null) {
//     return new BSTree(k, v);
//   } else {
//     return new BSTree(this.root.set(k, v));
//   }
// };
//////////////////////////////////////////////////////////////////////////////
// BSTNode //////////////////////////////////////////////////////////////////
// CONSTRUCTOR
function BSTNode (k, v, left, right) {
  this.k = k;
  this.v = v;
  this.left = left || null;
  this.right = right || null;

  if (this.left === null && this.right === null) {
    this.depth = 1;
  } else if (this.left === null) {
    this.depth = right.depth + 1;
  }  else if (this.right === null) {
    this.depth = left.depth + 1;
  } else {
    this.depth = Math.max(this.left.depth, this.right.depth) + 1;
  }
}

// class function; recursively sets key/value pair; returns root node;
BSTNode.set = function (node, k, v) {
  // as you a rebuilding your tree, the balance of the current root at each recursive level - rotate as needed before returning the root node
  var newNode;

  if (node === null) {
    newNode = new BSTNode(k, v, null, null);
  } else if (node.k === k) {
    newNode = new BSTNode(k, v, node.left, node.right);
  } else if (k < node.k) {
    newNode = new BSTNode(node.k, node.v, BSTNode.set(node.left, k, v), node.right);
  } else {
    newNode = new BSTNode(node.k, node.v, node.left, BSTNode.set(node.right, k, v));
  }

  return newNode.rotate(); // #rotate() returns root node
};


BSTNode.prototype.balance = function () {
  var leftBal;
  var rightBal;

  if (this.left === null) {
    leftBal = 0;
  } else {
    leftBal = this.left.depth;
  }
  if (this.right === null) {
    rightBal = 0;
  } else {
    rightBal = this.right.depth;
  }

  // var leftBal = this.left.balance || 0;  probably won't work, null will not have a balance method.
  // var rightBal = this.right.balance || 0;

  return rightBal - leftBal;
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

BSTNode.prototype.rotate = function () {
  var newParent;

  if (this.balance() < -1) {
    // heavier on the left
    if (this.left.balance() <= 0) {
      // rotate right around the root
      return this.rotateRight();
    } else {
      // first, rotate to the left the heavier left child first. newParent is now has the same right branch but a rotated left branch.
      newParent = new BSTNode(this.k, this.v, this.left.rotateLeft(), this.right);
      return newParent.rotateRight();
    }
  } else if (this.balance() > 1) {
    // heavier on the right side
    if (this.right.balance() >= 0) {
      // rotate left around the root
      return this.rotateLeft();
    } else {
      // first, rotate to the right the heavier right child. newParent then has the same left branch but a right rotated right branch.
      newParent = new BSTNode(this.k, this.v, this.left, this.right.rotateRight());
      return newParent.rotateLeft();
    }
  } else {
    // acceptable balance()
    return this;
  }
};

BSTNode.prototype.rotateLeft = function () {
  // orig root
  var formerRoot = new BSTNode(this.k, this.v, this.left, this.right.left);

  // orig right; now the root
  return new BSTNode(this.right.k, this.right.v, formerRoot, this.right.right);
};

BSTNode.prototype.rotateRight = function () {
  // orig root
  var formerRoot = new BSTNode(this.k, this.v, this.left.right, this.right);

  // orig left; now the root
  return new BSTNode(this.left.k, this.left.v, this.left.left, formerRoot);
};
