import { lineIntersection, linesIntersect } from './lineSegmentUtils.js';
import { maskedNoisyLine, noisyEllipse, noisyLine } from './noiseUtils.js';

window.setup = () => {
  createCanvas(512, 512);
};

window.draw = () => {
  background(200);

  // const nScl = 0.005;

  // noisyLine(0, 0, width, height, nScl);

  // const testFunc = ({ x, y }) => dist(x, y, width * 0.25, height * 0.25) <= 50;
  // for (let y = 0; y < height; y += 10) {
  //   maskedNoisyLine(0, y, width, y, testFunc, nScl);
  // }

  // noisyEllipse(width * 0.75, height * 0.75, 50, 100, nScl);

  const x1 = 0;
  const y1 = 0;
  const x2 = width;
  const y2 = height;
  const x3 = 0;
  const y3 = height;

  const x4 = mouseX;
  const y4 = mouseY;

  stroke(0);
  const intersect = linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
  if (intersect) stroke(255, 0, 0);

  const intersection = lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
  if (intersection !== null) {
    text(
      `${[intersection.x.toFixed(2), intersection.y.toFixed(2)]}`,
      intersection.x,
      intersection.y,
    );
  }

  line(x1, y1, x2, y2);
  line(x3, y3, x4, y4);
};
