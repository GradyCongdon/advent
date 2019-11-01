
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class CircularLinkedList {

  constructor() {
    this.current = null;
  }

  add(v) {
   const node = new Node(v);
    if (this.current === null) {
      node.next = node;
      node.prev = node;
      this.current = node;
      return;
    }

    this.current.next = node; // make current point next to new node
    node.prev = this.current; // make new node's prev the current
    this.current = node; // make the new node the current node
  }

  delete() {
    const prev = this.current.prev;
    const next = this.current.next;
    prev.next = next;
    next.prev = prev;
    this.current = next;
  }

  get() {
    return this.current.data;
  }

  move(dist) {
    if (dist < 0) {
      this.down(dist);

    } else {
      this.up(dist);
    }
  }

  up(dist) {
    let i = 0;
    while (i < dist) {
      if (this.current.next === null) return null;
      current = this.current.next;
      process.stdout.write(current.data + ' ');
      i++;
    }
    return this.current.data;
  }

  down(dist) {
    let c = 0;
    while (c > dist) {
      this.current = this.current.prev;
      process.stdout.write(this.current.data + ' ');
      c--;
    }
  }
}

const ll = new LinkedList();
ll.add('a');
ll.add('b');
ll.add('c');
ll.add('d');
ll.add('e');
ll.add('f');
ll.add('g');
ll.add('h');

console.log(ll);

ll.get(5);
ll.move(-1);
ll.delete();
ll.move(1);
ll.get();
console.log(ll);

