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
BSTNode.setRecursively = function (node, k, v) {
  // as you a rebuilding your tree, the balance of the current root at each recursive level - rotate as needed before returning the root node
  var newNode;

  if (node === null) {
    newNode = new BSTNode(k, v, null, null);
  }

  if (node.k === k) {
    newNode = new BSTNode(k, v, node.left, node.right);
  }

  if (k < node.k) {
    newNode = new BSTNode(node.k, node.v, BSTNode.setRecursively(node.left, k, v), node.right);
  } else {
    newNode = new BSTNode(node.k, node.v, node.left, BSTNode.setRecursively(node.right, k, v));
  }


};

BSTNode.getBalance = function (node) {
  var leftBal = node.left || 0;
  var rightBal = node.right || 0;

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

BSTNode.prototype.leftRotate = function () {
  // orig root
  var formerRoot = new BSTNode(this.k, this.v, this.left, this.right.left);

  // orig right; now the root
  return new BSTNode(this.right.k, this.right.v, formerRoot, this.right.right);
};

BSTNode.prototype.rightRotate = function () {
  // orig root
  var formerRoot = new BSTNode(this.k, this.v, this.left.right, this.right);

  // orig left; now the root
  return new BSTNode(this.left.k, this.left.v, this.left.left, formerRoot);
};
