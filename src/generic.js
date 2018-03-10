// verilen buffer'ı id dizisine çevirir.
function convertFileBufferToIDArray(buffer){
  return buffer.toString().split('\n');
}

// verilen string'i json parse yaparak, film modeline çevirme işlemi.
function parseResponseToTitleAndDescription(resultStr){
  const body = JSON.parse(resultStr);
  return { title, description } = body;
}

// verilen başlık ve açıklamayı, konsola yazdırma
function outputMovieToConsole({ title, description }){
  console.log(`Film Adı: ${title}`);
  console.log(`Filmin açıklaması: ${description}`);
}

// string olarak gelen cevabı film modeline işle ve ekrana bastır.
function parseAndOutput(resultStr){
  const movie = parseResponseToTitleAndDescription(resultStr);
  return outputMovieToConsole(movie);
}

module.exports = {
  convertFileBufferToIDArray,
  parseAndOutput
};
