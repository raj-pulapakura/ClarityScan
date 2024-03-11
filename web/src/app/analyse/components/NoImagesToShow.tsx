import React from "react";

export default function NoImagesToShow() {
  return (
    <div className="border-2 border-gray-500 bg-gray-400 bg-opacity-50 rounded-lg p-5 mt-4 flex flex-col items-center justify-center">
      <h1 className="text-lg text-center text-gray-700 font-bold">
        No Images to show
      </h1>
      <h1 className="text-md text-center text-gray-700">
        Upload an image to begin
      </h1>
    </div>
  );
}
