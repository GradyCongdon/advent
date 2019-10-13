'use strict'
const fs = require('fs');

const x = (x) => process.stdout.write(x) && x;

class Steps {
  constructor(done) {
    this.done = new Set();
    this.steps = {};
    this.stepper = [];
    this.reqs = new Set();
    this.pre = [];
  }

  push(letter, req) {
    let step = this.steps[letter];
    if (!step) {
      step = new Step(letter);
    }
    step.push(req);
    this.steps[letter] = step;
    this.reqs.add(req);
    this.stepper = Object.values(this.steps);
  }

  findPreDone() {
    this.stepper.forEach(s => this.reqs.delete(s.letter));
    [...this.reqs.entries()]
      .map(([k,v]) => this.push(k, null));
  }

  next() {
    const openLetters = this.stepper.filter(s => {
      const alreadyDone = this.done.has(s.letter);
      const requirementsMet = s.isDone(this.done);
      //console.log(`${s.letter}: done: ${alreadyDone}, reqs: ${requirementsMet} - ${s.reqs}`);
      return requirementsMet && !alreadyDone;
    })
    .map(s => s.letter);
    const nextLetter = openLetters.sort()[0];

    const nextStep = this.steps[nextLetter];
    //console.log('next', nextStep);
    if (!nextLetter || !nextStep) {
      console.log('next: ',nextLetter);
      return {
        letter: nextLetter
      };
    }
    console.log('next: ',nextLetter);
    return nextStep;
  }

  process(next) {
    this.done.add(next.letter);
  }

  isDone() {
    const stepsSize = this.stepper.length;
    if (stepsSize === 0) return false;
    return this.done.size - 1 === stepsSize;
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
    let count = 0;
    let total = 0;
    const isDone = this.reqs.every(r => {
      const d = r === null || done.has(r);
      if (d) count++;
      total++
      return d;
    });
    //x(`${this.letter} done: ${count}/${total}`);
    return isDone
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
  const lineRegEx = /Step (.) must be finished before step (.) can begin./;
  const chunks = input.split('\n').map(l => {
    console.log(l);
    const parsed = lineRegEx.exec(l)
    if (parsed) {
      const [all, first, second] = parsed;
      //console.log(parsed);
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

  steps.findPreDone();


  while (!steps.isDone()) {
    //steps.print();
    const next = steps.next();
    steps.process(next);
  }
  return Array.from(steps.done).join('');
}

console.log(part1(fs.readFileSync('7.input', 'utf8')));
