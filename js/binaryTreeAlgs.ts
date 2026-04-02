// Depth-first search preserves the shape of the tree during traversal,
// while breadth-first search does not, which can lead to incorrect comparisons of tree structure.
type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
};

//
// Depth First Search
// It's implisitly use a stack
//

// ### PRE ORDER TREE ###
function walkOne(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recurse
  // pre
  path.push(curr.value);

  // recurse
  walkOne(curr.left, path);
  walkOne(curr.right, path);

  // post
  return path;
}
function preOrderSearch(head: BinaryNode<number>): number[] {
  return walkOne(head, []);
}

// ### IN ORDER TREE ###
function walkTwo(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recurse
  // pre

  // recurse
  walkTwo(curr.left, path);
  path.push(curr.value);
  walkTwo(curr.right, path);

  // post
  return path;
}
function inOrderSearch(head: BinaryNode<number>): number[] {
  return walkTwo(head, []);
}

// ### POST ORDER TREE ###
function walkThree(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recurse
  // pre

  // recurse
  walkThree(curr.left, path);
  walkThree(curr.right, path);

  // post
  path.push(curr.value);
  return path;
}
function postOrderSearch(head: BinaryNode<number>): number[] {
  return walkThree(head, []);
}

//
// Breadth First Search
// It's implisitly use a queue
// I'll use JS ArrayList just to simplify things
//
function bfs(head: BinaryNode<number>, needle: number): boolean {
  const q: (BinaryNode<number> | null)[] = [head];

  while (q.length) {
    const curr = q.shift() as BinaryNode<number> | undefined | null;

    if (!curr) {
      continue;
    }

    // search
    if (curr.value === needle) {
      return true;
    }

    q.push(curr.left);
    q.push(curr.right);
  }
  return false;
}

function compare(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null,
): boolean {
  // structural check
  if (a === null && b === null) {
    return true;
  }

  // structural check
  if (a === null || b === null) {
    return false;
  }

  // value check
  if (a.value !== b.value) {
    return false;
  }

  return compare(a.left, b.left) && compare(a.right, b.right);
}

//
// Binary Search Tree (BST)
//
// Algs to balance a tree: AVL rotation, Red-black tree balancing
//
// DFS on BST

function search(curr: BinaryNode<number> | null, needle: number): boolean {
  if (!curr) {
    return false;
  }

  if (curr.value === needle) {
    return true;
  }

  if (curr.value < needle) {
    return search(curr.right, needle);
  }
  return search(curr.left, needle);
}
function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head, needle);
}
