import { noisyLine } from './noiseUtils.js';

export const drawPolygon = (x, y, r, nSides, a = 0) => {
  const da = TWO_PI / nSides;

  beginShape();
  for (let i = 0; i < nSides; i += 1) {
    const ai = a + i * da;
    const xi = x + cos(ai) * r;
    const yi = y + sin(ai) * r;

    vertex(xi, yi);
  }
  endShape(CLOSE);
};

export const drawNoisyPolygon = (x, y, r, nSides, a = 0, nScl = 0.001, nSize = 30) => {
  const da = TWO_PI / nSides;

  for (let i = 0; i < nSides; i += 1) {
    let a1;
    let a2;
    if (i === 0) {
      a1 = a + (nSides - 1) * da;
      a2 = a;
    } else {
      a1 = a + (i - 1) * da;
      a2 = a + i * da;
    }

    const x1 = x + cos(a1) * r;
    const y1 = y + sin(a1) * r;

    const x2 = x + cos(a2) * r;
    const y2 = y + sin(a2) * r;

    noisyLine(x1, y1, x2, y2, nScl, nSize);
  }
};

export const testPointInPolygon = ({ x, y }, polygon) => {
  const {
    x: px, y: py, r, nSides, a,
  } = polygon;
};
