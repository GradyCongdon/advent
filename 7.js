const d1 = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n');

const data =  d1;

const makeLetter = (l, pre) => {
  if (pre) {
    pre = makeLetter(pre);
  } else {
    pre = []
  }
  return {
    letter,
    pre,
  };
}

const Steps = function() {
  this.add = function (letter, pre) {

    if (!this.down[letter]) {
      this.down[letter] = [pre];
    } else {
      this.down[letter].push(pre);
    }

    if (!this.up[pre]) {
      this.up[pre] = [letter]
    } else {
      this.up[pre].push(letter);
    }
  };
  this.up = {};
  this.down = {};
  this.done = [];
  this.available = [];
  this.walk = function() {
    const char = this.available.pop();
    this.done.push(char);

    let downs = this.down[char] || [];

    // get upstream reqs, filter those to done
    const up = downs.flatMap(d => this.up[d]);
    const next = up.filter(u => this.done.includes(u));
    console.log(up, next, this.done);


    this.available.push(...next);
    this.available.sort();

    if (this.available.length === 0) return true
    else return false;
  };
};
const steps = new Steps();


for (let i = 0; i < data.length; i++) {
  const line = data[i];
  const [_, letter, pre] = /Step (.) must be finished before step (.) can begin\./.exec(line);
  steps.add(letter, pre);
};

steps.available = ['C'];
steps.done = [];
let finished = false;
while(!finished) {
  finished = steps.walk();
}


// walk down
// start,
// push start to done
// get downstream
// check each downstream for upstream
// check upstream list for done
// filter down to all done
