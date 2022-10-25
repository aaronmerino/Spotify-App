import {UserTopTracks} from "./UserTopTracks.js";
import {UserCurrentPlayback} from "./UserCurrentPlayback.js"

const MenuItems = [
  {
    name: "Top Played Tracks",
    component: UserTopTracks
  },

  {
    name: "Top Played Albums",
    component: UserCurrentPlayback
  }
];

export {MenuItems};