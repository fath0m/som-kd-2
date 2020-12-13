import * as math from "mathjs";
import React from "react";
import { getIterations, getNorms, normalize } from "../Helpers/Equations";
import EquationForm from "../components/EquationForm";

class IterativePage extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      iterations: null,
      answers: [],
      finished: false,
    };
  }

  handleSubmit = ({ equation, answers, error }) => {
    const { alpha, beta } = normalize(equation, answers);

    try {
      var { alphaNorm, betaNorm } = getNorms(alpha, beta);
    } catch (error) {
      return alert(error);
    }

    const iterations = getIterations(alphaNorm, betaNorm, error);

    let X = math.matrix(beta);
    const logs = [];

    for (let i = 0; i < iterations; i++) {
      const answer = math.add(
        math.matrix(beta),
        math.multiply(math.matrix(alpha), X)
      );

      logs.push(X._data);

      X = answer;
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
        <h2>Iteracijų metodas</h2>

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

export default IterativePage;
