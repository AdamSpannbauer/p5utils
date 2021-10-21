import { noisyLine } from './noiseUtils.js';

window.setup = () => {
  createCanvas(512, 512);
};

window.draw = () => {
  background(200);

  noisyLine(0, 0, width, height);
};
