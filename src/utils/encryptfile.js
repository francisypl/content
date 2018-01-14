import { AES } from 'crypto-js';
const fr = typeof window !== 'undefined' && new window.FileReader();

function getNewSecretKey() {
  let key = '';
  for (let i = 0; i < 32; i++) {
    const index = Math.floor(Math.random() * 93 + 33);
    key += String.fromCharCode(index);
  }
  return key;
}

/**
 * Encrypts a file and returns the private key used to encrypt the file
 * and the contents of the file.
 * @param {*} file the file to encrypt
 * @returns Promise: { key: <private key>, encryptedFile: <encrypted file contents> }
 */
export default async function encryptFile(file) {
  return new Promise((resolve) => {
    fr.onload = () => {
      const key = getNewSecretKey();
      const encryptedFile = AES.encrypt(fr.result, key);
      // const decryptedFile = AES.decrypt(encryptedFile, key).toString(enc.Utf8);
      resolve({ key, encryptedFile });
    };

    fr.readAsDataURL(file);
  });
}
