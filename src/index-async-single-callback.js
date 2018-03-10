/**
 * Tek bir async istek göndererek, callback ile işlem yapma örneği.
 */

// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { parseAndOutput } = require('./generic.js');
// callback döndürecek şekilde, istek yapmamımızı sağlayan kütüphane.
const request = require('request');

// normal bir fonksiyon, içerisinde callback ile çalışan bir fonksiyon çalıştıracağız.
function main(cb){
  const movieID = "58611129-2dbc-4a81-a72f-77ddfc1b1b49";

  return request(`https://ghibliapi.herokuapp.com/films/${movieID}`, (err, { body: resultStr }) => {
     if(err) return cb(err, null);

     parseAndOutput(resultStr);

     console.log('Main fonksiyonunun çalışması bitti.');
  });
}

// main fonksiyonunu çalıştır, işlemler bittiğini çalışması için bir callback ver.
main(function(err, result){
  // console.log(err || result);
  err ? console.log(err) : console.log(result);
});

// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
