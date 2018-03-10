/**
 * Tek bir async istek gönderip, cevabı işleme ve ekrana yazdırma örneği.
 * Async/Await keywordü kullanmak yerine, standart promise döndürüyoruz.
 */

// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { parseAndOutput } = require('./generic.js');
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('request-promise-native');

// normal bir fonksiyon, içerisinde promise döndüreceğiz.
function main(){
  const movieID = "58611129-2dbc-4a81-a72f-77ddfc1b1b49";

  return request(`https://ghibliapi.herokuapp.com/films/${movieID}`) 
    .then(parseAndOutput)
    .then(() => console.log('Main fonksiyonunun çalışması bitti.'));
}

// main fonksiyonunu çalıştır, dönen promise'in başarılı veya başarısız bitmesi durumunda, konsola yazdır.
main().then(console.log, console.log);
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
