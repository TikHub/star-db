import React, { Component, Fragment } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import "./random-planet.css";

export default class RandomPlanet extends Component {
  constructor() {
    super();

    this.updatePlanet();
  }
  state = {
    planet: {},
    loading: true
  };

  SwapiService = new SwapiService();

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 10) + 2;
    this.SwapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { planet, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={name}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
