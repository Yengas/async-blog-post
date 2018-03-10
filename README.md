# Async Blog Post
Bu proje, Node.JS ve async üzerine yazdığım blog post'umda kullandığım kod örneklerinin, düzenlenmiş ve çalışır hale getirilmiş versiyonlarını içermektedir.

Blog postumu okumak isterseniz, [buradan erişebilirsiniz](https://yengas.github.io/tr/nodejs-async/).

## Problem
[data/ghibli_movies.txt](./data/ghibli_movies.txt) dosyasında film idleri bulunmaktadır. Bizden istenen, her bir film id'si için, filmin başlığını ve açıklamasını, konsola yazdırmamız. 

## Örnekler
- Tek bir film id'sini bloklayan, sync bir şekilde yazdırmak: `node src/index-sync-single.js` 
- Tüm film idlerini bloklayan, sync bir şekilde ekrana yazdırmak: `node src/index-sync.js`
- Generator kullanarak, her bir film id'si için yield yapacak şekilde yazdırmak: `node src/index-sync-generator.js`
- Async olarak, callback kullanarak, tek bir filmi yazdırmak: `node src/index-async-single-callback.js`
- Async olarak, promise kullanarak tek bir filmi yazdırmak: `node src/index-async-single-promise.js`
- Async olarak, async/await kullanarak tek bir filmi yazdırmak: `node src/index-async-single.js`
- Async olarak, tüm filmleri sıra sıra istek gönderip, işleyerek ekrana yazdırmak `node src/index-async.js`
- Async olarak, async/await ve promise karışımı kullanarak, tüm istekleri aynı anda başlatmak. `node src/index-async-all.js`
- Async olarak, film id'leri stream olarak kabul edip, iptal edilebilir ve max concurrency sınırlandırılmış şekilde RxJS ile işlem yapmak: `node src/index-rxjs.js`
