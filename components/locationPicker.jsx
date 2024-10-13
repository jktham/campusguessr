import React, { useState, useRef } from 'react';
import styles from '/styles/locationPicker.module.css';

export default function LocationPicker({onGuess}) {
  const [scale, setScale] = useState(1);
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [coordsEnabled, setCoordsEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState('Click "Get Pixel Coords" to enable coordinate detection');
  const [selectedImage, setSelectedImage] = useState("HG_B.png"); // Default image
  const imageRef = useRef(null);

  // List of available images for the dropdown
  const images = [
    "HG_B.png", "HG_C.png", "HG_D.png", "HG_DO.png", 
    "HG_E.png", "HG_EO.png", "HG_F.png", "HG_FO.png", 
    "HG_G.png", "HG_GO.png", "HG_H.png", "HG_J.png", 
    "HG_JO.png", "HG_K.png", "HG_KO.png"
  ];

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

    let imageElement = document.getElementById("floorPlanImage");

    console.log(imageElement.height, imageElement.naturalHeight);
    let screenScale = imageElement.naturalHeight / imageElement.height;

    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(screenScale * (e.clientX - rect.left) / scale);
    const y = Math.round(screenScale * (e.clientY - rect.top) / scale);

    setCoordinates(`X: ${x}, Y: ${y}`);

    let loc = {
      floor: selectedImage.replaceAll("HG_", "").replaceAll(".png", ""),
      x: x,
      y: y,
    }

    onGuess(loc)
  };

  const resetZoom = () => {
    setScale(defaultScale);
    setOriginX(0);
    setOriginY(0);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
    // Reset zoom and coordinates when switching images
    resetZoom();
    setCoordinates('Click "Get Pixel Coords" to enable coordinate detection');
  };

  return (
    <div className={styles.container}>
      {/* Dropdown to select the image */}
      <div className={styles.controls}>
        <label htmlFor="imageSelect">Select Floorplan: </label>
        <select id="imageSelect" value={selectedImage} onChange={handleImageChange}>
          {images.map((image) => (
            <option key={image} value={image}>
              {image}
            </option>
          ))}
        </select>
      </div>

      {/* Image with zoom and drag functionality */}
      <div className={styles.imageWrapper}>
        <img id="floorPlanImage"
          ref={imageRef}
          src={`/floorplans/HG/${selectedImage}`} // Dynamic image based on dropdown
          alt="Zoomable Floorplan"
          className={styles.zoomImage}
          style={{ transform: `scale(${scale}) translate(${originX}px, ${originY}px)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleImageClick}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Zoom and reset controls */}
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => handleZoom(zoomFactor)}>Zoom In</button>
        <button className={styles.button} onClick={() => handleZoom(-zoomFactor)}>Zoom Out</button>
        <button className={styles.button} onClick={resetZoom}>Reset</button>
        <button className={styles.button} onClick={handleGetCoords}>
          {coordsEnabled ? 'Disable Pixel Coords' : 'Get Pixel Coords'}
        </button>
      </div>

      {/* Display the coordinates or message */}
      <p className={styles.paragraph}>{coordinates}</p>
    </div>
  );
};