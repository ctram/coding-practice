// represents an action to do done.
function Vertex (value, outEdges, inEdges) {
  this.outEdges = outEdges || [];
  this.inEdges = inEdges || [];
  this.value = value;
}

// represents dependency relationship between vertices.
function Edge (value, fromVertex, toVertex) {
  this.value = value;
  this.fromVertex = fromVertex;
  this.toVertex = toVertex;
  fromVertex.outEdges.push(this);
  toVertex.inEdges.push(this);
}

// topoSort takes in an array of vertices - vertices have relationships with other vertices. The vertices are ordered in a hierarchichal nature - e.g. if a vertex represents an action that should be done and certain actions should be completed before others, then topoSort will return the order in which the actions should be done such that no vertex's dependents are done before itsel.
function topoSort (vertices) {
  var hshDependents = {};
  var queue = [];
  for (var i = 0; i < vertices.length; i++) {
    var vertex = vertices[i];
    hshDependents[vertex.value] = vertex.inEdges.length;
    if (hshDependents[vertex.value] === 0) {
      queue.push(vertex);
    }
  }
  var results = [];
  while (queue.length > 0) {
    var current = queue.shift();
    results.push(current);
    for (var i = 0; i < current.outEdges.length; i++) {
      var edge = current.outEdges[i];
      hshDependents[edge.toVertex.value] -= 1;
      if (hshDependents[edge.toVertex.value] === 0) {
        queue.push(edge.toVertex);
      }
    }
  }
}
