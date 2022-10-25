import React from "react";
import {Artist} from "./Artist.js";

class UserTopArtists extends React.Component {
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

    fetch(`https://api.spotify.com/v1/me/top/artists?${query.toString()}`, {
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
        <div className="user-top-artists">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;
    let artists = response.items.map((artist, index) => 
      <li key={index}><Artist artist={artist}/></li>
    );

    return (
      <div className="user-top-artists">
        <h1>Recent Top Artists</h1>
        <ul>{artists}</ul>
      </div>
    );
  }
}

export {UserTopArtists};