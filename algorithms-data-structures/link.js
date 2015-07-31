function Link (val, next) {
  this.val = val;
  if (next === undefined) {
    this.next = null;
  } else {
    this.next = next;
  }
}
