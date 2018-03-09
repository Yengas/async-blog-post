// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// node.js error-first callbackleri Promise'e çevirmemize yardımcı olan fonksiyon
const { promisify } = require('util');
// readFile error first async fonksiyonunu, promise döndürecek şekilde çeviriyoruz.
const readFilePromise = promisify(fs.readFile);
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// verilen 
function convertFileBufferToIDArray(buffer){
  return buffer.toString().split('\n');
}

// verilen string'i json parse yaparak, film modeline çevirme işlemi.
function parseResponseToTitleAndDescription(resultStr){
  const body = JSON.parse(resultStr);
  return { title, description } = body;
}

// verilen başlık ve açıklamayı, konsola yazdırma
function outputMovieToConsole({ title, description }){
  console.log(`Film Adı: ${title}`);
  console.log(`Filmin açıklaması: ${description}`);
}

// string olarak gelen cevabı film modeline işle ve ekrana bastır.
function parseAndOutput(resultStr){
  const movie = parseResponseToTitleAndDescription(resultStr);
  return outputMovieToConsole(movie);
}

// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  // Dosya okuyan async kodu başlatalım, sonuctaki her bir satırı, dizi elemanı olarak alalım.
  const buffer = await readFilePromise('../data/ghibli_movies.txt');
  const movieIDs = convertFileBufferToIDArray(buffer);

  // Promise all kullanarak, aynı anda birden fazla async işlem başlatıp, hepsinin bitmesini bekleyebiliriz.
  // await ile bu işlemler bitmeden main fonksiyonunu sonlandırmak istemediğimiz söylüyoruz.
  await Promise.all(
      // her bir film id için,
      movieIDs.map((movieID) => 
        // async bir işlem başlat
        request(`https://ghibliapi.herokuapp.com/films/${movieID}`)
          // bu işlem bittikten sonra, sonucu işle ve ekrana yazdır.
          .then(parseAndOutput)
      )
  )

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, ve dönen promise değerinde sonuç ve hata olması durumunda, konsola çıktı ver.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
