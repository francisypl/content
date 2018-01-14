/**
 * Encrypts a file and returns the private key used to encrypt the file
 * and the contents of the file.
 * @param {*} file the file to encrypt
 * @returns { key: <private key>, encryptedFile: <encrypted file contents> }
 */
export default function encryptFile(file) {
  console.log('file =>', file);
  return { key: '', encryptedFile: '' };
}
