import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      searchInput: "",
      clickSearch: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value
    });
  };

  handleSearch = (searchValue) => {
    var url = `https://api.giphy.com/v1/gifs/search?api_key=UwVBQT4TyC4T0TIWGY8YprN5AhWMS0GK&q=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          result: result.data
        });
      });
  };

  componentDidMount() {
    var url =
      "https://api.giphy.com/v1/gifs/trending?api_key=UwVBQT4TyC4T0TIWGY8YprN5AhWMS0GK";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          result: result.data
        });
      });
  }
  render() {
    let gifDisplay = this.state.result.map((results) => {
      return (
        <a
          target="_blank"
          href={results.images.downsized_small.mp4}
          key={results.id}
        >
          <img
            src={results.images.downsized_medium.url}
            alt={results.title}
            className="gifclass"
          />
          <div className="images">{results.title}</div>
        </a>
      );
    });
    return (
      <div className="App">
        <input
          type="text"
          name="search"
          onChange={this.handleChange}
          className="text"
        />
        <input
          type="button"
          name="searchButton"
          onClick={() => this.handleSearch(this.state.searchInput)}
          value="Search"
          className="btn"
        />
        <h1>Trending Gifs</h1>
        {gifDisplay}
      </div>
    );
  }
}
