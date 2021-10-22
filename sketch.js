/* globals p5utils */
const canvasW = 512;
const canvasH = 512;

window.setup = () => {
  createCanvas(canvasW, canvasH);

  noFill();

  stroke(0);
  strokeWeight(2);
};

window.draw = () => {
  clear();
  const x = width / 2;
  const y = height / 2;
  const xr = 100;
  const yr = 200;
  const nScl = 0.005;

  p5utils.noisyEllipse(x, y, xr, yr, nScl);

  noLoop();
};
