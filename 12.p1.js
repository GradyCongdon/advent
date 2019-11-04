const count = (acc,v,i) => {
  if (v === '#') {
    acc = acc + i;
  }
  return acc;
};

const s = '.#....##....#####...#######....#.#..##.'.split('').reduce(count, 0);
console.log(s);
return;

const chalk = require('chalk');
const log = true;
const debug = (x) => log && process.stdout.write(x);

const init = '.#####.##.#.##...#.#.###..#.#..#..#.....#..####.#.##.#######..#...##.#..#.#######...#.#.#..##..#.#.#';

const rules = {
  '#..#.': false,
  '##...': true,
  '#....': false,
  '#...#': true,
  '...#.': false,
  '.#..#': true,
  '#.#.#': false,
  '.....': false,
  '##.##': true,
  '##.#.': true,
  '###..': true,
  '#.##.': false,
  '#.#..': true,
  '##..#': true,
  '..#.#': true,
  '..#..': false,
  '.##..': false,
  '...##': true,
  '....#': false,
  '#.###': true,
  '#..##': true,
  '..###': true,
  '####.': true,
  '.#.#.': true,
  '.####': false,
  '###.#': true,
  '#####': true,
  '.#.##': false,
  '.##.#': false,
  '.###.': false,
  '..##.': false,
  '.#...': true,
};

const bold = (s,e, line) => {
  line.forEach((c, i) => {
    if (i == s + 2) {
      debug(chalk.green(c));
    } else if (i >= s && i < e) {
      debug(chalk.red(c));
    } else {
      debug(c);
    }
  });
}


let plants = init.split('');
console.log(plants.join(''));

for (let i = 1; i <= 20; i++) {
  console.log(i);
  const next = [];
  plants = ['.','.'].concat(plants).concat(['.','.']);
  console.log(plants.join('') +'\n');

  for (let p = 2; p < plants.length - 2; p++) {
    const focus = plants.slice(p-2, p+3).join('');
    bold(p-2, p+3, plants);

    const rule = rules[focus];
    const marker = rule ? '#' : '.' ;
    next.push(marker);
    debug(` <-- ${focus}:${marker} \n`);
  }; // p

  plants = next;
}

console.log(plants.reduce(count,0));


