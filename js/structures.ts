// ############## START OF LISTS ##############
// Linked List
interface LinkedList<T> {
  get length(): number;
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(index: number): T | undefined;
}

class MyLinkedList implements LinkedList<T> {
  get length(): number {}
  insertAt(item: T, index: number): void {}
  remove(item: T): T | undefined {}
  removeAt(index: number): T | undefined {}
  append(item: T): void {}
  prepend(item: T): void {}
  get(index: number): T | undefined {}
}

//Queue
type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export class Queue<T> {
  public length: number;
  private head?: QNode<T>;
  private tail?: QNode<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node = { value: item } as QNode<T>;
    this.length++;
    if (!this.tail) {
      this.tail = this.head = node;
    }
    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    const head = this.head;
    this.head = this.head.next;

    // free
    head.next = undefined;

    // what about tail?

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

// Stack
type SNode<T> = {
  value: T;
  prev?: SNode<T>;
};

export class Stack<T> {
  public length: number;
  private head?: SNode<T>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const node = { value: item } as SNode<T>;

    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);

    if (this.length === 0) {
      const head = this.head;
      this.head = undefined;
      return head?.value;
    }

    const head = this.head as SNode<T>;
    this.head = head.prev;

    // free

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

// LinkedList - slow to get element by index
// ArrayList - slow for delete/insert operations not in the end of the array

// implement an async request queue in which only 3 request can be out at any one time
// ⬆️I think using LinkedList is a good idea for this kinda situations ⬆️
// cause at scale our deque and and enqueue will be constant all the time

// ArrayList
// TODO

// RingBuffer
// search more about it and try to implement it

// ############## END OF LISTS ##############
