import React from 'react'
import Logo from "./LogoTwins.png";
import "./Header.css";
import Menu from '../Menu';

export const Header = () => {
  return (
    <>
      <div className='header'>
        <Menu />
        <h3>Obra: POCITO</h3>
        <div className='logoContainer'>
          <img src={Logo} className="logo" alt="logo" />
        </div>
      </div>
    </>
  )
}



export default Header;