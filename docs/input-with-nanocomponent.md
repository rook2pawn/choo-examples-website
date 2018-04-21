# input with nanocomponent

```javascript
const Nanocomponent = require('nanocomponent')
const choo = require('choo')
const html = require('choo/html')

var app = choo()
app.use((state, emitter) => {
  state.title = "Set the title"
  emitter.on('update', function (title) {
    state.title = title;
    emitter.emit('render')
  })
})
app.route('/', inputView)
app.mount('body')

class InputComponent extends Nanocomponent {
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
      <div class='experiment'>
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
    return true
  }
}

const myInput = new InputComponent
function inputView (state, emit) {
  return html`<div>myInput.render(state,emit)</div>`
}

```
