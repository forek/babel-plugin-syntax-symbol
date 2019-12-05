# babel-plugin-syntax-symbol
Allow parsing of symbol literals like Ruby!

## Syntax
Symbol literals take the form of a colon before the literal.
```javascript
const foo = :abc
const baz = { [:def]: true }
console.log(baz[:def]) // true
```

## Install
```sh
npm install --save-dev babel-plugin-syntax-symbol
```

## Usage
### Via `.babelrc`

```json
{
  "plugins": ["babel-plugin-syntax-symbol"]
}
```

## Example

in
```javascript
const foo = :abc
const baz = { [:def]: true }
```

out
```javascript
const foo = Symbol.for("abc")
const baz = { [Symbol.for("def")]: true }
```

## Try it out!
[Demo](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAZiEMC8MBcBDARsAUKSWLDALxRgG9cYYBtNAEwFM4BdNGKAJwFcmYA_OgAe6dAE9cAX1xA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Cstage-2&prettier=false&targets=&version=7.7.4&externalPlugins=babel-plugin-syntax-symbol%400.0.1)

## Test

```sh
npm run test
```
