declare type CompleteGraphEdge = { from: number; to: number; weight: number };
declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];
declare type WeightedAdjacencyMatrix = number[][]; // A number means weight

// Breadth-first search on the Graph Matrix
function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);

  seen[source] = true;
  const q: number[] = [source];

  do {
    const curr = q.shift() as number;
    if (curr === needle) {
      break;
    }
    const adjs = graph[curr];
    for (let i = 0; i < graph.length; ++i) {
      if (adjs[i] === 0) {
        continue;
      }

      if (seen[i]) {
        continue;
      }

      seen[i] = true;
      prev[i] = curr;
      q.push(i);
    }

    seen[curr] = true;
  } while (q.length);

  // build it backwards
  let curr = needle;
  const out: number[] = [];

  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  if (out.length) {
    return [source].concat(out.reverse());
  }

  return null;
}

// Depth-first search on the Graph List
function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: number[],
): boolean {
  if (seen[curr]) {
    return false;
  }

  seen[curr] = true;

  //recurse
  //pre
  path.push(curr);
  if (curr === needle) {
    return true;
  }

  //recurse
  const list = graph[curr];
  for (let i = 0; i < list.length; ++i) {
    const edge = list[i];

    if (walk(graph, edge.to, needle, seen, path)) {
      return true;
    }
  }

  //post
  path.pop();

  return false;
}

function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number,
): number[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: number[] = [];

  walk(graph, source, needle, seen, path);

  if (path.length === 0) {
    return null;
  }

  return path;
}

// dijkstra alg implementarion (non optimal)
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let idx = -1;
  let lowestDistance = Infinity;

  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) {
      continue;
    }

    if (lowestDistance > dists[i]) {
      lowestDistance = dists[i];
      idx = i;
    }
  }
  return idx;
}

function dijkstraList(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const seen = new Array(arr.length).fill(false);
  const prev = new Array(arr.length).fill(-1);
  const dists = new Array(arr.length).fill(Infinity);
  dists[source] = 0;

  while (hasUnvisited(seen, dists)) {
    const curr = getLowestUnvisited(seen, dists);
    seen[curr] = true;

    const adjs = arr[curr];
    for (let i = 0; i < adjs.length; ++i) {
      const edge = adjs[i];
      if (seen[edge.to]) {
        continue;
      }
      const dist = dists[curr] + edge.weight;
      if (dist < dists[edge.to]) {
        dists[edge.to] = dist;
        prev[edge.to] = curr;
      }
    }
  }

  const out: number[] = [];
  let curr = sink;

  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  out.push(source);
  return out.reverse();
}
