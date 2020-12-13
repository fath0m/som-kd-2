import * as math from "mathjs";
import MatrixNorm from "./MatrixNorm";

export const normalize = (alpha, beta) => {
  alpha = alpha.map((a, x) =>
    a.map((b, y) => {
      if (x !== y) {
        return b;
      }

      return (10 - b) * -1;
    })
  );

  alpha = math.divide(alpha, -10);
  beta = math.divide(beta, 10);

  return {
    alpha,
    beta,
  };
};

export const getNorms = (alpha, beta) => {
  const norms = {
    first: {
      alpha: MatrixNorm.first(alpha),
      beta: MatrixNorm.first(beta),
    },
    second: {
      alpha: MatrixNorm.second(alpha),
      beta: MatrixNorm.second(beta),
    },
    third: {
      alpha: MatrixNorm.third(alpha),
      beta: MatrixNorm.third(beta),
    },
  };

  let alphaNorm = null;
  let betaNorm = null;
  let norm = null;

  for (let [key, value] of Object.entries(norms)) {
    if (value.alpha < 1) {
      alphaNorm = value.alpha;
      betaNorm = value.beta;
      norm = key;

      break;
    }
  }

  if (!alphaNorm || !betaNorm) {
    throw "Funkcija nekonverguoja į vieną sprendinį";
  }

  return {
    alphaNorm,
    betaNorm,
    norm,
  };
};

export const getIterations = (alphaNorm, betaNorm, error) => {
  const iterations = Math.ceil(
    math.log(((1 - alphaNorm) * error) / betaNorm) / math.log(alphaNorm) - 1
  );

  return iterations;
};

export const getClose = (alpha, beta, xn) => {
  let close = beta.map((b) => b[0]);

  for (let i = 0; i < xn.length; i++) {
    const currentAlphaRow = alpha[i];

    for (let j = 0; j < xn.length; j++) {
      let multiplicator = xn[j][0];

      if (i > j) {
        multiplicator = close[j];
      }

      let sum = currentAlphaRow[j] * multiplicator;

      close[i] += sum;
    }
  }

  close = close.map((c) => [c]);

  return close;
};
