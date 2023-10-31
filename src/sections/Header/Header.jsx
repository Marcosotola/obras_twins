import React from 'react'
import Logo from "./LogoTwins.png";
import Menu from '../../components/Menu';

export const Header = () => {
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mt-3  p-1'>
        <Menu />
        <div className='bg-secondary p-1 rounded'>
          <img src={Logo} className="logo" alt="logo" width='100vh'/>
        </div>
      </div>
    </>
  )
}



export default Header;