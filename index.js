const { types: tt } = require('@babel/parser/lib/tokenizer/types')
const { default: Parser } = require('@babel/parser/lib/parser')

try {
  for (let i = 0; i < process.argv.length; i++) {
    const item = process.argv[i]
    if (item.includes('eslint')) {
      const { tokTypes: babelParserTokTypes } = require('@babel/parser')
      Object.assign(babelParserTokTypes, tt)
      break
    }
  }
} catch (error) {
  console.error(error)
}

class ColonSymbolParser extends Parser {
  parseColonSymbol () {
    const node = this.startNode()
    this.next()
    if (this.match(tt.name) || this.match(tt.string)) {
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
  if (!t.TYPES.includes('ColonSymbolLiteral')) t.TYPES.push('ColonSymbolLiteral')

  return {
    parserOverride: (code, parserOpts = {}) => {
      const parser = new ColonSymbolParser(parserOpts, code)
      const ast = parser.parse()
      return ast
    },
    visitor: {
      Program (path) {
        path.traverse({
          ColonSymbolLiteral (path) {
            path.replaceWith(
              t.callExpression(
                t.memberExpression(t.Identifier('Symbol'), t.Identifier('for')),
                [t.stringLiteral(path.node.value)]
              )
            )
          }
        })
      }
    }
  }
}
