# babel-plugin-syntax-symbol
Allow parsing of symbol literals like Ruby!

## Syntax
Symbol syntax will call `Symbol.for` to create a `JS Symbol Object`. They are generated using the `:name` and `:"string"` literals syntax.

```javascript
// :name
const a = :abc
const b = { [:_def]: true }

// :"string"
const c = :"+123"
const d = :'1024'
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
const bar = :'+123'
const baz = { [:def]: true }

class Example {
  [:mySymbolKey] () {
    console.log('hello world')
  }
}
```

out
```javascript
const foo = Symbol.for("abc")
const bar = Symbol.for("+123")
const baz = { [Symbol.for("def")]: true }

class Example {
  [Symbol.for("mySymbolKey")] () {
    console.log('hello world')
  }
}
```

## Try it out!
[Demo of babel-plugin-syntax-symbol@0.0.7](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAZiEMC8MBcBDARsAUKSWLDAJxXQHIBqARgCYBmC_caGYgL3IG8YBtNABMApnAC6aGFBIBXYTAC-ufABsMECDACiADwwBbAA4r53XDH5p9ATwDK1_VhAqA0sOtiYACgCUMMxYWBBDOwgB0KiAA5l4UABbCKpEwAO4gJCqCFD7mirgKQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Cstage-2&prettier=false&targets=&version=7.7.4&externalPlugins=babel-plugin-syntax-symbol%400.0.7)

## ESLint
[Try to use with `babel-eslint@11.0.0-beta.1`](https://github.com/babel/babel-eslint#breaking-change-in-v11xx)

## Test

```sh
npm run test
```
