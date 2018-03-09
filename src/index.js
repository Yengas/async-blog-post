// Sync olarak request yapmamızı sağlayacak, kütüphane.
const request = require('sync-request');
// bilgilerini almak istediğimiz filmin id'si.
const movieID = '2baf70d1-42bb-4437-b551-e5fed5a87abe';

// API'ye yaptığımız istek
const result = request('GET', `https://ghibliapi.herokuapp.com/films/${movieID}`);
// API'den gelen string cevabı, javascript objesini çevirmek için JSON parse işlemi
const body = JSON.parse(result.body.toString());
// obje içerisindeki title ve description değerlerinin, aynı isimle değişkene atanması.
const { title, description } = body;

// Artık sonucu ekrana yazdırabiliriz, umarız şimdiye kadar hata olmamıştır...
console.log(`Film Adı: ${title}`);
console.log(`Filmin açıklaması: ${description}`);
