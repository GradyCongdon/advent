const fs = require('fs');

class Node {
  constructor(nums, depth) {
    if (!nums.length) return;
    this.depth = depth;
    this.nums = nums;
    this.count = 0;

    this.childrenCount = nums.shift();
    this.metaCount = nums.shift();

    this.children = this.getChildren();
    this.meta = this.getMeta();
  }

  getMeta() {
    const meta = [];
    for (let i = 0; i < this.metaCount; i++) {
      const m = this.nums.shift();
      meta.push(m);
      if (this.childrenCount === 0) {
        this.count = this.count + m;
      } else {
        this.count = this.count + this.calc(m);
      }
    }
    return meta;
  }

  getChildren() {
    const children = []
    for (let i = 0; i < this.childrenCount; i++) {
      const next = new Node(this.nums, this.depth + 1);
      children.push(next);
    }
    return children;
  }

  calc(index) {
    let c = 0;
    try {
      if (index > 0) {
        c = this.children[index - 1].count;
      }
    } catch (e) { 
      // skip
    }
    return c || 0;
  }
}

const nums = fs.readFileSync('8.in', 'utf8').split(' ').map(n => parseInt(n, 10));
const root = new Node(nums, 0);
console.log(root.count);


