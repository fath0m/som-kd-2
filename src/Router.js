import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AnalysisPage from "./Pages/AnalysisPage";
import BisectionPage from "./Pages/BisectionPage";
import GraphPage from "./Pages/GraphPage";
import IndexPage from "./Pages/IndexPage";
import IterativePage from "./Pages/IterativePage";
import NewtonPage from "./Pages/NewtonPage";
import SecantPage from "./Pages/SecantPage";
import SeidelPage from "./Pages/SeidelPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <IndexPage />
      </Route>

      <Route exact path="/iterative">
        <IterativePage />
      </Route>

      <Route exact path="/seidel">
        <SeidelPage />
      </Route>

      <Route exact path="/secant">
        <SecantPage />
      </Route>

      <Route exact path="/newton">
        <NewtonPage />
      </Route>

      <Route exact path="/graph">
        <GraphPage />
      </Route>

      <Route exact path="/analysis">
        <AnalysisPage />
      </Route>

      <Route exact path="/bisection">
        <BisectionPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
