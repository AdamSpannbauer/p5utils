import { maskedNoisyLine, noisyEllipse, noisyLine } from './noiseUtils.js';

window.setup = () => {
  createCanvas(512, 512);
};

window.draw = () => {
  background(200);

  const nScl = 0.005;

  noisyLine(0, 0, width, height, nScl);

  const testFunc = ({ x, y }) => dist(x, y, width * 0.25, height * 0.25) <= 50;
  for (let y = 0; y < height; y += 10) {
    maskedNoisyLine(0, y, width, y, testFunc, nScl);
  }

  noisyEllipse(width * 0.75, height * 0.75, 50, 100, nScl);
};
