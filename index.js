module.exports = function ({ types: t }) {
  return {
    parserOverride: (code, parserOpts, parse) => {
      console.log('code, parserOpts, parse', code, parserOpts, parse)
      return {}
    }
  }
}