// ############## START OF LISTS ##############
// Linked List
type LNode<T> = {
  value: T;
  prev?: LNode<T>;
  next?: LNode<T>;
};

interface LinkedList<T> {
  get length(): number;
  insertAt(item: T, idx: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(idx: number): T | undefined;
}

class DoublyLinkedList implements LinkedList<T> {
  public length: number;
  private head?: LNode<T>;
  private tail?: LNode<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  private debug() {
    let curr = this.head;
    let out = "";
    for (let i = 0; curr && i < this.length; ++i) {
      out += `${i} => ${curr.value} `;
      curr = curr.next;
    }
    console.log(out);
  }

  prepend(item: T): void {
    const node = { value: item } as LNode<T>;

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("you can't do it");
    }

    if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    let curr = this.getAt(idx) as LNode<T>;
    const node = { value: item } as LNode<T>;

    node.next = curr;
    node.prev = curr.prev;
    curr.prev = node;

    if (node.prev) {
      node.prev.next = curr;
    }
  }

  append(item: T): void {
    this.length++;
    const node = { value: item } as LNode<T>;

    if (!this.tail) {
      this.head = this.tail = node;
      this.debug();
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.debug();
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }
    if (!curr) {
      return undefined;
    }
    return this.removeNode(curr);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx);

    if (!node) {
      return undefined;
    }
    return this.removeNode(node);
  }

  private removeNode(node: LNode<T>): T | undefined {
    this.length--;
    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    node.prev = node.next = undefined;
    return node.value;
  }

  private getAt(idx: number): LNode<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr;
  }
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
