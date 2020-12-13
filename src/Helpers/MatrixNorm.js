import { max, norm } from "mathjs";

const MatrixNorm = {
  first: (matrix = [[]]) => {
    const norm = matrix.map((row, c) => {
      return row.reduce((accumulator, currentValue) => {
        return accumulator + Math.abs(currentValue);
      }, 0);
    });

    return max(...norm);
  },
  second: (matrix = [[]]) => {
    return norm(matrix, 1);
  },
  third: (matrix = [[]]) => {
    const norm = matrix.map((row, c) => {
      return Math.sqrt(
        row.reduce((accumulator, currentValue) => {
          return accumulator + currentValue ** 2;
        }, 0)
      );
    });

    return max(...norm);
  },
};

export default MatrixNorm;
