const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const format = require("../format");
const fs = require("fs")
const snippet = fs.readFileSync("./docs/input-with-nanocomponent.md", "utf8")
const lib = require("../lib");
const path = require("path")

class InputView extends Nanocomponent {
  constructor() {
    super()
    this.onInput = this.onInput.bind(this)
    this.emit;
  }
  onInput (e) {
    this.emit('update2', e.target.value)
  }
  createElement(state, emit) {
    this.emit = emit;
    return html`
    <div>
      <div class='experiment'>
      <h1>${state.title2}</h1>
      <input
        type="text"
        value="${state.title2}"
        oninput=${this.onInput} />
      </div>
      ${format(snippet)}
    </div>
    `
  }
  update(state) {
    let doUpdate = (state.route == (path.join(lib.getBaseRoute(),"input-with-nanocomponent")))
    return doUpdate
  }
}

const handler = (app) => {
  app.use((state, emitter) => {
    state.title2 = "Set the title"
    emitter.on('update2', function (title) {
      state.title2 = title;
      emitter.emit('render')
    })
  })
  return new InputView
}
module.exports = exports = handler
