const fs = require("fs");

const orbits = fs
  .readFileSync("./blobs/six.txt", { encoding: "utf8" })
  .split("\n")
  .map(el => el.split(")"));

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.parents = [];
  }
}

// id to node;
const nodeMap = {};
for (let [left, right] of orbits) {
  if (nodeMap[left] == null) {
    nodeMap[left] = new Node(left);
  }

  if (nodeMap[right] == null) {
    nodeMap[right] = new Node(right);
  }

  nodeMap[left].children.push(nodeMap[right]);
  nodeMap[right].parents.push(nodeMap[left]);
}

// const recurseCount = (node, count) => {
//   console.log(node.name, count);
//   if (node.children.length === 0) return count;

//   let rtn = count;
//   for (let child of node.children) {
//     rtn += recurseCount(child, count + 1);
//   }

//   return rtn;
// };

// console.log(recurseCount(nodeMap["COM"], 0));

const findPath = (root, name, path = "") => {
  if (root == null) return false;
  if (root.name === name) {
    console.log(path + "|" + name);
    return true;
  }

  for (let child of root.children) {
    if (findPath(child, name, path + "|" + root.name)) return true;
  }
  return false;
};

findPath(nodeMap["COM"], "SAN");
