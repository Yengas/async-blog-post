/**
 * İstek gönderen ve gelen isteği işleyip ekrana yazdıran promise zinciri oluşturarak...
 * Tüm ağ isteklerini aynı anda başlatmak.
 */

// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { convertFileBufferToIDArray, parseAndOutput, getDataFile } = require('./generic.js');
// node.js error-first callbackleri Promise'e çevirmemize yardımcı olan fonksiyon
const { promisify } = require('util');
// readFile error first async fonksiyonunu, promise döndürecek şekilde çeviriyoruz.
const readFilePromise = promisify(fs.readFile);
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  // Dosya okuyan async kodu başlatalım, sonuctaki her bir satırı, dizi elemanı olarak alalım.
  const buffer = await readFilePromise(getDataFile('ghibli_movies.txt'));
  const movieIDs = convertFileBufferToIDArray(buffer);

  // her bir movieID içiin istek gönderen ve sonucu işleyip yazdıran promise oluşturalım
  // Promise.all ile tüm promiseleri tek bir promise'e döndürüp, await ile bitmelerini bekleyelim.
  await Promise.all(
    // her bir movieID için...
    movieIDs.map((movieID) =>
      // istek gönder, promise döndürür.
      request(`https://ghibliapi.herokuapp.com/films/${movieID}`)
        // cevabı işleyip parselayan, void döndüren bir fonksiyon ile zincirleyelim.
        .then(parseAndOutput)
    )
  )

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, ve dönen promise değerinde sonuç ve hata olması durumunda, konsola çıktı ver.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
