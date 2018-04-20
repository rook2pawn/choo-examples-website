const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const format = require("../format");
const fs = require("fs")
const snippet = fs.readFileSync("./docs/input.md", "utf8")


class InputView extends Nanocomponent {
  constructor() {
    super()
    this.onInput = this.onInput.bind(this)
    this.emit;
  }
  onInput (e) {
    this.emit('update', e.target.value)
  }
  createElement(state, emit) {
    this.emit = emit;
    return html`
    <div>
      <div>
      <h1>${state.title}</h1>
      <input
        type="text"
        value="${state.title}"
        oninput=${this.onInput} />
      </div>
      ${format(snippet)}
    </div>
    `
  }
  update(state) {
    let doUpdate = (state.route == "input")
    return doUpdate
  }
}

const handler = (app) => {
  app.use((state, emitter) => {
    state.title = "Set the title"
    emitter.on('update', function (title) {
      state.title = title;
      emitter.emit('render')
    })
  })
  return new InputView
}
module.exports = exports = handler
