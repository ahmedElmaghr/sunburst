const constructTree = data => {
  //Step 1 : create a {name: node} map
  var dataMap = [];
  dataMap = data.reduce(function(map, node) {
    var name = node.name;
    map[name] = node;
    return map;
  }, []);
  //Step 2 : create the tree array
  var tree = [];
  //Perpare node children
  data.forEach(function(node) {
    var parent = dataMap[node.parent];
    if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
        // add node to parent's child array
        .push(node);
    } else {
      // parent is null or missing
      var parentFiltered = tree.filter(d => {
        return d.name == node.parent;
      })[0];
      console.log("test101", parentFiltered);
      if (!parentFiltered) {
        var parent = {};
        parent.name = node.parent;
        (parent.children || (parent.children = [])).push(node);
        tree.push(parent);
      } else {
        if (parentFiltered) {
          (parentFiltered.children || (parentFiltered.children = []))
            // add node to parent's child array
            .push(node);
        }
      }
    }
  });
  return treeWrapper(tree);
};

const treeWrapper = tree => {
  return { name: "Media francais", children: tree };
};

export default { constructTree, treeWrapper };
