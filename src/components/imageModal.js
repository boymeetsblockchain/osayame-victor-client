/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const ImageModal = ({ images, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center  justify-center z-50 bg-opacity-50 bg-black">
      <div className="bg-white rounded-lg p-8 w-full h-64 overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          Return to login screen
        </button>
        <div className="grid grid-cols-3 gap-4 ">
          {images.map((image) => (
            <div key={image.id} className="flex justify-center">
              <img
                src={image.image}
                alt={`Image ${image.id}`}
                className="max-h-64 hover:scale-125 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
