/* This file contains functions to link the Desmos graphs and the outside webpage. */

/* Helper functions */
/**
 * Gets the id of an expression in the given calculator.
 * @param {Desmos.GraphingCalculator | Desmos.Geometry} calculator - The calculator object
 * @param {string} target
 * @returns {number} The of the expression
 */
function getExpressionId(calculator, target) {
  const expressions = calculator.getExpressions();

  for (const expr of expressions) {
    if (expr.latex && expr.latex.includes(target)) {
      return expr.id;
    }
  }
}

/**
 * Gets the latex of an expression by id in the given calculator.
 * @param {Desmos.GraphingCalculator | Desmos.Geometry} calculator - The calculator object.
 * @param {number} id - Id of the expression
 * @returns {string} Latex.
 */
function getLatexById(calculator, id) {
  return calculator.getExpressions().find((expr) => expr.id === id).latex;
}

/**
 * Rounds a number because this is not built into JS even in 2025.
 * @param {number} value - Number to round.
 * @param {number} precision - Number of decimal places.
 * @returns {number} Rounded number.
 */
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

/* Exported functions */

export function changeVectorMotivation(calculator, url, value) {
  let api = getExpressionId(calculator, "A_{pi}=");
  calculator.setExpression({
    id: api,
    latex: `A_{pi}=${value}`,
  });
}

export function animateProjection(calculator, url) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  let sliderId = getExpressionId(calculator, ["A_{pi}="]);

  calculator.setExpression({ id: sliderId, latex: `A_{pi}=0` });
  let animationLength = 2000; // milliseconds
  let updateCount = 50;
  // looks better than linear. 0<=x<=1, 0<=y<=1
  const interpolator = (x) => Math.atan(8 * x - 4) / (2 * Math.atan(4)) + 0.5;
  async function loop(calculator) {
    await timer(100);
    for (let i = 1; i <= updateCount; i++) {
      calculator.setExpression({
        id: sliderId,
        latex: `A_{pi}=${interpolator(i / updateCount)}`,
      });
      await timer(animationLength / updateCount);
    }
  }
  loop(calculator);
}

export function clearProjectionAnimation(calculator, url) {
  let sliderId = getExpressionId(calculator, ["A_{pi}"]);
  calculator.setExpression({ id: sliderId, latex: `A_{pi}=${0}` });
}

export function animateMatrix(calculator, url) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  let sliderId = getExpressionId(calculator, ["A_{pi}"]);
  let animationLength = 1500; // milliseconds
  let updateCount = 100;
  // 0 <= x <= 2, 0 <= y <= 2
  // interpolation: desmos.com/calculator/fplxw64heb
  function interpolator(x) {
    if (x >= 1.25) {
      return (4 * x) / 3 - 6 / 9;
    }
    if (x >= 1) {
      return 1;
    }
    return x;
  }
  async function loop(calculator) {
    await timer(100);
    for (let i = 1; i <= updateCount; i++) {
      calculator.setExpression({
        id: sliderId,
        latex: `A_{pi}=${interpolator((2 * i) / updateCount)}`,
      });
      await timer(animationLength / updateCount);
    }
  }
  loop(calculator);
}

export function observeScaledUnitProjectionText(calculator, url) {
  const uId = getExpressionId(calculator, "u=");
  const vId = getExpressionId(calculator, "v=");
  const left = String.raw`u=\left(`.length;
  const right = -1 * String.raw`\right)`.length;

  const dotSpan = document.getElementById("u-dot-v");
  const uMagnitudeSpan = document.getElementById("mag-u");
  const unitSpan = document.getElementById("uhat-dot-v");

  setInterval(() => {
    let [u, v] = [uId, vId].map((id) => {
      let latex = getLatexById(calculator, id);
      let comma = latex.indexOf(",");
      return {
        x: Number(latex.slice(left, comma)),
        y: Number(latex.slice(comma + 1, right)),
      };
    });

    let uMag = Math.sqrt(u.x ** 2 + u.y ** 2);

    dotSpan.innerHTML = round(u.x * v.x + u.y * v.y, 2);
    uMagnitudeSpan.innerHTML = round(uMag, 2);
    unitSpan.innerHTML = round((v.x * u.x) / uMag + (v.y * u.y) / uMag, 2);
  }, 100);
}
