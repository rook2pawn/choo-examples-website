const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const format = require("../format")
const lib = require("../lib");
const path = require("path")

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
    return html`<div style="margin-top:2em;">${this.buttons.map((button,idx) => button.render(buttons[idx]))}</div>`
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

const fs = require("fs")
const snippet = fs.readFileSync("./docs/nanocomponent-nested-buttons.md", "utf8")

class ButtonsView extends Nanocomponent {
  constructor () {
    super();
    this.emit;
    this.timer;
    this.buttons;
  }
  createElement (state, emit) {
    this.emit = emit;
    this.buttons = state.buttons;
    return html`<div>
    ${bm.render(state.buttons)}
    ${format(snippet)}
    </div>`
  }
  update (state) {
    let doUpdate = (state.route == (path.join(lib.getBaseRoute(),"buttons")))
    return doUpdate
  }
  load () {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      const index = ~~(Math.random()*this.buttons.length)
      const colorObj = getRandomColor();
      this.buttons[index].color = colorObj.color;
      this.buttons[index].backgroundColor = colorObj.backgroundColor;
      this.emit('render');
    }, 500)

  }
  unload() {
    clearInterval(this.timer)
  }
}

const handler = (app) => {

  app.use((state, emitter) => {
    state.buttons = Array(5).fill().map(() => getRandomColor());
  })
  return new ButtonsView
}
module.exports = exports = handler
