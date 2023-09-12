import React, { useState } from 'react';
import ImageModal from '../components/imageModal'; // Update the path
import {imageData} from '../data'
const ImageScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>
      {showModal && (
        <ImageModal images={imageData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ImageScreen;
