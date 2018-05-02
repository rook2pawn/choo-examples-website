const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const format = require("../format");
const fs = require("fs")
const snippet = fs.readFileSync("./docs/view-markdown.md", "utf8")
const lib = require("../lib");
const path = require("path")

class viewMarkdown extends Nanocomponent {
  constructor() {
    super()
    this.onInput = this.onInput.bind(this)
    this.emit;
  }
  onInput (e) {
    this.emit('updateMarkdown', e.target.value)
  }
  createElement(state, emit) {
    this.emit = emit;
    return html`
    <div>
      <div class='experiment'>
        <div class='row'>





          <div class='col s6'>
            <pre><code class='hljs'>
            ${format(state.markdownText)}
            </code></pre>
          </div>
          <div class='col s6'>
            <textarea style='margin-top:20px; height:360px;' oninput=${this.onInput}'>
            ${state.markdownText}
            </textarea>
          </div>









        </div>
      </div>
      ${format(snippet)}
    </div>
    `
  }
  update(state) {
    let doUpdate = (state.route == (path.join(lib.getBaseRoute(),"view-markdown")))
    return doUpdate
  }
}

const handler = (app) => {
  app.use((state, emitter) => {
    emitter.on('updateMarkdown', function(text) {
      state.markdownText = text;
      emitter.emit('render')
    })
    state.markdownText = `## Header 2

### A list

1. Lucy
2. Kouta
3. Nana



### Some code
Pretty sweet! Using \`markdown-it\` and \`highlight.js\`.
\`\`\`js
function double(num) { return num * 2 }
var x = double(3) + 5;
\`\`\`
`
  })
  return new viewMarkdown
}
module.exports = exports = handler
