import React from 'react'
import Logo from "./LogoTwins.png";
import "./Header.css";

export const Header = () => {
  return (
    <>
      <div className='header'>
        <h4>OBRA ROGGIO</h4>
        <div className='logoContainer'>
          <img src={Logo} className='logo' alt="logo" />
        </div>
      </div>
    </>
  )
}
export default Header;