import React from "react";
import { Formik, Form, Field } from "formik";
import Graph from "../components/Graph";

const GraphPage = () => {
  const [equations, setEquations] = React.useState([]);

  return (
    <div>
      <h2>Grafinis metodas</h2>

      <Formik
        initialValues={{
          gx: "",
          hx: "",
        }}
        onSubmit={(values) => {
          setEquations([values.gx, values.hx]);
        }}
      >
        <Form>
          <table>
            <tr>
              <td>
                <label for="gx">g(x) = </label>
              </td>
              <td>
                <Field type="text" name="gx" id="gx" required />
              </td>
            </tr>

            <tr>
              <td>
                <label for="hx">h(x) = </label>
              </td>
              <td>
                <Field type="text" name="hx" id="hx" required />
              </td>
            </tr>
          </table>

          <br />

          <div>
            <button type="submit">Atvaizduoti</button>
          </div>
        </Form>
      </Formik>

      {equations.length > 0 && <Graph equations={equations} />}
    </div>
  );
};

export default GraphPage;
