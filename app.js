var html = require('choo/html')
var raw = require('choo/html/raw')
var choo = require('choo')
var markdown = require('markdown-it')
var md = markdown({
  html: true
})
var hljs = require('highlight.js/lib/highlight')
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
const fs = require("fs")
const foo = fs.readFileSync("./bm.js", "utf8");
const snippet = fs.readFileSync("./docs/nanocomponent-nested-buttons.md", "utf8")
const css = require("sheetify")

css("./css/agate.css")
css("./css/materialize.min.css")
css("./css/style.css")

const header = require("./components/header");

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
var app = choo()

app.use((state,emit) => {
  emit.on("DOMContentLoaded", () => {
    if(typeof(Storage) !== "undefined") {
      if (sessionStorage.state) {
          let sessionState = JSON.parse(sessionStorage.state)
          Object.assign(state, sessionState)
      }
      emit.on('saveState', () => {
        sessionStorage.state = JSON.stringify(state) ;
      })
    }
    emit.emit("render")
  })
})


app.route('/', view)
app.mount('body')

//<pre><code class="hljs">${raw(hljs.highlight('javascript', foo, true).value)}</code></pre>

function view (state, emit) {
  return html`
    <body>
      <div class="container">
      ${header(state,emit)}
      ${raw(md.render(snippet))}
      </div>
    </body>
  `
}
