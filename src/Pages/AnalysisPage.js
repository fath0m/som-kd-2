import React from "react";
import { Formik, Form, Field } from "formik";
import * as math from "mathjs";
import algebra from "algebra.js";

const MAX_INT_SAFE = 4294967295;

const AnalysisPage = () => {
  const [signTable, setSignTable] = React.useState([[]]);
  const [intervals, setIntervals] = React.useState([]);

  const handleSubmit = ({ fx }) => {
    const domainLow = -MAX_INT_SAFE;
    const domainHigh = MAX_INT_SAFE;

    // find derivatives
    const fxDer = math.derivative(fx, "x");
    const fxEquation = math.compile(fx);

    try {
      var answers = new algebra.Equation(algebra.parse(fxDer.toString()), 0)
        .solveFor("x")
        .map((a) => a.numer);
    } catch (error) {
      console.error(error);
      return alert("Neteisinga funkcija. Bandyktie dar kartą.");
    }

    const sign_table = [
      ["-∞", ...answers, "∞"],
      [
        Math.sign(fxEquation.evaluate({ x: domainLow })),
        ...answers.map((answer) => {
          return Math.sign(fxEquation.evaluate({ x: answer }));
        }),
        Math.sign(fxEquation.evaluate({ x: domainHigh })),
      ],
    ];

    const intervals = [];

    for (let i = 1; i < sign_table[0].length; i++) {
      const currentX = sign_table[0][i];
      const previousX = sign_table[0][i - 1];

      const currentSignY = sign_table[1][i];
      const previousSignY = sign_table[1][i - 1];

      if (currentSignY !== previousSignY) {
        // sign switch
        intervals.push([previousX, currentX]);
      }
    }

    setIntervals(intervals);
    setSignTable(sign_table);
  };

  return (
    <div>
      <h2>Analizinis metodas</h2>

      <Formik
        initialValues={{
          fx: "",
        }}
        onSubmit={handleSubmit}
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
          </table>

          <br />

          <div>
            <button type="submit">Apskaičiuoti</button>
          </div>
        </Form>
      </Formik>

      {signTable[0] && signTable[0].length > 0 ? (
        <>
          <br />
          <table border="1">
            <tr>
              <th>X</th>
              {signTable[0].map((x) => (
                <td>{x}</td>
              ))}
            </tr>

            <tr>
              <th>Ženklas</th>
              {signTable[1].map((x) => (
                <td>{x}</td>
              ))}
            </tr>
          </table>
        </>
      ) : (
        ""
      )}

      {intervals && intervals.length > 0 ? (
        <>
          <br />

          <p>Funkcija keičia ženklus intervaluose:</p>

          <ul>
            {intervals.map((interval) => (
              <li>
                ({interval[0]}, {interval[1]})
              </li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AnalysisPage;
