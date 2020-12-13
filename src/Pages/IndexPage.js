import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => (
  <div>
    <h1>Skaitinai ir optimizavimo metodai</h1>

    <hr />

    <h3>Apytiksliai tiesinių lygčių sistemų sprendimo metodai:</h3>

    <ul>
      <li>
        <Link to="/iterative">Iteracijų metodas</Link>
      </li>
      <li>
        <Link to="/seidel">Zeidelio metodas</Link>
      </li>
    </ul>

    <h3>Algebrinės ir transcendentinės lygtys:</h3>

    <ul>
      <li>
        <Link to="/bisection">Intervalo dalijimo pusiau metodas</Link>
      </li>
      <li>
        <Link to="/secant">Kirstinių metodas</Link>
      </li>
      <li>
        <Link to="/newton">Liestinių metodas</Link>
      </li>
      <li>
        Šaknų atskyrimo metodai:
        <ul>
          <li>
            <Link to="/graph">Grafinis metodas</Link>
          </li>
          <li>
            <Link to="/analysis">Analizinis metodas</Link>
          </li>
        </ul>
      </li>
    </ul>

    <hr />

    <p>Jonas Ritchi PI19B</p>
  </div>
);

export default IndexPage;
