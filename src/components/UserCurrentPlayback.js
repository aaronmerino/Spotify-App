import React from "react";
import {Track} from "./Track.js";

class UserCurrentPlayback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null
    };
  }


  componentDidMount() {
    let query = new URLSearchParams({
      additional_types: "track"
    });

    fetch(`https://api.spotify.com/v1/me/player?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }).then((response) => {
      console.log(response);
      if (response.status == 200) {
        return response.json();
      } else {
        return {noContent: response.status};
      }
    }).then((data) => {
      console.log(data);
      this.setState({response: data});
    }).catch((reason) => {
      console.log('error');
      console.error(reason);
    });
  }

  render() {
    if (!this.state.response) {
      return (
        <div className="user-current-playback">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;

    if (response.noContent) {
      return (
        <div className="user-current-playback">
          <h1>Currently Playing</h1>
          <p>nothing is being played</p>
        </div>
      );
    }

    return (
      <div className="user-current-playback">
        <h1>Currently Playing</h1>
        <Track track={response.item}/>
      </div>
    );
  }

}

export {UserCurrentPlayback};