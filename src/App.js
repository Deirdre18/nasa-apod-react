import React, { Component } from "react";
import DateInput from "./components/DateInput.js";
import Photo from "./components/Photo.js";
import moment from "moment";
import momentRandom from "moment-random";


class App extends Component {

  state = {
    date:moment(),
    photo:""
  };

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY_YT}`)

    .then(response => response.json())
    .then(json => this.setState({ photo: json }));
  }

  formatDate = moment => {
   let year = moment.year();
   let month = moment.month() + 1;
   let day = moment.date();
   return `${year}-${month}-${day}`;
   }

  changeDate = dateFromInput => {
        this.setState({ date: dateFromInput });
        this.getPhoto(this.formatDate(dateFromInput));
       };

  getPhoto = date => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_API_KEY_YT}`)
    .then(response => response.json())
    .then(photoData => this.setState({ photo: photoData }));
  };

  handleClick = () => {
      let randomDate = momentRandom(moment(), moment("06-16-1995", "MM-DD-YYYY"));
      this.setState({ date: randomDate });
      this.getPhoto(this.formatDate(randomDate))
  };

  render() {
    return (
      <div>
        <h1>NASA's Astronomy Picture of the Day</h1>
          <DateInput
              changeDate={this.changeDate}
              date={this.state.date}
              handleClick={this.handleClick}
        />
          <Photo photo={this.state.photo} />

      </div>
    );
  }
}

export default App;
