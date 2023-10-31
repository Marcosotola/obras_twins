import React from 'react'
import Logo from "./LogoTwins.png";
import Menu from '../../components/Menu';

export const Header = () => {
  return (
    <>
      <div className='d-flex justify-content-around align-items-center'>
        <Menu />
        <h3 className='text-secondary'>POCITO</h3>
        <div className='bg-secondary p-1 rounded'>
          <img src={Logo} className="logo" alt="logo" width='100vh'/>
        </div>
      </div>
    </>
  )
}



export default Header;