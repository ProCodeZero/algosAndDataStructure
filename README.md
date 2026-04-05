# Algorithms & Data Structures Reference
> A personal reference repository for algorithms and data structures implementations in JavaScript/TypeScript and Go.
## 📚 Table of Contents
- [Big O Time Complexity](#big-o-time-complexity)
- [Data Structures](#data-structures)
- [Arrays](#arrays)
- [Linked Lists](#linked-lists)
- [Queue](#queue)
- [Stack](#stack)
- [ArrayList](#arraylist)
- [Ring Buffer](#ring-buffer)
- [Trees](#trees)
- [Heap](#heap)
- [Trie (Prefix Tree)](#trie-prefix-tree)
- [Maps (Hash Tables)](#maps-hash-tables)
- [LRU Cache](#lru-cache)
- [Graphs (Representation)](#graphs-representation)
- [Algorithms](#algorithms)
- [Linear Search](#linear-search)
- [Binary Search](#binary-search)
- [Two Crystal Balls Problem](#two-crystal-balls-problem)
- [Bubble Sort](#bubble-sort)
- [QuickSort](#quicksort)
- [Tree Traversals](#tree-traversals)
- [Binary Search Tree Operations](#binary-search-tree-operations)
- [Maze Solver (Recursion)](#maze-solver-recursion)
- [Graph Traversals (BFS & DFS)](#graph-traversals-bfs--dfs)
- [Dijkstra's Shortest Path](#dijkstras-shortest-path)
- [Code Organization](#code-organization)
- [Usage](#usage)
---
## Big O Time Complexity
### What is Big O?
Big O is a method to categorize algorithms based on their **time complexity** or **memory performance** as input grows.
### Three Key Concepts
1. **Growth with respect to input** – Focus on how runtime scales, not absolute time
2. **Constants are dropped** – O(2n) → O(n), O(500) → O(1)
3. **Worst-case scenario** – Analyze the upper bound of performance
### Common Time Complexities
| Notation | Name | Description | Example |
|----------|------|-------------|---------|
| O(1) | Constant | Same time regardless of input | Array index access |
| O(log n) | Logarithmic | Cuts problem in half each step | Binary search |
| O(n) | Linear | Time grows linearly with input | Linear search |
| O(n log n) | Linearithmic | Divide & conquer sorting | Merge/Quick sort |
| O(n²) | Quadratic | Nested loops over input | Bubble sort |
| O(n³) | Cubic | Triple nested loops | Matrix multiplication |
| O(2ⁿ) | Exponential | Doubles with each input | Recursive Fibonacci |
### Why Drop Constants?
Big O focuses on **growth trends**. As `n → ∞`, the difference between `n` and `n²` matters far more than `2n` vs `3n`.
---
## Data Structures
### Arrays
```
Contiguous memory space containing elements of a single type.
Access via: base_address + (index × element_size)
```
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by index | O(1) | Direct memory calculation |
| Search | O(n) | Linear scan required |
| Insert at end | O(1)* | *Amortized if dynamic |
| Insert at start/middle | O(n) | Requires shifting elements |
| Delete | O(n) | Requires shifting elements |
**Key Characteristics:**
- Fixed size at initialization (traditional arrays)
- Dynamic resizing requires reallocation + copy
- Memory interpretation depends on data type view (8-bit vs 16-bit, etc.)
- In older languages: need `type`, `pointer`, and `length`
📄 Implementation: `./js/structures.ts` (ArrayList concepts), `./js/algos.js`
---
### Linked Lists
```
Node-based structure: { value, next?, prev? }
Nodes allocated on heap, non-contiguous memory.
```
#### Singly vs Doubly Linked List
| Feature | Singly | Doubly |
|---------|--------|--------|
| Pointers | `next` only | `next` + `prev` |
| Traversal | Forward only | Bidirectional |
| Memory | Less per node | More per node |
| Delete at node | Need prev reference | Can delete with node reference |
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access head/tail | O(1) | Direct references |
| Prepend/Append | O(1) | Pointer manipulation |
| Insert/Delete at index | O(n) | Requires traversal |
| Search | O(n) | Linear traversal |
**Key Operations:**
```typescript
// Prepend
node.next = head;
head.prev = node;  // doubly only
head = node;
// Insert at index (attach new, then break old)
node.next = curr;
node.prev = curr.prev;
curr.prev = node;
if (node.prev) node.prev.next = node;
// Remove node
if (node.prev) node.prev.next = node.next;
if (node.next) node.next.prev = node.prev;
node.prev = node.next = undefined;
```
📄 Implementation: `./js/structures.ts` (DoublyLinkedList class)
---
### Queue
```
FIFO (First In, First Out) structure.
Insert at tail, remove from head.
```
| Operation | Time Complexity |
|-----------|----------------|
| enqueue | O(1) |
| dequeue | O(1) |
| peek | O(1) |
**Implementation Notes:**
- Typically uses singly linked list
- Maintains `head` and `tail` references
- `next` property is optional to handle empty state
```typescript
enqueue(item):
if (!tail) head = tail = newNode;
else { tail.next = newNode; tail = newNode; }
dequeue():
if (!head) return undefined;
const val = head.value;
head = head.next;
if (!head) tail = undefined;  // queue now empty
return val;
```
📄 Implementation: `./js/structures.ts` (Queue class)
---
### Stack
```
LIFO (Last In, First Out) structure.
Insert and remove from head only.
```
| Operation | Time Complexity |
|-----------|----------------|
| push | O(1) |
| pop | O(1) |
| peek | O(1) |
**Implementation Notes:**
- Uses `prev` pointer (instead of `next`) for intuitive "stack" visualization
- Function call stack is a real-world example
```typescript
push(item):
node.prev = head;
head = node;
pop():
const val = head.value;
head = head.prev;
return val;
```
📄 Implementation: `./js/structures.ts` (Stack class)
---
### ArrayList
```
Dynamic array with capacity management.
Push/pop at end: O(1) amortized.
```
| Operation | Time Complexity |
|-----------|----------------|
| Access by index | O(1) |
| Push/Pop (end) | O(1)* |
| Unshift/Shift (start) | O(n) |
| Insert/Delete (middle) | O(n) |
**Growth Strategy:**
- When capacity exceeded: allocate 2× size, copy elements
- Balances memory usage vs. reallocation frequency
📄 Note: JavaScript arrays are ArrayLists under the hood.
---
### Ring Buffer
```
Fixed-size circular buffer using modulo arithmetic.
All operations O(1) with wraparound indexing.
```
**Key Concept:**
```javascript
// Wrap index using modulo
actualIndex = index % capacity;
// Example: capacity=10, tail=12 → 12%10 = 2
```
**Operations:**
- `push`, `pop`, `shift`, `unshift` all O(1)
- Maintains `head` and `tail` indices that wrap
- Resize: copy elements in order to new buffer, reset head=0
**Use Cases:**
- Log batching with ordered writes
- Object pools for memory reuse
- Stream processing with fixed window
📄 TODO: Implementation pending
---
### Trees
```
Hierarchical structure: { value, children[] }
Binary Tree: max 2 children (left, right)
```
| Term | Definition |
|------|-----------|
| Root | Topmost node |
| Leaf | Node with no children |
| Height | Longest path from root to leaf |
| Depth | Distance from root to node |
#### Tree Traversals (O(n) for all)
| Traversal | Order | Use Case |
|-----------|-------|----------|
| Pre-order | Node → Left → Right | Copy tree, prefix notation |
| In-order | Left → Node → Right | **BST: outputs sorted values** |
| Post-order | Left → Right → Node | Delete tree, postfix notation |
```typescript
// Pre-order template
function walk(curr, path) {
if (!curr) return path;
path.push(curr.value);        // pre
walk(curr.left, path);        // recurse left
walk(curr.right, path);       // recurse right
return path;                  // post
}
```
📄 Implementation: `./js/binaryTreeAlgs.ts`
---
### Heap
```
Complete binary tree stored as an array with no gaps.
Min-Heap Property: parent ≤ children (root is always smallest)
Max-Heap Property: parent ≥ children (root is always largest)
```
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Insert | O(log n) | Push to end, `heapifyUp` |
| Delete/Extract Root | O(log n) | Swap root with last, `heapifyDown` |
| Peek Root | O(1) | Direct array access |
**Array Index Formulas:**
```javascript
// For node at index i:
leftChild(i)  = 2 * i + 1
rightChild(i) = 2 * i + 2
parent(i)     = Math.floor((i - 1) / 2)
```
**Key Characteristics:**
- Fills left-to-right, guaranteeing logarithmic height
- Efficient priority queue foundation
- `heapifyUp`: Compare with parent, swap until property satisfied
- `heapifyDown`: Compare with children, swap with smallest/largest until property satisfied
📄 Implementation: `./js/structures.ts` (MinHeap class)
---
### Trie (Prefix Tree)
```
Tree-like structure for efficient string/prefix retrieval.
Each path from root to node represents a word or prefix.
```
**Node Structure:**
```typescript
Node {
  isWord: boolean;
  children: Array<Node | null>; // 26 slots for 'a'-'z'
}
```
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Insert | O(L) | L = string length |
| Lookup | O(L) | Bounded by max word length, not dictionary size |
| Autocomplete | O(L + K) | K = number of matching completions |
**Key Characteristics:**
- **Child Access**: `index = char.charCodeAt(0) - 'a'.charCodeAt(0)` → O(1) direct indexing
- **Word Marking**: `isWord` boolean flag on terminal node (preferred over `"*"` child)
- **Autocomplete**: DFS pre-order from prefix node; yields alphabetical order naturally
- **Enhancements**: Store frequency/score per node to rank popular suggestions
**Deletion Strategy:**
- Post-order recursion to safely prune branches
- Only remove if node has no children or `isWord` dependencies remain
📄 Use Case: Autocomplete engines, spell checkers, hierarchical caching (e.g., JSON path resolution)
---
### Maps (Hash Tables)
```
Key-Value store backed by an array + hashing function.
Average O(1) for insert, lookup, and delete.
```
| Concept | Definition |
|---------|------------|
| Load Factor | `data.len / storage.capacity`. Ideal ~0.7 to minimize collisions |
| Collision | Two different keys hash to the same bucket |
| Hash Function | Must be deterministic (consistent output for same input) |
**Collision Resolution:**
- Chaining: Linked lists or trees at each bucket
- Open Addressing: Linear/Quadratic probing, double hashing
**Why O(1)?**
Hashing converts keys to indices in constant time. With a good hash distribution and load factor ≤ 0.7, collisions are rare, keeping operations effectively constant.
📄 Note: Native JS `Map` and `{}` use optimized hash tables under the hood.
---
### LRU Cache
```
Least Recently Used cache evicts the oldest accessed item when full.
Combines Doubly Linked List (order tracking) + HashMap (O(1) lookup).
```
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| get(key) | O(1) | Move node to head, return value |
| update(key, value) | O(1) | Insert/update, move to head, evict tail if over capacity |
**Core Components:**
- `lookup`: Map `<Key, Node>` for fast access
- `reverseLookup`: Map `<Node, Key>` for eviction cleanup
- `DoublyLinkedList`: Maintains usage order (`head` = MRU, `tail` = LRU)
**Key Methods:**
- `detach(node)`: Unlink from list, update `head`/`tail` pointers
- `prepend(node)`: Attach to `head`, becomes MRU
- `trimCache()`: Remove `tail` node, delete from both maps when `length > capacity`
📄 Implementation: `./js/structures.ts` (LRU class)
---
### Graphs (Representation)
```
Collection of vertices (nodes) and edges (connections).
Can be directed/undirected, weighted/unweighted, cyclic/acyclic.
```
| Representation | Space | Pros | Cons |
|----------------|-------|------|------|
| Adjacency Matrix | O(V²) | O(1) edge lookup | Memory heavy for sparse graphs |
| Adjacency List | O(V+E) | Memory efficient, fast iteration | Edge lookup O(degree) |
**Graph Types:**
- **Connected**: Every node reachable from every other
- **DAG (Directed Acyclic Graph)**: Directed edges, no cycles
- **Cycle**: Path starting & ending at same node (≥3 nodes)
📄 Implementation: `./js/graphsAlog.ts` (WeightedAdjacencyList/Matrix types)
---
## Algorithms
### Linear Search
```javascript
function linearSearch(haystack, needle) {
for (let i = 0; i < haystack.length; i++) {
if (haystack[i] === needle) return true;
}
return false;
}
```
| Property | Value |
|----------|-------|
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Best Case | O(1) – found at index 0 |
| Worst Case | O(n) – not found or at end |
| Requirement | None (works on unsorted data) |
📄 Implementation: `./js/algos.js`
---
### Binary Search
```javascript
function binarySearch(haystack, needle) {
let lo = 0, hi = haystack.length;
while (lo < hi) {
const mid = Math.floor(lo + (hi - lo) / 2);
if (haystack[mid] === needle) return true;
else if (haystack[mid] > needle) hi = mid;
else lo = mid + 1;
}
return false;
}
```
| Property | Value |
|----------|-------|
| Time Complexity | O(log n) |
| Space Complexity | O(1) iterative, O(log n) recursive |
| Requirement | **Array must be sorted** |
| Key Insight | Halves search space each iteration |
**Midpoint Formula:**
```
mid = lo + (hi - lo) / 2   // Avoids overflow vs (lo+hi)/2
```
📄 Implementation: `./js/algos.js`, `./go/algs/binarySearch.go` (in progress)
---
### Two Crystal Balls Problem
> Find the lowest floor where a crystal ball breaks, with only 2 balls.
**Strategy: Square Root Jump**
```javascript
function firstBreak(breaks) {
const jump = Math.floor(Math.sqrt(breaks.length));
// Phase 1: Jump by √n until break
for (let i = 0; i < breaks.length; i += jump) {
if (breaks[i]) {
// Phase 2: Linear search backwards
for (let j = i - jump; j < i; j++) {
if (breaks[j]) return j;
}
return i;
}
}
return -1;
}
```
| Approach | Time Complexity | Why? |
|----------|----------------|------|
| Linear Search | O(n) | Check every floor |
| Binary Search | O(n) | First ball break → linear search remaining |
| **√n Jump** | **O(√n)** | √n jumps + √n linear search |
**Key Insight:** Jump by a fundamentally different unit (√n) to balance the two phases.
📄 Implementation: `./js/algos.js`
---
### Bubble Sort
```javascript
function bubbleSort(arr) {
for (let i = 0; i < arr.length - 1; i++) {
for (let j = 0; j < arr.length - 1 - i; j++) {
if (arr[j] > arr[j + 1]) {
[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
}
}
}
}
```
| Property | Value |
|----------|-------|
| Time Complexity | O(n²) |
| Space Complexity | O(1) |
| Stable | Yes |
| In-place | Yes |
**Key Property:** After each pass, the largest unsorted element "bubbles" to its final position.
📄 Implementation: `./js/algos.js`
---
### QuickSort
```javascript
function quickSort(arr) {
qs(arr, 0, arr.length - 1);
}
function qs(arr, lo, hi) {
if (lo >= hi) return;
const pivotIdx = partition(arr, lo, hi);
qs(arr, lo, pivotIdx - 1);
qs(arr, pivotIdx + 1, hi);
}
function partition(arr, lo, hi) {
const pivot = arr[hi];
let idx = lo - 1;
for (let i = lo; i < hi; i++) {
if (arr[i] <= pivot) {
idx++;
[arr[i], arr[idx]] = [arr[idx], arr[i]];
}
}
[arr[idx + 1], arr[hi]] = [arr[hi], arr[idx + 1]];
return idx + 1;
}
```
| Property | Value |
|----------|-------|
| Best/Avg Time | O(n log n) |
| Worst Time | O(n²) – already sorted/reverse sorted |
| Space Complexity | O(log n) – recursion stack |
| In-place | Yes |
| Stable | No |
**Divide & Conquer Strategy:**
1. Pick pivot (here: last element)
2. Partition: elements ≤ pivot left, > pivot right
3. Recursively sort subarrays
📄 Implementation: `./js/algos.js`
---
### Tree Traversals
See [Trees section](#trees) for traversal types. All traversals:
- Time: O(n) – visit each node once
- Space: O(h) – recursion stack, where h = height
📄 Implementation: `./js/binaryTreeAlgs.ts`
---
### Binary Search Tree Operations
#### BST Property
```
For any node:
left subtree values ≤ node.value < right subtree values
```
#### Search (DFS)
```typescript
function search(curr, needle) {
if (!curr) return false;
if (curr.value === needle) return true;
if (needle < curr.value) return search(curr.left, needle);
return search(curr.right, needle);
}
```
| Complexity | Balanced | Unbalanced |
|------------|----------|------------|
| Search | O(log n) | O(n) |
#### Insert
- Same traversal as search
- Insert at null position found
- Same complexity as search
#### Delete (3 Cases)
1. **No children**: Remove node
2. **One child**: Bypass node (parent → child)
3. **Two children**: Replace with:
- Largest in left subtree, OR
- Smallest in right subtree
- Replacement node has ≤1 child → easy removal
#### Tree Comparison (DFS)
```typescript
function compare(a, b) {
if (!a && !b) return true;
if (!a || !b) return false;
if (a.value !== b.value) return false;
return compare(a.left, b.left) && compare(a.right, b.right);
}
```
⚠️ **BFS does NOT preserve structure** – use DFS for tree equality checks.
📄 Implementation: `./js/binaryTreeAlgs.ts`
---
### Maze Solver (Recursion)
```typescript
function walk(maze, wall, curr, end, seen, path) {
// Base cases
if (outOfBounds(curr)) return false;
if (maze[curr.y][curr.x] === wall) return false;
if (curr === end) { path.push(end); return true; }
if (seen[curr.y][curr.x]) return false;
// Recurse
seen[curr.y][curr.x] = true;
path.push(curr);
for (const [dx, dy] of directions) {
if (walk(maze, wall, {x: curr.x+dx, y: curr.y+dy}, end, seen, path)) {
return true;
}
}
// Backtrack
path.pop();
return false;
}
```
**Base Cases:**
1. Off the map
2. Hit a wall
3. Reached the end ✓
4. Already visited
**Recursion Pattern:** Pre → Recurse → Post
- Pre: Mark visited, add to path
- Recurse: Try all 4 directions
- Post: Backtrack (pop from path)
| Property | Value |
|----------|-------|
| Time Complexity | O(n) – each cell visited ≤4 times |
| Space Complexity | O(n) – recursion stack + seen array |
📄 Implementation: `./js/recursion.ts`
---
### Graph Traversals (BFS & DFS)
#### Breadth-First Search (BFS)
```typescript
function bfs(graph: number[][], source: number, needle: number): number[] | null {
const seen = new Array(graph.length).fill(false);
const prev = new Array(graph.length).fill(-1);
seen[source] = true;
const q: number[] = [source];
while (q.length) {
const curr = q.shift()!;
if (curr === needle) break;
for (let i = 0; i < graph[curr].length; i++) {
if (graph[curr][i] > 0 && !seen[i]) {
seen[i] = true;
prev[i] = curr;
q.push(i);
}
}
}
// Reconstruct path backwards
let curr = needle;
const out: number[] = [];
while (prev[curr] !== -1) { out.push(curr); curr = prev[curr]; }
return out.length ? [source].concat(out.reverse()) : null;
}
```
| Property | Value |
|----------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) for queue + arrays |
| Best Use Case | Shortest path in unweighted graphs |
**Key Components:**
- `seen[]`: Prevents infinite loops & revisits
- `prev[]`: Tracks path origin for reconstruction
- Stops at first encounter (guarantees shortest path in unweighted)

#### Depth-First Search (DFS)
```typescript
function walk(graph: number[][], curr: number, needle: number, seen: boolean[], path: number[]): boolean {
if (seen[curr]) return false;
seen[curr] = true;
path.push(curr); // Pre
if (curr === needle) return true;
for (const edge of graph[curr]) {
if (walk(graph, edge.to, needle, seen, path)) return true; // Recurse
}
path.pop(); // Post (Backtrack)
return false;
}
```
| Property | Value |
|----------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) recursion stack |
| Best Use Case | Maze solving, cycle detection, topological sort |
**Pattern:** Pre (visit/mark) → Recurse (explore neighbors) → Post (backtrack/clean)
📄 Implementation: `./js/graphsAlog.ts`
---
### Dijkstra's Shortest Path
> Finds shortest path in **weighted graphs with non-negative edges**. Greedy algorithm.
```typescript
function dijkstraList(source: number, sink: number, graph: number[][][]): number[] {
const seen = new Array(graph.length).fill(false);
const prev = new Array(graph.length).fill(-1);
const dists = new Array(graph.length).fill(Infinity);
dists[source] = 0;

while (hasUnvisited(seen, dists)) {
const curr = getLowestUnvisited(seen, dists);
seen[curr] = true;
for (const edge of graph[curr]) {
if (seen[edge.to]) continue;
const newDist = dists[curr] + edge.weight;
if (newDist < dists[edge.to]) {
dists[edge.to] = newDist;
prev[edge.to] = curr;
}
}
}
// Reconstruct
const out: number[] = [];
let curr = sink;
while (prev[curr] !== -1) { out.push(curr); curr = prev[curr]; }
out.push(source);
return out.reverse();
}
```
| Property | Value |
|----------|-------|
| Constraint | No negative edge weights |
| Time (Naive) | O(V² + E) |
| Time (Heap-Optimized) | O(E log V) |
| Space Complexity | O(V) for arrays |
**Core Strategy:**
1. Initialize `dists[source] = 0`, others `Infinity`
2. Repeatedly select unvisited node with **minimum distance**
3. Relax neighbors: `if dist[curr] + weight < dist[neighbor] → update`
4. Track `prev[]` for path reconstruction
**Optimization Note:** Replace linear `getLowestUnvisited()` with a **Min-Heap** to achieve O(E log V). The heap inherently tracks unvisited nodes and eliminates the need for a separate `seen` array.
📄 Implementation: `./js/graphsAlog.ts`
---
## Code Organization
```
./
├── README.md                 # This file
├── go/
│   ├── algs/
│   │   └── binarySearch.go   # Go implementations (WIP)
│   └── main.go
└── js/
├── algos.js              # Search & sort algorithms
├── binaryTreeAlgs.ts     # Tree traversals, BST, comparison
├── recursion.ts          # Maze solver, recursion patterns
├── structures.ts         # LinkedList, Queue, Stack, Heap, LRU
├── graphsAlog.ts         # Graph BFS/DFS, Dijkstra
└── package.json
```
### File Reference
| File | Contents |
|------|----------|
| `js/algos.js` | `linearSearch`, `binarySearch`, `firstBreak`, `bubbleSort`, `quickSort` |
| `js/binaryTreeAlgs.ts` | Pre/In/Post-order, BFS, tree comparison, BST search |
| `js/recursion.ts` | Maze solver with backtracking |
| `js/structures.ts` | `DoublyLinkedList`, `Queue`, `Stack`, `MinHeap`, `LRU` |
| `js/graphsAlog.ts` | Graph BFS/DFS, Dijkstra's algorithm |
| `go/algs/binarySearch.go` | Binary search in Go (in progress) |
---
## Usage
### JavaScript/TypeScript
```bash
cd js
node algos.js                    # Run algorithm demos
# Or with ts-node for TypeScript files:
npx ts-node binaryTreeAlgs.ts
```
### Go (Coming Soon)
```bash
cd go
go run main.go
```
### Testing
Add test cases to respective files or create a `tests/` directory.
---
## 🔄 Quick Reference: Time Complexities
| Data Structure | Access | Search | Insert | Delete |
|---------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Heap | O(1) (root) | O(n) | O(log n) | O(log n) |
| Trie | O(L) | O(L) | O(L) | O(L) |
| Hash Map | N/A | O(1)* | O(1)* | O(1)* |
| BST (balanced) | O(log n) | O(log n) | O(log n) | O(log n) |
| BST (unbalanced) | O(n) | O(n) | O(n) | O(n) |
\* At head/tail with reference; O(n) if traversal required. \*\* Average case, degrades with collisions.
---
## 🧠 Algorithm Complexity Quick Reference
| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Linear Search | O(n) | O(1) | Unsorted data |
| Binary Search | O(log n) | O(1) | Sorted array |
| Bubble Sort | O(n²) | O(1) | Simple, educational |
| QuickSort | O(n log n) avg | O(log n) | In-place, unstable |
| Graph BFS/DFS | O(V + E) | O(V) | Shortest path (BFS) vs exhaustive (DFS) |
| Dijkstra | O(E log V) w/ heap | O(V) | Non-negative weights only |
---
> 💡 **Tip**: When implementing data structures, always handle edge cases: empty structure, single element, head/tail operations, and index bounds.
*Last updated: April 2026*
