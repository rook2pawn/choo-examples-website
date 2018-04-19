# nanocomponent nested buttons

```javascript
const Nanocomponent = require('nanocomponent')
const choo = require('choo')
const html = require('choo/html')

class Button extends Nanocomponent {
  constructor () {
    super()
    this.button = null
  }

  createElement (button) {
    // important we use a copy because if we change state
    // later we don't want that to effect this directly
    this.button = Object.assign({}, button)
    return html`
      <button style="background-color: ${button.backgroundColor}; color: ${button.color}">
        Click Me
      </button>
    `
  }

  update (newButton) {
    return newButton.backgroundColor !== this.button.backgroundColor
  }
}

class ButtonManager extends Nanocomponent {
  constructor () {
    super()
    this.buttons = null
  }

  createElement (buttons) {
    // this is done *once* because we have return false on update
    this.buttons = buttons.map((button) => new Button)
    return html`<div>${this.buttons.map((button,idx) => button.render(buttons[idx]))}</div>`
  }

  update (newButtons) {
    // render children
    newButtons.forEach((newButton,idx) => {
      this.buttons[idx].render(newButton)
    })
    return false;
  }
}


const mr = require('mrcolor');
const invert = require('invert-color');
const getColor = mr();
const getRandomColor = function() {
  var color = getColor().rgb();
  var foregroundColor= invert(color)
  var backgroundColor = `rgb(${color.join(',')})`;
  return {color:foregroundColor, backgroundColor}
}


var bm = new ButtonManager;
var app = choo()

function mainView (state, emit) {
  return html`<body>
  ${bm.render(state.buttons)}
  </body>`
}

app.use((state, emitter) => {
  state.buttons = Array(5).fill().map(() => getRandomColor());
  setInterval(() => {
    const index = ~~(Math.random()*state.buttons.length)
    const colorObj = getRandomColor();
    state.buttons[index].color = colorObj.color;
    state.buttons[index].backgroundColor = colorObj.backgroundColor;
    emitter.emit('render');
  }, 500)
})
app.route('/', mainView)
app.mount('body')
```
