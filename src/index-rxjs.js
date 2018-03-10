/**
 * RxJS kullanarak, anlık olarak en fazla 5 istek gönderen, 2 saniye içinde bitmezse iptal olan
 * bir stream örneği. Ağ isteklerini gene async olarak Promise kullanarak yapıyoruz. Promise'ler
 * iptal olamadığı için, script 2 saniyededn daha uzun sürebiliyor. Alternatif olarak `Rx.DOM.Ajax` kullanılabilir.
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
// rxjs kütüphanesini ekliyelim
const Rx = require('rxjs/Rx');
// kullanacağımız operatörleri alalım
const { mergeMap, takeUntil } = require('rxjs/operators');

// 2 saniye sonra başarı ile sonlanan bir promise.
const timeoutPromise = new Promise((resolve, reject) => setTimeout(resolve, 2000));
// sync benzeri kod yazabilmek için, async (promise döndüren) bir fonksiyon yazalım.
async function main(){
  // Dosya okuyan async kodu başlatalım, sonuctaki her bir satırı, dizi elemanı olarak alalım.
  const buffer = await readFilePromise('../data/ghibli_movies.txt');
  // idleri tutan dizimizi, rxjs stream'ine dönüştürelim.
  const movieIDs$ = Rx.Observable.from(convertFileBufferToIDArray(buffer));

  await movieIDs$.pipe(
    // her akıştan gelen veri için, verilen fonksiyondaki işlemi yap.
    mergeMap((movieID) =>
      // movieID için istek gönder, sonucu işle.
      request(`https://ghibliapi.herokuapp.com/films/${movieID}`).then(parseAndOutput),
      undefined,
      // aynı anda en fazla 5 promise bekliyor durumda olsun.
      5
    ),
    // timeoutPromise bitene kadar çalış!
    takeUntil(timeoutPromise)
  ).toPromise();

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, ve dönen promise değerinde sonuç ve hata olması durumunda, konsola çıktı ver.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
