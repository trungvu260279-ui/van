import React from 'react';

const Background3D = () => {
  return (
    <div className="bg-3d-container">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="cube-floater" style={{
          width: Math.random() * 50 + 20 + 'px',
          height: Math.random() * 50 + 20 + 'px',
          left: Math.random() * 100 + 'vw',
          animationDuration: (Math.random() * 10 + 10) + 's',
          animationDelay: (Math.random() * -20) + 's'
        }} />
      ))}
    </div>
  );
};
export default Background3D;