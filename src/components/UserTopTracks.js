import React from "react";
import {Track} from "./Track.js";

class UserTopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null
    };
  }

  componentDidMount() {
    let query = new URLSearchParams({
      limit: 10,
      offset: 0,
      time_range: 'short_term'
    });

    fetch(`https://api.spotify.com/v1/me/top/tracks?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({response: data});
    }).catch((reason) => {
      console.log('error');
      console.error(reason);
    });
  }

  render(){
    if (!this.state.response) {
      return (
        <div className="user-profile">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;
    let tracks = response.items.map((track, index) => 
      <li key={index}><Track track={track}/></li>
    );

    return (
      <div className="user-top-tracks">
        <h1>Recent Top Played</h1>
        <ul>{tracks}</ul>
      </div>
    );
  }
} 

export {UserTopTracks};