export const addNoise = ({ x, y }, nScl = 0.001, nSize = 32) => {
  const nx = noise(x * nScl, y * nScl);
  const ny = noise(x * nScl, y * nScl, 42);

  const dx = map(nx, 0, 1, -nSize, nSize);
  const dy = map(ny, 0, 1, -nSize, nSize);

  return { x: x + dx, y: y + dy };
};

const setNPointsLine = (x1, y1, x2, y2) => {
  const d = dist(x1, y1, x2, y2);
  const maxPoints = 512;
  // eslint-disable-next-line no-param-reassign
  let nPoints = map(d, 0, width, 0, maxPoints);

  // eslint-disable-next-line no-param-reassign
  if (nPoints < 2) nPoints = 2;

  return nPoints;
};

export const noisyLine = (
  x1, y1, x2, y2, nScl = 0.001, nSize = 30, nPoints = null,
) => {
  push();
  noFill();

  if (nPoints === null) {
  // eslint-disable-next-line no-param-reassign
    nPoints = setNPointsLine(x1, y1, x2, y2);
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
  x1, y1, x2, y2, testFunc = () => true, nScl = 0.001, nSize = 30, nPoints = null,
) => {
  push();
  noFill();

  if (nPoints === null) {
    // eslint-disable-next-line no-param-reassign
    nPoints = setNPointsLine(x1, y1, x2, y2);
  }

  // eslint-disable-next-line no-param-reassign
  if (nPoints < 2) nPoints = 2;

  let drawing = false;
  let shapeStarted = false;
  for (let i = 0; i < nPoints; i += 1) {
    const xi = map(i, 0, nPoints - 1, x1, x2);
    const yi = map(i, 0, nPoints - 1, y1, y2);

    const pt = addNoise({ x: xi, y: yi }, nScl, nSize);
    const drawPt = testFunc(pt);
    if (drawPt) {
      // Don't start drawing with first point; need 2 pts for a line...
      if (!drawing) {
        drawing = true;
        // eslint-disable-next-line no-continue
        continue;
      }

      if (!shapeStarted) {
        beginShape();
        shapeStarted = true;
      }

      const { x: noisyX, y: noisyY } = pt;
      vertex(noisyX, noisyY);
    } else {
      if (drawing && shapeStarted) endShape();
      drawing = false;
      shapeStarted = false;
    }
  }
  if (drawing && shapeStarted) endShape();

  pop();
};

export const noisyEllipse = (
  x, y, xr, yr, nScl = 0.001, nSize = 30, nPoints = null,
) => {
  if (nPoints === null) {
    const maxR = xr > yr ? xr : yr;
    // eslint-disable-next-line no-param-reassign
    nPoints = map(maxR, 0, width, 0, 512);
  }

  // eslint-disable-next-line no-param-reassign
  if (nPoints < 4) nPoints = 4;

  const da = TWO_PI / nPoints;
  beginShape();
  for (let i = 0; i < nPoints; i += 1) {
    const a = da * i;
    const xi = x + cos(a) * xr;
    const yi = y + sin(a) * yr;

    const { x: noisyX, y: noisyY } = addNoise({ x: xi, y: yi }, nScl, nSize);
    vertex(noisyX, noisyY);
  }
  endShape(CLOSE);
};
