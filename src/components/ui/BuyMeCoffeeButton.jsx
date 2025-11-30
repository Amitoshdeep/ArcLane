// components/BuyMeCoffeeButton.jsx

import React from "react";
import { Coffee } from "lucide-react";

function BuyMeCoffeeButton() {
  return (
    <a
      href="https://buymeacoffee.com/amitoshdeep"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        bg-yellow-400 text-black
        p-3 rounded-full shadow-lg
        hover:bg-yellow-500 hover:scale-105
        transition-all duration-200
        flex items-center justify-center
      "
    >
      <Coffee size={20} />
    </a>
  );
}

export default BuyMeCoffeeButton;
