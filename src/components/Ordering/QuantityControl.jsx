import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

export default function QuantityControl({ initialQuantity = 1, minQuantity, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center border rounded-full overflow-hidden h-fit mt-1.5">
      <button>
        <MinusOutlined
          className="bg-gray-200 p-2.5 cursor-pointer rounded-full"
          onClick={handleDecrease}
        />
      </button>
      <span className="mx-2 select-none">{quantity}</span>
      <button>
        <PlusOutlined
          className="bg-primary text-white p-2.5 cursor-pointer rounded-full"
          onClick={handleIncrease}
        />
      </button>
    </div>
  );
}
