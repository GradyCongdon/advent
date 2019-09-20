'use strict'
const fs = require('fs');

const exampleInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

const exampleOutput = 'CABDFE';

const x = (x) => console.debug(x) && x;

class Steps {
  constructor(done) {
    this.done = [done];
    this.steps = {};
    this.stepper = {};
  }

  push(letter, req) {
    let step = this.steps[letter];
    if (!step) {
      step = new Step(letter);
    }
    step.push(req);
    this.steps[letter] = step;
    this.stepper = Object.values(this.steps);
  }

  next() {
    const open = this.stepper.filter(s => !this.done.includes(s.letter) && s.isDone(this.done));
    console.log(open);
    const nextLetter = open.map(s => s.letter).sort()[0];
    const nextStep = this.steps[nextLetter];
    if (!nextLetter || !nextStep) {
      this.print();
      console.log(open);
      throw new Error(`no next step letter: ${nextLetter} step: ${nextStep}`);
    }
    return nextStep;
  }

  process(next) {
    this.done.push(next.letter);
  }

  isDone() {
    const stepsSize = this.stepper.length;
    if (stepsSize === 0) return false;
    return this.done.length - 1 === stepsSize;
  }

  print(msg) {
    console.log('---',msg,'---');
    Object.entries(this).forEach(([k,v]) => k.match('steps') ? null : console.log(k,v));
    console.log('isDone():', this.isDone());
    console.log('+++',msg,'+++');
  }
}

class Step {
  constructor(letter) {
    this.letter = letter;
    this.reqs = [];
  }
  isDone(done) {
    return this.reqs.every(r => done.includes(r));
  }
  push(req) {
    this.reqs.push(req);
  }

  print() {
    console.log(this.letter, this.reqs);
  }
}

// Part 1
// ======

const part1 = input => {
  const lineRegEx = /Step (.) must be finished before step (.) can begin/;
  const chunks = input.split('\n').map(l => {
    const parsed = lineRegEx.exec(l)
    if (parsed) {
      const [all, first, second] = parsed;
      return [first, second];
    }
  });

  const steps = new Steps(chunks[0][0]);

  chunks.map(c => {
    if (c) {
      const [f, s] = c;
      steps.push(s,f);
    }
  });

  while (!steps.isDone()) {
    steps.print();
    const next = steps.next();
    steps.process(next);
  }
  return steps.done.join('');
}

console.log(part1(fs.readFileSync('7.input', 'utf8')));

//console.log(part1(exampleInput));

// Part 2
// ======

const part2 = input => {
  return input
}

module.exports = { part1, part2 }
