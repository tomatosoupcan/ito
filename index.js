randcol = Math.floor(Math.random() * 360);
const rp = [randcol, 49, 40]

function harmonize(hsl, start, end, interval) {
    colors = []
    h = hsl[0]
    s = hsl[1]
    l = hsl[2]

    for(let i = start; i <= end; i += interval) {
        const h1 = (h + i) % 360
        const c1 = [h1,s,l]
        colors.push(c1)
    }

    return colors
}

function hslToHex(hsl) {
  h = hsl[0]
  s = hsl[1]
  l = hsl[2]
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getWords() {
	words = []
	fetch('wordlist.csv')
	  .then(res => res.text()) // Gets the response and returns it as a blob
	  .then(blob => {
		const lines = blob.split("\r\n");
		const array = lines.map(line => line.split(","));
		array.pop()
		pick = Math.floor(Math.random() * array.length)
		words = array.slice()[pick]
		document.getElementById("word1").innerHTML = words[0]
		document.getElementById("word2").innerHTML = words[1]
	});
}

window.onload = function() {
  getWords()
  document.documentElement.style.setProperty("--startcolor",hslToHex(rp))
  out = harmonize(rp, 120, 240, 120)
  pick = Math.floor(Math.random() * out.length);
  outcolor = out[pick]
  document.documentElement.style.setProperty("--stopcolor",hslToHex(outcolor)) 
};
