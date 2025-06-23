import React from "react";

const ItemCard = ({ item }) => {
  const { name, description, status, image } = item;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 font-[Poppins]">
      {/* Gambar item */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Konten */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {/* Status dan tombol */}
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              status === "Found"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
          <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;