// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// node.js error-first callbackleri Promise'e çevirmemize yardımcı olan fonksiyon
const { promisify } = require('util');
// readFile error first async fonksiyonunu, promise döndürecek şekilde çeviriyoruz.
const readFilePromise = promisify(fs.readFile);
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  // Dosya okuyan async kodu başlatalım, sonuctaki her bir satırı, dizi elemanı olarak alalım.
  const movieIDs = (await readFilePromise('../data/ghibli_movies.txt')).toString().split('\n');

  // Her bir dizi elemanı için async olarak istek gönderelim.
  for(let movieID of movieIDs){
    // API'ye yaptığımız istek
    const resultStr = await request(`https://ghibliapi.herokuapp.com/films/${movieID}`);
    // API'den gelen string cevabı, javascript objesini çevirmek için JSON parse işlemi
    const body = JSON.parse(resultStr);
    // obje içerisindeki title ve description değerlerinin, aynı isimle değişkene atanması.
    const { title, description } = body;

    // Artık sonucu ekrana yazdırabiliriz.
    console.log(`Film Adı: ${title}`);
    console.log(`Filmin açıklaması: ${description}`);
  }
}

// main fonksiyonunu çalıştır, ve dönen promise değerinde sonuç ve hata olması durumunda, konsola çıktı ver.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
