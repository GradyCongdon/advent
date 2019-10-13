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

const Stepper = function() {
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
  this.available = [];
  this.done = [];
  this.steps = {};
};

const Step = function() {
  this.letter = null;
  this.up = [];
  this.down = [];
  this.walk = function() {
    this.available.sort((a,b) => a - b);
    const current = this.available[0];
    const possibleNexts = this.down[current];
    const nexts = possibleNexts.filter(p => {
      const reqs = this.up[p];
      for (let i = 0; i < reqs.length; i++) {
        if (this.done.includes(reqs[i])) continue;
        return false;
      }
      return true;
    });
    return nexts.sort(n => 
  }
  


const stepper = new Stepper();


for (let i = 0; i < data.length; i++) {
  const line = data[i];
  const [_, letter, pre] = /Step (.) must be finished before step (.) can begin\./.exec(line);
  steps.add(letter, pre);
};
console.log(steps);

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
