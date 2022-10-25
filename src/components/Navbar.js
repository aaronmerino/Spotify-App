import React from "react";
import {MenuItems} from "./NavbarMenuItems.js";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menuItems = MenuItems.map((item, index) => { 
      return (
        <li key={index}>
          <button onClick={() => 
            {
              this.props.onHandleNavbarClick(index);
            }}>
            {item.name}
          </button>
        </li>
      );
    });
    return (
      <div className="Navbar">
        <ol> 
          {menuItems}
        </ol>
      </div>
    );
  }
}

export {Navbar};