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
  const r = 150;
  const nScl = 0.005;
  const nSize = 30;

  p5utils.noisyEllipse(x, y, r, r * 2, nScl, nSize);
  p5utils.drawNoisyPolygon(x, y, r, 10, 0, nScl, nSize);

  // noLoop();
};
