import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end mb-4">
          <button onClick={() => setSelectedImage(null)} className="text-white hover:text-gray-300">
            <X size={32} />
          </button>
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-96 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
              <div><strong>Category:</strong> {selectedImage.category}</div>
              <div><strong>Location:</strong> {selectedImage.location}</div>
              <div><strong>Year:</strong> {selectedImage.year}</div>
              <div><strong>Size:</strong> {selectedImage.size}</div>
            </div>
            <p className="text-gray-700">{selectedImage.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;