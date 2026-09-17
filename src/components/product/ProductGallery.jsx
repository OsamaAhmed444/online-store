import React, { useState } from "react";

const ProductGallery = ({ images = [], productName = "Product" }) => {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(
    validImages[0] || null
  );

  // No images
  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-muted">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          {/* Font Awesome Icon */}
          <i className="fa-regular fa-image text-5xl" />

          <p className="text-sm">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-cover transition duration-300"
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {validImages.map((image, index) => {
            const isSelected = selectedImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  isSelected
                    ? "border-foreground"
                    : "border-border hover:border-muted-foreground"
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

