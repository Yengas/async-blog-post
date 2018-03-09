// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// Sync olarak request yapmamızı sağlayacak, kütüphane.
const request = require('sync-request');
// Tüm film id'lerini, dosyamızı okuyarak ve '\n' karakterinden split yaparak, bir diziye atıyalım.
const movieIDs = fs.readFileSync('../data/ghibli_movies.txt').toString().split('\n');

for(let movieID of movieIDs){
  // API'ye yaptığımız istek
  const result = request('GET', `https://ghibliapi.herokuapp.com/films/${movieID}`);
  // API'den gelen string cevabı, javascript objesini çevirmek için JSON parse işlemi
  const body = JSON.parse(result.body.toString());
  // obje içerisindeki title ve description değerlerinin, aynı isimle değişkene atanması.
  const { title, description } = body;

  // Artık sonucu ekrana yazdırabiliriz, umarız şimdiye kadar hata olmamıştır...
  console.log(`Film Adı: ${title}`);
  console.log(`Filmin açıklaması: ${description}`);
}
