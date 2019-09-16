'use strict'

const exampleInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

const exampleOutput = 'CABDFE';


class Steps {
  constructor(done) {
    this.done = [done];
    this.steps = {};
  }

  push(letter, req) {
    let step = this.steps[letter];
    if (!step) {
      step = new Step(step);
    }
    step.push(req);
    this.steps[letter] = step;
  }

  next() {
    const open = this.steps.filter(s => s.isDone(this.done));
    const nextLetter = this.open.map(s => s.letter).sort((a,b) => a - b)[0];
    return this.steps[nextLetter];
  }

  process(next) {
    this.done.push(next.getLetter());
  }

  isDone() {
    return this.done.length === Object.keys(this.steps).length;
  }
}

class Step {
  constructor(letter) {
    this.letter = letter;
  }
  isDone(done) {
    return this.reqs.every(r => done.includes(r));
  }
  push(req) {
    this.reqs.push(reqs);
  }
}

const example = input => {
  const lines = exampleInput
    .split("\n");

  const lineRegEx = /Step (.) must be finished before step (.) can begin/;
  const chunks = lines.map(l => {
    const [all, first, second] = lineRegEx.exec(l)
    return [first, second];
  });

  const steps = new Steps(chunks[0][0]);

  chunks.map(c => {
    const [f, s] = c;
    steps.push(f,s);
  });

  console.log(steps);
  while (!steps.isDone) {
    const next = steps.next();
    steps.process(next);
  }
};

const checkExample = () => {
  const actual = example(exampleInput);
  if (actual === exampleOutput) {
    console.log('nice');
  } else {
    console.error(`got ${actual} expected ${exampleOutput}`);
  }
}

checkExample();


// Part 1
// ======

const part1 = input => {
  return input
}

// Part 2
// ======

const part2 = input => {
  return input
}

module.exports = { part1, part2 }
