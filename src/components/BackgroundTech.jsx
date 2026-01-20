// src/components/BackgroundTech.jsx
import React, { useMemo } from 'react';

const BackgroundTech = () => {
  // Tạo mảng các hạt số 0 và 1
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      val: Math.random() > 0.5 ? '1' : '0',
      x: Math.random() * 100, // Vị trí ngang %
      y: Math.random() * 100, // Vị trí dọc %
      z: Math.random() * 500 - 250, // Độ sâu 3D (Z-axis)
      size: Math.random() * 20 + 10, // Kích thước chữ
      duration: Math.random() * 10 + 5, // Tốc độ bay
      delay: Math.random() * -10, // Độ trễ để không xuất hiện cùng lúc
      opacity: Math.random() * 0.5 + 0.1 // Độ mờ
    }));
  }, []);

  return (
    <div className="tech-bg-container">
      {/* Lưới công nghệ 3D dưới đáy */}
      <div className="tech-grid-floor"></div>
      
      {/* Các số 0 1 bay lơ lửng */}
      <div className="binary-cloud">
        {particles.map((p) => (
          <div
            key={p.id}
            className="binary-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
              // Biến CSS để truyền giá trị Z vào keyframes
              '--z-depth': `${p.z}px` 
            }}
          >
            {p.val}
          </div>
        ))}
      </div>
      
      {/* Lớp phủ màu để tạo chiều sâu tối dần */}
      <div className="vignette-overlay"></div>
    </div>
  );
};

export default BackgroundTech;