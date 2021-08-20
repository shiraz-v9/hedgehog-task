var CryptoJS = require("crypto-js");

export function Cryptoencrypt(hash) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(hash, "secret key 123").toString();

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return ciphertext;
}

export function Cryptodecrypt(hash) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(hash, "secret key 123").toString();

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(hash, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText; // 'my message'
}
