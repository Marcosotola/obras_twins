import React, { useState } from 'react';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar p-3" data-bs-theme="dark" style={{ position: 'relative' }}>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}
      >
        <ul className="navbar-nav bg-secondary">
          <li className="nav-item">
            <a className="nav-link" href="/"><h4>Inicio</h4></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Movimientos"><h4>Movimientos</h4></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;











