/**
 * Tek bir bloklayan, sync istek örneği. Ağ isteği sonlanana ve sonuç işlenip,
 * ekrana yazdırılana kadar main fonksiyonu blokluyor. Async ile bunu nasıl iyileştirebileceğimizi konuştuk.
 */

// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { parseAndOutput } = require('./generic.js');
// sync olarak istek yapmamızı sağlayacak olan kütüphanemizi alalım
const request = require('sync-request');

// normal bir fonksiyon olan main fonksiyonumuzu tanımlayalım.
function main(){
  const movieID = "58611129-2dbc-4a81-a72f-77ddfc1b1b49";

  // sync olarak istek gönderelim ve string cevabı `.body` ile alalım.
  const resultStr = request('GET', `https://ghibliapi.herokuapp.com/films/${movieID}`).body; 
  // sonucu işleyelim ve ekrana yazdıralım.
  parseAndOutput(resultStr);

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, fonksiyon sync olduğu için; bitene kadar, başka hiçbir kod çalışamaz.
main();
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
