import React, { useState, useEffect, useRef } from 'react';
import './FunnyCandle.css';

// Hàm lấy vị trí ngẫu nhiên
const getRandomPosition = () => {
    const maxWidth = window.innerWidth - 120;
    const maxHeight = window.innerHeight - 120;
    // Random toàn màn hình
    const randomX = Math.max(20, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(20, Math.floor(Math.random() * maxHeight));
    return { top: randomY, left: randomX };
};

const CandleStructure = () => (
    <div className="candle-wrapper">
        <div className="candles">
            <div className="light__wave"></div>
            <div className="candle1">
                <div className="candle1__body">
                    <div className="candle1__eyes">
                        <span className="candle1__eyes-one"></span>
                        <span className="candle1__eyes-two"></span>
                    </div>
                    <div className="candle1__mouth"></div>
                </div>
                <div className="candle1__stick"></div>
            </div>
            <div className="candle2">
                <div className="candle2__body">
                    <div className="candle2__eyes">
                        <div className="candle2__eyes-one"></div>
                        <div className="candle2__eyes-two"></div>
                    </div>
                </div>
                <div className="candle2__stick"></div>
            </div>
            <div className="candle2__fire"></div>
            <div className="sparkles-one"></div>
            <div className="sparkles-two"></div>
            <div className="candle__smoke-one"></div>
            <div className="candle__smoke-two"></div>
        </div>
        <div className="floor"></div>
    </div>
);

const FunnyCandle = () => {
    // Khởi đầu ở vị trí ngẫu nhiên luôn (không cố định góc nữa)
    const [position, setPosition] = useState(getRandomPosition());
    const [ghosts, setGhosts] = useState([]); 
    const positionRef = useRef(position);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        const teleport = () => {
            const currentPos = positionRef.current;
            
            // Tạo tàn ảnh
            const newGhost = {
                id: Date.now() + Math.random(), // Thêm random để tránh trùng ID khi nhảy nhanh
                top: currentPos.top,
                left: currentPos.left,
            };
            setGhosts(prev => [...prev, newGhost]);

            // Nhảy đến vị trí mới
            const newPos = getRandomPosition();
            setPosition(newPos);

            // Xóa tàn ảnh nhanh hơn (0.8s)
            setTimeout(() => {
                setGhosts(prev => prev.filter(g => g.id !== newGhost.id));
            }, 800);
        };

        // --- TỐC ĐỘ CAO HƠN ---
        // Nhảy ngẫu nhiên trong khoảng 0.8 giây đến 2 giây (trước đây là 2-4s)
        const randomIntervalTime = Math.random() * 1200 + 800; 
        
        // Delay lần đầu tiên một chút để các con nến không nhảy cùng nhịp
        const initialDelay = Math.random() * 2000;
        
        let intervalId;
        const timeoutId = setTimeout(() => {
             intervalId = setInterval(teleport, randomIntervalTime);
        }, initialDelay);

        const handleResize = () => {
             setPosition(prev => ({...prev, left: Math.min(prev.left, window.innerWidth - 150)}));
        }
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            if(intervalId) clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {ghosts.map(ghost => (
                <div 
                    key={ghost.id}
                    className="candle-widget-container candle-ghost"
                    style={{ top: `${ghost.top}px`, left: `${ghost.left}px` }}
                >
                    <CandleStructure />
                </div>
            ))}

            <div 
                className="candle-widget-container main-candle"
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
                <CandleStructure />
            </div>
        </>
    );
};

export default FunnyCandle;