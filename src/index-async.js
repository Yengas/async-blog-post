/**
 * Async/Await anahtar kelimeleri kullanılarak,
 * Async olarak istek gönderip, daha sonra cevabı işleyip ekrana yazdırdıktan sonra...
 * bir sonraki async isteği başlatmak.
 */

// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { convertFileBufferToIDArray, parseAndOutput } = require('./generic.js');
// node.js error-first callbackleri Promise'e çevirmemize yardımcı olan fonksiyon
const { promisify } = require('util');
// readFile error first async fonksiyonunu, promise döndürecek şekilde çeviriyoruz.
const readFilePromise = promisify(fs.readFile);
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  // Dosya okuyan async kodu başlatalım, sonuctaki her bir satırı, dizi elemanı olarak alalım.
  const buffer = await readFilePromise('../data/ghibli_movies.txt');
  const movieIDs = convertFileBufferToIDArray(buffer);

  for(let movieID of movieIDs){
    // istek gönder ve async olarak bitmesini bekle.
    const resultStr = await request(`https://ghibliapi.herokuapp.com/films/${movieID}`);
    // sonucu işle ve ekrana yazdır.
    parseAndOutput(resultStr);
  }

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, ve dönen promise değerinde sonuç ve hata olması durumunda, konsola çıktı ver.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
