import React, { useState } from 'react';

const TestDropdown = () => {
  const [selectedImage, setSelectedImage] = useState('HG_B-1.png');

  const images = [
    "HG_B-1.png", "HG_C-1.png", "HG_D-1.png", "HG_DO-1.png",
    "HG_E-1.png", "HG_EO-1.png", "HG_F-1.png", "HG_FO-1.png",
    "HG_G-1.png", "HG_GO-1.png", "HG_H-1.png", "HG_J-1.png",
    "HG_JO-1.png", "HG_K-1.png", "HG_KO-1.png"
  ];

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  return (
    <div>
      <label htmlFor="imageSelect">Select Image: </label>
      <select id="imageSelect" value={selectedImage} onChange={handleImageChange}>
        {images.map((image) => (
          <option key={image} value={image}>
            {image}
          </option>
        ))}
      </select>
      <p>Selected Image: {selectedImage}</p>
    </div>
  );
};

export default TestDropdown;
