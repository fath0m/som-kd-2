import * as math from "mathjs";
import React from "react";
import {
  getClose,
  getIterations,
  getNorms,
  normalize,
} from "../Helpers/Equations";
import MatrixNorm from "../Helpers/MatrixNorm";
import EquationForm from "../components/EquationForm";

class SeidelPage extends React.Component {
  state = {
    iterations: null,
    answers: [],
    finished: false,
  };

  handleSubmit = ({ equation, answers, error }) => {
    let { alpha, beta } = normalize(equation, answers);

    try {
      var { alphaNorm, norm } = getNorms(alpha, beta);
    } catch (error) {
      return alert(error);
    }

    const x0 = beta;

    // calculate x1
    // const x1 = math.multiply(math.matrix(alpha), math.matrix(x0));

    // alpha = [
    //   [-0.09, -0.04, -0.13, -0.02],
    //   [-0.11, 0.02, 0.15, -0.12],
    //   [-0.02, -0.13, -0.12, -0.09],
    //   [-0.21, 0.31, -0.16, -0.11],
    // ];
    const x1 = getClose(alpha, beta, x0);

    const diff = math.subtract(math.matrix(x1), math.matrix(x0));
    const betaNorm = MatrixNorm[norm](diff._data);

    const iterations = getIterations(alphaNorm, betaNorm, error);

    let xn = x1;
    const logs = [];

    for (let i = 0; i < iterations; i++) {
      logs.push(xn);
      xn = getClose(alpha, beta, xn);
    }

    this.setState({
      finished: true,
      iterations,
      answers: logs,
    });
  };

  render() {
    return (
      <div>
        <h2>Zeidelio metodas</h2>

        <EquationForm onSubmit={this.handleSubmit} />

        {this.state.finished && (
          <>
            <p>Iteracijų kiekis: {this.state.iterations}</p>

            <table border="1">
              <tr>
                <th>Iteracija</th>
                {this.state.answers[0].map((_, index) => (
                  <th>
                    x<sub>{index + 1}</sub>
                  </th>
                ))}
              </tr>

              {this.state.answers.map((answer, index) => (
                <tr>
                  <td>{index + 1}</td>
                  {answer.map((x) => (
                    <td>{x[0]}</td>
                  ))}
                </tr>
              ))}
            </table>
          </>
        )}
      </div>
    );
  }
}

export default SeidelPage;
