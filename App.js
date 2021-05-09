import React from "react";
import "./App.css";
import City from "./City";
import axios from "axios";
import Header from "./Header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cities: "",
    };
  }

  inputValues = (e) => {
    this.setState({ value: e.target.value });
  };

  getData = (e) => {
    e.preventDefault();
    let zipcode = this.state.value;
    if (this.state.value.length == 5) {
      axios
        .get("http://ctp-zip-api.herokuapp.com/zip/" + zipcode)
        .then((response) => {
          console.log(response.data);
          this.setState({ cities: response.data });
        })
        .catch((error) => {});
    }
  };
  createCities() {
    let container = [];
    for (let i = 0; i < this.state.cities.length; i++) {
      let oneCity = this.state.cities[i];
      container.push(
        <City
          key={oneCity.RecordNumber}
          city={oneCity.City}
          cState={oneCity.State}
          location={oneCity.Location}
          population={oneCity.EstimatedPopulation}
          wages={oneCity.TotalWages}
        />
      );
    }
    return container;
  }

  render() {
    return (
      <div>
        <Header header="Zip Code Search" />

        <form className="input-getter-div" onSubmit={this.getData}>
          <label htmlFor="input-box">Zip code:</label>
          <input
            id="input-box"
            type="text"
            onChange={this.inputValues}
            value={this.state.value}
            placeholder="Try 10001 and press Enter"
          />
        </form>

        <div>{this.createCities()}</div>
      </div>
    );
  }
}

export default App;
