const crypto = require("crypto-js");

/**
 * Decrypts the encrypted url using DES cryptography algorithm
 * 
 * @param {string} url 
 * @returns {url as <string>}
 */
const decryptUrl = (url) => {
  const key = "38346591";

  const urlBytes = crypto.enc.Base64.parse(url);

  const decryptConfig = {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
    iv: crypto.enc.Hex.parse("0000000000000000"),
    format: crypto.format.OpenSSL,
  };

  const decryptedBytes = crypto.DES.decrypt(
    { ciphertext: urlBytes },
    crypto.enc.Utf8.parse(key),
    decryptConfig
  );

  const decryptedUrl = crypto.enc.Utf8.stringify(decryptedBytes);
  const modifiedUrl = decryptedUrl.replace(/_96\.mp4/g, "_320.mp4");
  return modifiedUrl;
};

module.exports = decryptUrl;