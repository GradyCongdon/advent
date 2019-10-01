const fs = require('fs');

const debug = false
const x = (n,m) => debug && console.log(n, m);
const names = ['A','B','C','D','E','F'];

let total = 0;

class Node {
  constructor(nums, depth = 0) {
    if (!nums.length) return;
    this.name = names.shift();
    this.nums = nums;
    this.depth = depth;
    this.childrenCount = nums.shift();
    this.metaCount = nums.shift();
    this.children = this.getChildren();
    this.meta = this.getMeta();
    this.print();
  }
  getMeta() {
    x(this.name, 'meta', this.metaCount);
    const meta = [];
    for (let i = 0; i < this.metaCount; i++) {
      const m = this.nums.shift();
      meta.push(m);
      total = total + m;
    }
    x(this.name, 'meta!', meta);
    return meta;
  }
  getChildren() {
    x(this.name, 'children');
    const children = []
    for (let i = 0; i < this.childrenCount; i++) {
      const next = new Node(this.nums, this.depth + 1);
      children.push(next);
    }
    return children;
  }
  print() {
    const tabs = Array.from({length: this.depth}).join('  ');
    console.log(`${tabs}${this.name} - ${this.meta.join(', ')}`);
  }
}


const nums = fs.readFileSync('8.in', 'utf8').split(' ').map(n => parseInt(n, 10));
const root = new Node(nums, 0);
console.log(total);


