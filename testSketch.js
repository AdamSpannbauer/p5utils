import { maskedNoisyLine, noisyLine } from './noiseUtils.js';

window.setup = () => {
  createCanvas(512, 512);
};

window.draw = () => {
  background(200);

  noisyLine(0, 0, width, height);

  const testFunc = ({ x, y }) => dist(x, y, width / 2, height / 2) < 200;
  for (let y = 0; y < height; y += 10) {
    maskedNoisyLine(0, y, width, y, testFunc);
  }
};
