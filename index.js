const { Parser, tokTypes: tt } = require('babel-parser-utils')

class ColonSymbolParser extends Parser {
  parseColonSymbol () {
    const node = this.startNode()
    this.next()
    if (this.match(tt.name)) {
      node.value = this.state.value
      this.next()
      this.finishNode(node, 'ColonSymbolLiteral')
      return node
    } else {
      this.unexpected(this.state.start)
    }
  }

  parseExprAtom () {
    if (this.match(tt.colon)) {
      return this.parseColonSymbol()
    } else {
      return super.parseExprAtom(...arguments)
    }
  }
}

module.exports = function ({ types: t }) {
  t.TYPES.push('ColonSymbolLiteral')

  return {
    parserOverride: (code, parserOpts = {}) => {
      const parser = new ColonSymbolParser(parserOpts, code)
      return parser.parse()
    },
    visitor: {
      ColonSymbolLiteral (path) {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.Identifier('Symbol'),
              t.Identifier('for')
            ),
            [t.stringLiteral(path.node.value)]
          )
        )
      }
    }
  }
}