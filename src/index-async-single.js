/**
 * Tek bir async network isteği yapıp, sonucu işlemek ve ekrana yazdırmak.
 */

// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { parseAndOutput } = require('./generic.js');
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  const movieID = "58611129-2dbc-4a81-a72f-77ddfc1b1b49";

  // tek bir istek gönderelim
  const resultStr = await request(`https://ghibliapi.herokuapp.com/films/${movieID}`) 
  // dönen cevabı işleyelim ve ekrana yazdıralım.
  parseAndOutput(resultStr);

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, dönen promise'in başarılı veya başarısız bitmesi sonucunda ekrana yazdır.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
