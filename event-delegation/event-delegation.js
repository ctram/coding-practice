// $('ul').on('click', 'li', callback)

function delegateEvent (parent, child, eventType, callback) {
  // set handle onto parent, listening for a eventType
  // if one is triggered, check to see whether the target of the eventType is a child of the parent
  $(parent).on(eventType, function (event) {
    if (checkWhetherChild(parent, event)) {
      var child = event.target;
      callback(child);
    }
  });
}

function checkWhetherChild (parent, event) {
  var target = event.target;
  $children = $(parent).children();
  var node;
  for (var i = 0; i < $children.length; i++) {
    node = $children[i];
    if (node === target) {
      return true;
    }
  }

  return false;
}

function callback (child) {
  $(child).text('Event delegation works!');
}

delegateEvent('ul', 'li', 'click', callback);
