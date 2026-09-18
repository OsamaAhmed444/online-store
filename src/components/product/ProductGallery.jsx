import React, { useState } from "react";

const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const validImages = Array.isArray(images)
    ? images.filter(Boolean)
    : [];

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-muted">
        <div className="text-center text-muted-foreground">
          <i className="fa-regular fa-image mb-3 text-4xl" />
          <p className="text-sm">No image available</p>
        </div>
      </div>
    );
  }

  const currentImage =
    validImages[selectedImage] || validImages[0];

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <img
          src={currentImage}
          alt={productName}
          className="aspect-square w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                selectedImage === index
                  ? "border-foreground"
                  : "border-border hover:border-muted-foreground"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

