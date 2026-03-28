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
