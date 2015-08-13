function PriorityHashMap () {
  this.hsh = {};
}

PriorityHashMap.prototype._insert = function (k, v, p) {
  this.hsh[k] = [k, v, p];
};

PriorityHashMap.prototype.get = function (k) {
  if (this.hsh.k === undefined) {
    return null;
  } else {
    return this.hsh.k[1]; // return value
  }
};

PriorityHashMap.prototype._extract = function () {
  var bestPriority = null;
  for (var key in this.hsh) {
    if (bestPriority === null) {
      bestPriority = this.hsk[key];
    } else {
      if (bestPriority[2] > this.hsh[key][2]) {
        bestPriority = this.hsh[key];
      }
    }
  }
  delete this.hsh[bestPriority[0]];
  return bestPriority[1];
}

// assumes that key/value already exists in hsh
PriorityHashMap.prototype._update = function (k, v, p) {
  if (this.hsh[2] > p) {
    this.hsh[1] = v;
    this.hsh[2] = p;
    return [k, v, p]
  } else {
    return null; // if attempted update priority is less than what is already set for the key
  }
}

PriorityHashMap.prototype.set = function (k, v, p) {
  if (this.hsh[k] === undefined) {
    this._insert(k, v, p);
  } else {
    this._update(k, v, p);
  }
}
