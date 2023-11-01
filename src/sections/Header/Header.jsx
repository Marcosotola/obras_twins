import React from 'react'
import Logo from "./LogoTwins.png";
import Menu from '../../components/Menu';

export const Header = () => {
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mt-3 mb-3 p-1'>
        <Menu />
        <h1 className='text-warning'>P O C I T O</h1>
        <div className='bg-secondary p-1 rounded'>
          <img src={Logo} className="logo" alt="logo" width='100vh'/>
        </div>
      </div>
      <hr />
    </>
  )
}



export default Header;