import CryptoJS from "crypto-js";

export function encrypt(str: string) {
  const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;

  const encrypted = CryptoJS.AES.encrypt(str, secretKey).toString();
  return encrypted;
}

export function decrypt(str: string) {
  const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
  const decrypted = CryptoJS.AES.decrypt(str, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}
