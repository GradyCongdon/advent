const { performance } = require('perf_hooks');
const fs = require('fs');

const x = (m) => process.stdout.write(m);
let line = [];
const lx = (m) => line.push(m);
const px = () => {
  console.log(line.join(' '));
  line = [];
};

class Steps {
  constructor(workerCount) {
    this.done = [];
    this.available = [];
    this.working = new Set();
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
      const notWorking = !this.working.has(s.letter) && 'not working';

      const reason = available && notDone && notAlreadyAvailable && notWorking;
      //if (s.letter === 'B') wait(500) && console.log(s); 
      if (reason) {
        this.available.push(s.letter);
      }
    });
    //if (this.available.length) console.log(this.available);
    return this.available.sort();
  }

  complete(letter) {
    if (!letter) return;
    if (this.done.includes(letter)) throw new Error(`cannot complete ${letter} twice`);
    this.done.push(letter);
  }

  tick() {
    //x(`  `);
    //this.workers.forEach((w,i) => x(`${i}${w.letter}  `));
    //x(`\n${this.count} `);
    const avail = this.next();
    const lazy = this.workers.filter(w => !w.working);



    lazy.forEach((w, i) => {
      const next = avail.shift();
      if (next) {
        const nextStep = this.steps[next];
        w.start(nextStep);
        this.working.add(next);
        lx(`+${w.letter}`);
      }
    });

    this.workers.forEach((w, i) => {
      const done = w.tick();
      if (done) {
        lx(`!${w.letter}`);
        this.done.push(w.letter)
        this.working.delete(w.letter);
        w.stop();
      };
      w.print(i);
    });
    //x(`d: ${this.done.length} s:${this.stepper.length} \n`);
    //this.print();
    px();
    this.count++;
  }

  print() {
    //console.log(this);
    console.log(this.done);
    this.stepper.forEach(s => console.log(s)); //|| console.log(`avail: ${s.isAvailable(this.done)} done:${s.isDone()}`));
  }
}

class Worker {
  constructor() {
    this.working = false;
    this.step;
    this.letter = '_';
  }
  start(step) {
    this.step = step;
    this.letter = step.letter;
    this.working = true;
  }
  tick() {
    if (!this.step) return;
    return this.step.tick();
  }
  stop() {
    this.working = false;
    this.step = null;
    this.letter = '_';
  }
  print(i) {
    x(`${i}${this.letter}${(this.step && this.step.count) || 0} `);
  }
}
  


class Step {
  constructor(letter) {
    this.letter = letter;
    this.reqs = [];
    this.count = letters(letter);
    this.done = null;
  }
  add(req) {
    this.reqs.push(req);
  }
  isAvailable(done) {
    const notDone = !this.isDone() && 'not done';
    const noReqs = this.reqs.length === 0 && 'no reqs';
    const allDone = this.reqs.every(r => done.includes(r)) && 'all req done ' + this.reqs.join(',');
    const reason = notDone && ( noReqs || allDone);
    //if (reason) console.log(this.letter, reason);
    this.available = reason;
    return reason
  }
  isDone() {
    if (this.count < 0 ) throw new Error('neg step');
    const done = this.count === 0; 
    this.done = done;
    return done;
  }
  tick() {
    this.count = this.count - 1;
    return this.isDone();
  }
}

function wait(ms) {
  const start = performance.now();
  while(performance.now() - start < ms){};
  return true;
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
  //steps.print();

  while(!steps.isDone()) {
    steps.tick();
  }
  console.log(steps.count);
  return steps.done.join('');
}


const file = fs.readFileSync('7.input', 'utf8');
const order = run(file);
console.log(order);

