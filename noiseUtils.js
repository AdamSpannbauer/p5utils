export const addNoise = ({ x, y }, nScl = 0.001, nSize = 32) => {
  const nx = noise(x * nScl, y * nScl);
  const ny = noise(x * nScl, y * nScl, 42);

  const dx = map(nx, 0, 1, -nSize, nSize);
  const dy = map(ny, 0, 1, -nSize, nSize);

  return { x: x + dx, y: y + dy };
};

export const noisyLine = (
  x1, y1, x2, y2, nScl = 0.001, nSize = 30, nPoints = null,
) => {
  push();
  noFill();

  if (nPoints === null) {
    const d = dist(x1, y1, x2, y2);
    const maxPoints = 512;
    // eslint-disable-next-line no-param-reassign
    nPoints = map(d, 0, width, 0, maxPoints);
  }

  // eslint-disable-next-line no-param-reassign
  if (nPoints < 2) nPoints = 2;

  beginShape();
  for (let i = 0; i < nPoints; i += 1) {
    const xi = map(i, 0, nPoints - 1, x1, x2);
    const yi = map(i, 0, nPoints - 1, y1, y2);

    const { x: noisyX, y: noisyY } = addNoise({ x: xi, y: yi }, nScl, nSize);
    vertex(noisyX, noisyY);
  }
  endShape();

  pop();
};

export const maskedNoisyLine = (
  x1, y1, x2, y2, nScl = 0.001, nSize = 30, testFunc = () => true, nPoints = null,
) => {

};

export const noisyEllipse = (x, y, xr, yr, nScl = 0.001, nSize = 30) => {

};
