const d1 = `66, 204
55, 226
231, 196
69, 211
69, 335
133, 146
321, 136
220, 229
148, 138
42, 319
304, 181
101, 329
72, 244
242, 117
83, 237
169, 225
311, 212
348, 330
233, 268
99, 301
142, 293
239, 288
200, 216
44, 215
353, 289
54, 73
73, 317
55, 216
305, 134
343, 233
227, 75
139, 285
264, 179
349, 263
48, 116
223, 60
247, 148
320, 232
60, 230
292, 78
247, 342
59, 326
333, 210
186, 291
218, 146
205, 246
124, 204
76, 121
333, 137
117, 68`;

const d0 = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

const log = (o) => {
  return o;
}

const data = d1;
const coords = data
  .split('\n')
  .map(l => {
    return l.split(',')
      .map(i => log(parseInt(i, 10)))
  });

let maxX = -Infinity;
let maxY = -Infinity;
for (let i = 0; i < coords.length; i++) {
  x = coords[i][0];
  y = coords[i][1];
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

const getMin = (x,y) => {
  let min = {
    letter: 'X',
    dist: Infinity,
  };
  for (let j = 0; j < coords.length; j++) {

      let cx = coords[j][0];
      let cy = coords[j][1];
      if (cx === x && cy === y)  {
        min.letter = String.fromCharCode(j + 65);
        //break;
      }
      let dist = Math.abs(x - cx) + Math.abs(y - cy);
      if (dist === min.dist) {

        min.letter = '.';
      }
      if (dist < min.dist) {
        min.dist = dist;
        min.letter = String.fromCharCode(j + 97);
      }
      //console.log('c', cx,cy, dist, String.fromCharCode(j + 65));

   }
   return min.letter;
}

const inRegion = (x,y) => {
  const max = 10000;
  // const max = 32;
  let sum = 0;
  for (let j = 0; j < coords.length; j++) {
      let [cx, cy] = coords[j];
      let dist = Math.abs(x - cx) + Math.abs(y - cy);
      sum = sum + dist;
      // need >= since flipped t/f and sum should be strictly less than
      if (sum >= max) return false;
  }
  return true;

}

let lines = [];

let region = 0;

for (let y = 0; y < maxY; y++) {
  let line = [];
  for (let x = 0; x < maxX; x++) {
    if (inRegion(x,y)) {
      line.push('#');
      region = region + 1;
    } else {
      line.push('.');
    }
  }
  lines.push(line.join(''));
}

console.log(region);
//console.log(lines.join('\n'));
/*
const max = Object.entries(areas)
  .filter(x => typeof x[1] === 'number' && x[1] != Infinity)
  .sort((a,b) => b[1] - a[1]);

console.log(max[0]);
*/





