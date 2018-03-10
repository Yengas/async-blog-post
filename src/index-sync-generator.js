/**
 * Generator kullanarak, sync işlemler arasına farklı işlemler sıkıştırma örneği.
 * Durdurulabilir bir fonksiyon olarak, sync kodumuzu yeniden yazdık.
 */

// Dosya okumak için node.js kütüphanemizi alalım.
const fs = require('fs');
// uygulamamızın çalışmasına yardımcı olacak ortak fonksiyonları alalım.
const { convertFileBufferToIDArray, parseAndOutput } = require('./generic.js');
// promise döndürecek şekilde async istek yapmamızı sağlayacak olan kütüphane.
const request = require('sync-request');

// adım adım çalışan generator kodu yazmak için fonksiyonu * işareti ile generater olarak tanımlayalım.
function* main(){
  // Dosya okuyan sync kodumuzu başlatalım.
  const buffer = fs.readFileSync('../data/ghibli_movies.txt');
  // Geri dönen buffer cevabını film id dizisine çevirelim.
  const movieIDs = convertFileBufferToIDArray(buffer);

  // her bir film id'si için...
  for(let movieID of movieIDs){
    // istek gönderelim,
    const resultStr = request('GET', `https://ghibliapi.herokuapp.com/films/${movieID}`).body; 
    // tek bir işlemi tamamladığımıza dair yield verelim. `.next` ile çağrıldığını varsayarsak, program buraya kadar çalışacak 
    // ve bir sonraki `.next` çağrılana kadar diğer işlemlere edevam etmeyecek.
    yield parseAndOutput(resultStr);
  }

  console.log('Main fonksiyonunun çalışması bitti.');
}

// main fonksiyonunu çalıştır, fonksiyon generator olduğu için, döngü ile işlememiz gerekli.
for(let result of main()){
  console.log('------- Her bir yield arasında kod çalıştırabiliyoruz! -------');
}
// main fonksiyonunun blokladığını kanıtlayalım...
console.log('Main fonksiyonu çağrıldı!');
