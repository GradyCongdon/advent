const x = (m) => process.stdout.write(m);

class Steps {
  constructor(workerCount) {
    this.done = [];
    this.available = [];
    this.steps = {};
    this.stepper = Object.values(this.steps);
    this.count = 0;
    this.workers = this.buildWorkers(workerCount);
  }

  buildWorkers(workerCount) {
    const w = [];
    for(let i = 1; i <= workerCount; i++) {
      w.push(new Worker());
    }
    return w;
  }

  add(letter, req) {
    let step = this.steps[letter];
    if (!step) {
      step = new Step(letter);
      this.steps[letter] = step;
      this.stepper = Object.values(this.steps);
    } 
    if (req) {
      step.add(req);
      this.add(req);
    }
  }

  isDone() {
    return this.done.length === this.stepper.length;
  }

  next() {
    this.stepper.forEach(s => {
      const available = s.isAvailable(this.done) && 'available';
      const notDone = !this.done.includes(s.letter) && 'not done';
      const notAlreadyAvailable = !this.available.includes(s.letter) && 'not already available';
      if (available && notDone && notAlreadyAvailable) {
        console.log(s.letter, available && notDone && notAlreadyAvailable);
        this.available.push(s.letter);
      }
    });
    if (this.available) console.log(this.available);
    return this.available.sort()[0];
  }

  complete(letter) {
    if (!letter) return;
    if (this.done.includes(letter)) throw new Error(`cannot complete ${letter} twice`);
    this.done.push(letter);
  }

  tick() {
    this.count++;
    x(`${this.count} `);
    this.workers.forEach(w => {
      const next = this.next();
      if (next) {
        const lazy = this.workers.find(w => !w.isWorking);
        const nextStep = this.steps[next];
        lazy.start(nextStep);
      }
      const done = w.tick();
      x(`${w.letter} ${(w.step && w.step.count) || 0} `);
      if (done) this.done.push(w.letter);
      w.stop();
    });
    x(`\n`);
  }

  print() {
    console.log(this);
    this.stepper.forEach(s => console.log(s) || console.log(`avail: ${s.isAvailable(this.done)} done:${s.isDone()}`));
  }
}

class Worker {
  constructor() {
    this.working = false;
    this.step;
    this.letter = '.';
  }
  start(step) {
    this.step = step;
    this.letter = step.letter;
  }
  tick() {
    if (!this.step) return;
    return this.step.tick();
  }
  stop() {
    this.working = false;
    this.step = null;
    this.letter = '.';
  }
}
  


class Step {
  constructor(letter) {
    this.letter = letter;
    this.reqs = [];
    this.count = letters(letter);
  }
  add(req) {
    this.reqs.push(req);
  }
  isAvailable(done) {
    return !this.isDone() && (this.reqs.length === 0 ||  this.reqs.every(r => done.includes(r)));
  }
  isDone() {
    return this.count === 0; 
  }
  tick() {
    this.count = this.count - 1;
    return this.isDone();
  }
}


function letters(letter) {
  const line = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letters = {};
  line.split('').forEach((l,i) => {
    letters[l] = 61 + i;
  });
  return letters[letter];
}

const run = (file) => {
  const regex = /Step (.) must be finished before step (.) can begin./;

  const steps = new Steps(5);
  file.split('\n').forEach(l => {
    if (l) {
      const [all, requirement, letter] = regex.exec(l);
      steps.add(letter, requirement)
    }
  });
  steps.print();

  while(!steps.isDone()) {
    steps.tick();
  }

  return steps.done.join('');
}


const fs = require('fs');
const file = fs.readFileSync('7.example', 'utf8');
const order = run(file);
console.log(order);

