import { Field, Form, Formik } from "formik";
import { zeros } from "mathjs";
import React from "react";

const EquationForm = ({ onSubmit }) => {
  const defaultDimensions = 3;

  return (
    <div>
      <Formik
        initialValues={{
          dimensions: defaultDimensions,
          // equation: [
          //   [9.9, -1.5, 2.6],
          //   [0.2, 6.8, -4.2],
          //   [0.7, 0.4, 7.1],
          // ],
          // answers: [[0], [4.1], [-1.3]],
          // error: 0.0001,
          equation: [
            [10.9, 0.4, 1.3, -0.2],
            [1.1, 9.8, 1.5, -1.2],
            [0.2, 1.3, 8.8, 0.9],
            [2.1, 3.1, 1.6, 11.1],
          ],
          answers: [[5.1], [-1.7], [0], [3.4]],
          error: 0.001,
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <table>
              <tr>
                <td>
                  <label for="dimensions">Lygties dydis: </label>
                </td>
                <td>
                  <select
                    as="select"
                    name="dimensions"
                    id="dimensions"
                    defaultValue={defaultDimensions}
                    value={values.dimensions}
                    onChange={(event) => {
                      let value = parseInt(event.target.value);

                      setFieldValue("dimensions", value);
                      setFieldValue("equation", zeros(value, value)._data);
                      setFieldValue("answers", zeros(value, 1)._data);
                    }}
                  >
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                    <option value={5}>5x5</option>
                    <option value={6}>6x6</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="error">Paklaida: </label>
                </td>
                <td>
                  <Field
                    name="error"
                    id="error"
                    type="number"
                    step="any"
                    required
                  />
                </td>
              </tr>
            </table>

            <br />

            <table>
              {values.equation.map((row, x) => (
                <tr>
                  {row.map((column, y) => (
                    <>
                      <td>
                        <Field
                          name={`equation[${x}][${y}]`}
                          id={`equation[${x}][${y}]`}
                          type="number"
                          step="any"
                          className="EquationInput"
                          required
                        />
                      </td>
                      <td>
                        x<sub>{y + 1}</sub>
                      </td>
                      <td>{y < row.length - 1 ? " + " : " = "}</td>
                    </>
                  ))}
                  <td>
                    <Field
                      name={`answers[${x}][0]`}
                      id={`answers[${x}][0]`}
                      type="number"
                      step="any"
                      className="EquationInput"
                      required
                    />
                  </td>
                </tr>
              ))}
            </table>

            <br />
            <button type="submit">Išspręsti</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EquationForm;
