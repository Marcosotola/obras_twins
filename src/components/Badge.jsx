import React from 'react';
import logoWa from './logoWa.png';

const Badge = () => {
  const handleBadgeClick = () => {
    window.location.href = 'https://wa.me/3513908198';
  };

  return (
    <div
      className="position-fixed cursor-pointer end-0 z-index-3 p-2"
      onClick={handleBadgeClick}
    >
      <img
        src={logoWa}
        alt="WhatsApp"
        className="img-fluid"
        width="70"
      />
    </div>
  );
};

export default Badge;
