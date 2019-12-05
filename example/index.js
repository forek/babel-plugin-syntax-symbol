const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const plugin = require('../index.js');

const code = fs.readFileSync(path.join(__dirname, './code.js'), { encoding: 'utf8' });

babel.transform(code, {
  presets: ['@babel/preset-env'],
  plugins: [
    [plugin, {}]
  ]
}, function(err, result) {
  if (err) return console.error(err);

  console.log('\n\033[01;34minput - code: \033[0m\n');
  console.log(code)
  console.log('\n\033[01;34mresult - code: \033[0m\n');
  console.log(result.code);
  console.log('\n\033[01;34mend.\033[0m\n');
});
