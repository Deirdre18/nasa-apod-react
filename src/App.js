import React, { Component } from "react";
// eslint-disable-next-line
import DateInput from "./components/DateInput";
import Photo from "./components/Photo.js";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class App extends Component {

  state = {
    date: "",
    photo: ""
  };

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY_YT}`)

    .then(response => response.json())
    .then(json => this.setState({ photo: json }));
  }

  changeDate = e => {
    e.preventDefault();
    let dateFromInput = e.target[0].value;
    this.setState({ date: dateFromInput });
    this.getPhoto(dateFromInput);
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  getPhoto = date => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_API_KEY_YT}`)
    .then(response => response.json())
    .then(photoData => this.setState({ photo: photoData }));
  };

  render() {
    return (


      <div>
        <h1>NASA's Astronomy Picture of the Day</h1>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        <Photo photo={this.state.photo} />
      </div>
    );
  }
}

export default App;
