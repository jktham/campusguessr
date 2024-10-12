import React, { useState, useRef } from 'react';
import styles from './ImageZoom.module.css';

const ImageZoom = () => {
  const [scale, setScale] = useState(1);
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [coordsEnabled, setCoordsEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState('Click "Get Pixel Coords" to enable coordinate detection');
  const imageRef = useRef(null);

  const zoomFactor = 0.2;
  const defaultScale = 1;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - originX);
    setStartY(e.clientY - originY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOriginX(e.clientX - startX);
      setOriginY(e.clientY - startY);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoom = (deltaScale) => {
    const rect = imageRef.current.getBoundingClientRect();
    const container = imageRef.current.parentElement;

    const containerCenterX = container.clientWidth / 2;
    const containerCenterY = container.clientHeight / 2;

    const imageCenterX = (containerCenterX - rect.left) / scale;
    const imageCenterY = (containerCenterY - rect.top) / scale;

    const newScale = scale + deltaScale;

    if (newScale < 0.5) return;

    const newOriginX = (originX - imageCenterX) * (newScale / scale) + imageCenterX;
    const newOriginY = (originY - imageCenterY) * (newScale / scale) + imageCenterY;

    setScale(newScale);
    setOriginX(newOriginX);
    setOriginY(newOriginY);
  };

  const handleGetCoords = () => {
    setCoordsEnabled(!coordsEnabled);
    if (!coordsEnabled) {
      setCoordinates('Click on the image to get pixel coordinates');
    } else {
      setCoordinates('Click "Get Pixel Coords" to enable coordinate detection');
    }
  };

  const handleImageClick = (e) => {
    if (!coordsEnabled) {
      setCoordinates('Click "Get Pixel Coords" to enable coordinate detection');
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / scale);
    const y = Math.round((e.clientY - rect.top) / scale);

    setCoordinates(`X: ${x}, Y: ${y}`);

    fetch('/api/save-coordinates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x, y }),
    });
  };

  const resetZoom = () => {
    setScale(defaultScale);
    setOriginX(0);
    setOriginY(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          ref={imageRef}
          src="/imgs/example.jpg"
          alt="Zoomable"
          className={styles.zoomImage}
          style={{ transform: `scale(${scale}) translate(${originX}px, ${originY}px)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleImageClick}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => handleZoom(zoomFactor)}>Zoom In</button>
        <button className={styles.button} onClick={() => handleZoom(-zoomFactor)}>Zoom Out</button>
        <button className={styles.button} onClick={resetZoom}>Reset</button>
        <button className={styles.button} onClick={handleGetCoords}>
          {coordsEnabled ? 'Disable Pixel Coords' : 'Get Pixel Coords'}
        </button>
      </div>
      <p className={styles.paragraph}>{coordinates}</p>
    </div>
  );
};

export default ImageZoom;
