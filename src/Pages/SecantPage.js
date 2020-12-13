import * as math from "mathjs";
import { Formik, Form, Field } from "formik";
import React from "react";

class SecantPage extends React.Component {
  state = {
    finished: false,
    iterations: null,
    x: null,
    logs: [],
  };

  handleSubmit = ({ fx, error, a, b }) => {
    const fxEquation = math.parse(fx);

    const f = (x) => {
      return fxEquation.evaluate({ x });
    };

    let x0 = a;
    let x1 = b;
    let iterations = 0;

    const logs = [x1];

    while (Math.abs(x1 - x0) > error) {
      iterations++;
      const x2 = x1 - (f(x1) * (x1 - x0)) / (f(x1) - f(x0));

      logs.push(x2);

      x0 = x1;
      x1 = x2;
    }

    this.setState({
      finished: true,
      x: x1,
      iterations,
      logs,
    });
  };

  render() {
    return (
      <div>
        <h2>Kirstinių metodas</h2>

        <Formik
          initialValues={{
            fx: "x^3 + 3x^2 - 3",
            error: 0.001,
            a: null,
            b: null,
          }}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <table>
              <tr>
                <td>
                  <label for="fx">f(x) = </label>
                </td>
                <td>
                  <Field type="text" name="fx" id="fx" required />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="error">Paklaida: </label>
                </td>
                <td>
                  <Field
                    type="number"
                    step="any"
                    name="error"
                    id="error"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="a">a = </label>
                </td>
                <td>
                  <Field type="number" step="any" name="a" id="a" required />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="b">b = </label>
                </td>
                <td>
                  <Field type="number" step="any" name="b" id="b" required />
                </td>
              </tr>
            </table>

            <br />

            <div>
              <button type="submit">Išspręsti</button>
            </div>
          </Form>
        </Formik>

        {this.state.finished && (
          <div>
            <p>Iš viso atlikta iteracijų: {this.state.iterations} </p>

            <table border="1">
              <tr>
                <th>Iteracija</th>
                <th>X reikšmė</th>
              </tr>

              {this.state.logs.map((value, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </table>

            <p>
              x ≈ <strong>{this.state.x}</strong>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default SecantPage;
