import request from 'superagent';

export default function getDataWithId(id) {
  return new Promise((resolve) => {
    return resolve({
      contractAddres: '0x123',
      url: 'http://www.google.com',
      price: 100,
    });
  });
}
