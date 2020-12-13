import * as math from "mathjs";
import React from "react";
import { Formik, Form, Field } from "formik";

class NewtonPage extends React.Component {
  state = {
    finished: false,
    iterations: null,
    logs: [],
    x: null,
  };

  handleSubmit = ({ fx, error, x }) => {
    const der = math.derivative(fx, "x").toString();

    const f = (X) => {
      // return math.evaluate(math.parse(fx), { x: X });
      return math.compile(fx).evaluate({ x: X });
    };

    const df = (X) => {
      // return math.evaluate(math.parse(der), { x: X });
      return math.compile(der).evaluate({ x: X });
    };

    // initial guess
    let xn = x;
    let xn_prev = xn * 2;
    let fxn = f(xn);

    let i = 0;

    const logs = [xn];

    while (Math.abs(xn - xn_prev) > error) {
      const dfxn = df(xn);

      xn_prev = xn;
      xn = xn - fxn / dfxn;

      logs.push(xn);

      fxn = f(xn);
      i++;
    }

    if (isNaN(xn)) {
      return alert("Nepavyko apskaičiuoti. Pabandykitę kitą spėjinį");
    }

    this.setState({
      finished: true,
      iterations: i,
      x: xn,
      logs,
    });
  };

  render() {
    return (
      <div>
        <h2>Liestinių metodas</h2>

        <Formik
          initialValues={{
            fx: "x^3 + 3x^2 - 3",
            error: 0.001,
            x: null,
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
                  <label for="x">f(x) = 0, x ≈ </label>
                </td>
                <td>
                  <Field type="number" step="any" name="x" id="x" required />
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

export default NewtonPage;
