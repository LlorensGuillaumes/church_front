const images = [];

function importAll(r) {
  r.keys().forEach((key) => images.push(r(key)));
}

importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export default images;
