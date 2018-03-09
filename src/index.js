// Sync olarak request yapmamızı sağlayacak, kütüphane.
const request = require('sync-request');
// değerini almak istediğimiz crypto para
const cryptoCoin = 'btc';

// API'ye yaptığımız istek
const result = request('GET', `https://coinbin.org/${cryptoCoin}`);
// API'den gelen string cevabı, javascript objesini çevirmek için JSON parse işlemi
const body = JSON.parse(result.body.toString());

// Artık sonucu ekrana yazdırabiliriz, umarız hata yoktur.
console.log(`${cryptoCoin} fiyatı, şu anda ${body.coin.usd} USD!`);
