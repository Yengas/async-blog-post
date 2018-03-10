/**
 * Sync olarak tüm film id'lerinin işlenmesi.
 * Bu örnekte main fonksiyonu tüm network istekler bitene kadar, sonuçlar işlenip,
 * ekrana yazılanan kadar blokluyor. Async ile bunu nasıl iyileştirebileceğimizi konuştuk.
 */

// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { convertFileBufferToIDArray, parseAndOutput, getDataFile } = require('./generic.js');
// sync olarak istek yapmamızı sağlayacak olan kütüphanemizi alalım
const request = require('sync-request');

// normal bir fonksiyon olan main fonksiyonumuzu tanımlayalım.
function main(){
  // Dosya okuma işlemimizi sync olarak gerçekleştirelim.
  const buffer = fs.readFileSync(getDataFile('ghibli_movies.txt'));
  // Dönen buffer'ı işleyereke, film id'lerini bir diziye atıyalım.
  const movieIDs = convertFileBufferToIDArray(buffer);

  // her bir film id için...
  for(let movieID of movieIDs){
    // sync olarak istek gönderelim ve string cevabı `.body` ile alalım.
    const resultStr = request('GET', `https://ghibliapi.herokuapp.com/films/${movieID}`).body; 
    // sonucu işleyelim ve ekrana yazdıralım.
    parseAndOutput(resultStr);
  }

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, fonksiyon sync olduğu için; bitene kadar, başka hiçbir kod çalışamaz.
main();
// main fonksiyonunun bloklamadığını kanıtlamak için, ekrana yazı yazalım.
console.log('Main fonksiyonu çağrıldı!');
