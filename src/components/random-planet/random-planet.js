import React, { Component, Fragment } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import "./random-planet.css";

export default class RandomPlanet extends Component {
  componentDidMount() {
    // console.log("Did mount");
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  state = {
    planet: {},
    loading: true,
    error: false
  };

  SwapiService = new SwapiService();

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };
  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 10) + 3;
    this.SwapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    // console.log("Render");
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
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
