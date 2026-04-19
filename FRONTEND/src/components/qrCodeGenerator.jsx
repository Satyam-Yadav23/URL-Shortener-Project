import React, { useState } from "react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    const res = await axios.post("/api/qr", {
      url: inputUrl,
    });
    setQr(res.data.qr);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr.png";
    link.click();
  };

  return (
    <div>
      <h2>QR Code Generator</h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />

      {/* Button */}
      <button onClick={generateQR}>Generate QR</button>

      {/* QR Display */}
      {qr && (
        <>
          <img src={qr} alt="QR Code" />
          <br />
          <button onClick={downloadQR}>Download QR</button>
        </>
      )}
    </div>
  );
};

export default QRCodeGenerator;