const fs = require('fs');
const text = fs.readFileSync('temp_text.txt', 'utf8');
const words = text.split(/\s+/).filter(w => w.length > 0);
let result = '';
let count = 0;
// Group every 5 words to be safe
for(let i=0; i<words.length; i+=5) {
  const chunk = words.slice(i, i+5).join('\u00A0');
  result += chunk + ' ';
  count++;
}
fs.writeFileSync('processed_text.txt', result);
console.log('New "word" count:', count);
