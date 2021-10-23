const orientation = (x1, y1, x2, y2, x3, y3) => {
  // http://www.dcs.gla.ac.uk/~pat/52233/slides/Geometry1x1.pdf (page 10)
  // 0: testVal === 0 -> colinear
  // 1: testVal < 0   -> counterclockwise
  // 2: testVal > 0   -> clockwise
  const testVal = (y2 - y1) * (x3 - x2) - (y3 - y2) * (x2 - x1);
  if (testVal === 0) return 0;
  if (testVal < 0) return 1;
  return 2;
};

const isCounterClockwise = (x1, y1, x2, y2, x3, y3) => {
  const o = orientation(x1, y1, x2, y2, x3, y3);
  return o === 1;
};

const slope = (x1, y1, x2, y2, verticalSlope = 0.000001) => {
  if (x1 === x2) return verticalSlope;
  return (y2 - y1) / (x2 - x1);
};

const intercept = (x1, y1, x2, y2) => {
  const m = slope(x1, y1, x2, y2);
  // (y1) = m(x1) + b
  // (y1) - m(x1) = b
  const b = y1 - m * x1;
  return b;
};

const slopeIntercept = (x1, y1, x2, y2) => {
  const m = slope(x1, y1, x2, y2);
  const b = intercept(x1, y1, x2, y2);

  return { m, b };
};

export const linesIntersect = (
  ax1, ay1, ax2, ay2, bx1, by1, bx2, by2,
) => {
  const testABC = isCounterClockwise(ax1, ay1, ax2, ay2, bx1, by1);
  const testBCD = isCounterClockwise(ax2, ay2, bx1, by1, bx2, by2);
  const testABD = isCounterClockwise(ax1, ay1, ax2, ay2, bx2, by2);
  const testACD = isCounterClockwise(ax1, ay1, bx2, by2, bx2, by2);

  if (testACD === testBCD) {
    return false;
  } if (testABC === testABD) {
    return false;
  }
  return true;
};

export const lineIntersection = (
  ax1, ay1, ax2, ay2, bx1, by1, bx2, by2,
) => {
  if (!linesIntersect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)) {
    return null;
  }

  const { m: aSlope, b: aIntercept } = slopeIntercept(ax1, ay1, ax2, ay2);
  const { m: bSlope, b: bIntercept } = slopeIntercept(bx1, by1, bx2, by2);

  if (aSlope === bSlope) {
    // not handling colinear; parallel -> no intersect
    return null;
  }

  // m1*x + b1 = m2*x + b2
  // (m1 - m2)*x = b2 - b1
  // x = (b2 - b1) / (m1 - m2)
  const x = (bIntercept - aIntercept) / (aSlope - bSlope);
  const y = aSlope * x + aIntercept;

  return { x, y };
};
