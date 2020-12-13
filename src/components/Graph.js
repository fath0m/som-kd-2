import React from "react";
import * as math from "mathjs";
import Plot from "react-plotly.js";

const Graph = ({ equations = [] }) => {
  const data = equations.map((equation) => {
    const expression = math.compile(equation);

    const xValues = math.range(-10, 10, 0.01).toArray();
    const yValues = xValues.map((x) => {
      return expression.evaluate({ x });
    });

    return {
      x: xValues,
      y: yValues,
      type: "scatter",
      name: equation,
      // title: equation,
    };
  });

  return <Plot data={data} layout={{ width: 600, height: 600 }} />;
};

export default Graph;
