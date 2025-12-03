import React, { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";
import QRCode from "qrcode";

function BuyMeCoffeeButton() {
  const [open, setOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState("");

  const UPI_ID = "amitosh1999@ptyes";
  const PAYEE_NAME = "Amitoshdeep";
  const AMOUNT = ""; // optional

  const upiURL =
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}` +
    (AMOUNT ? `&am=${AMOUNT}` : "") +
    "&cu=INR";

  useEffect(() => {
    QRCode.toDataURL(upiURL, { width: 240 }, (err, url) => {
      if (!err) setQrSrc(url);
    });
  }, []);

  return (
    <>
      {/* HEART BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 z-50
          bg-pink-500 hover:bg-pink-600
          text-white p-3 rounded-full
          shadow-lg hover:scale-110
          transition-all duration-200
        "
      >
        <Heart size={20} />
      </button>

      {/* COMPACT POPUP ABOVE HEART */}
      {open && (
        <div
          className="
            fixed bottom-20 right-6 z-50
            bg-black/90 border border-white/20
            rounded-xl p-3 w-56
            shadow-lg animate-popup
          "
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm">Support Me</span>
            <button onClick={() => setOpen(false)}>
              <X size={16} className="text-white/60 hover:text-white" />
            </button>
          </div>

          {/* QR */}
          <div className="flex justify-center mb-2">
            {qrSrc ? (
              <img
                src={qrSrc}
                alt="UPI QR"
                className="w-24 h-24 rounded-md border border-white/20"
              />
            ) : (
              <p className="text-white/50 text-xs">Generating QR...</p>
            )}
          </div>

          {/* UPI */}
          <div className="text-center mb-2">
            <p className="text-white/50 text-xs">UPI:</p>
            <p className="text-green-400 font-semibold text-sm">{UPI_ID}</p>
          </div>

          {/* External Link */}
          <a
            href="https://buymeacoffee.com/amitoshdeep"
            target="_blank"
            className="
              block text-center bg-yellow-500 text-black
              text-sm py-1 rounded-md font-semibold
              hover:bg-yellow-600 transition
            "
          >
            Buy Me a Coffee
          </a>
        </div>
      )}
    </>
  );
}

export default BuyMeCoffeeButton;
