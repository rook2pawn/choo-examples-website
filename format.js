var raw = require('choo/html/raw')
var markdown = require('markdown-it')
var md = markdown({
  html: true
})
var hljs = require('highlight.js/lib/highlight')
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))

function highlighter (md, opts) {
  md.options.highlight = highlight
  var rules = md.renderer.rules
  rules.fence = wrap(rules.fence)
  rules.code_block = wrap(rules.code_block)

  function highlight (code, lang) {
    var result = null
    if (lang && hljs.getLanguage(lang)) {
      result = hljs.highlight(lang, code, true)
    } else {
      result = hljs.highlightAuto(code)
    }
    return result ? result.value : ''
  }

  function wrap (render) {
    return function () {
      return render.apply(this, arguments)
        .replace(/<code class="/g, '<code class="hljs ')
        .replace(/<code>/g, '<code class="hljs">')
    }
  }
}
md.use(highlighter)


function format(string) {
  return raw(md.render(string))
}

module.exports = exports = format;
