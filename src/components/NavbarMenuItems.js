import {UserTopTracks} from "./UserTopTracks.js";
import {UserTopArtists} from "./UserTopArtists.js"

const MenuItems = [
  {
    name: "Your Top Played Tracks",
    component: UserTopTracks
  },

  {
    name: "Your Top Artists",
    component: UserTopArtists
  }
];

export {MenuItems};