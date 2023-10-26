import React from 'react'
import Logo from "./LogoTwins.png";
import Menu from '../../components/Menu';

export const Header = () => {
  return (
    <>
      <div className='d-flex justify-content-around align-items-center'>
        <Menu />
        <h3 className='text-info'>POCITO</h3>
        <div className='logoContainer'>
          <img src={Logo} className="logo" alt="logo" width='100vh'/>
        </div>
      </div>
      <hr />
    </>
  )
}



export default Header;