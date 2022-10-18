import React from "react";

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let track = this.props.track;
    let artists = track.artists.map( (artist, index) => <li key={index}><a href={artist.external_urls.spotify}>{artist.name}</a></li>);

    return (
      <div className="track">
        <img src={track.album.images[0].url} />
        <div className="track-info"> 
          <h2>
            <span className="label">NAME</span> 
            <a href={track.external_urls.spotify}>
              {track.name}
            </a>
          </h2>

          <h2>
            <span className="label">ALBUM</span> 
            <a href={track.album.external_urls.spotify}>
              {track.album.name}
            </a>
          </h2>

          <h2>
            <span className="label">ARTIST(S)</span> 
            <ul className="artists-list">{artists}</ul> 
          </h2>
          
        </div>

      </div>
    );
  }
}

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
        <div id="user-profile">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;
    let tracks = response.items.map((track, index) => 
      <li key={index}><Track track={track}/></li>
    );

    return (
      <div id="user-top-tracks">
        <h1>Recent Top Played</h1>
        <ul>{tracks}</ul>
      </div>
    );
  }
} 

export {Track, UserTopTracks};