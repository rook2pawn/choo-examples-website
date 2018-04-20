var html = require('choo/html')
var choo = require('choo')
const lib = require("./lib");
const css = require("sheetify")
const path = require("path")

css("./css/agate.css")
css("./css/materialize.min.css")
css("./css/style.css")

const header = require("./components/header");
var app = choo()
app.use((state,emit) => {
  state.route = "buttons"
  emit.on("DOMContentLoaded", () => {
  })
  /*
  emit.on("DOMContentLoaded", () => {
    console.log("DOMContentLoaded!")
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
  */
})
app.use((state, emitter) => {                  // 1.
  emitter.on('navigate', () => {               // 2.
    console.log(`Navigated to ${state.route}`) // 3.
  })
})

app.route(lib.getBaseRoute(), view)
app.route(path.join(lib.getBaseRoute(),'buttons'), buttonsView)
app.route(path.join(lib.getBaseRoute(),'input'), inputView)
app.route(path.join(lib.getBaseRoute(),'submit'), submitView)
app.mount('body')
//<pre><code class="hljs">${raw(hljs.highlight('javascript', foo, true).value)}</code></pre>

const buttonsComponent = require("./components/nested-buttons.js")(app)
const inputComponent = require("./components/input.js")(app)
const submitComponent = require("./components/submit.js")(app)

const articles = {}
articles[lib.getBase()] = buttonsComponent;
articles[path.join(lib.getBaseRoute(),'buttons')] = buttonsComponent;
articles[path.join(lib.getBaseRoute(),'input')] = inputComponent;
articles[path.join(lib.getBaseRoute(),'submit')] =  submitComponent;
console.log("Articles are:", articles);

const articleView = function(state,emit) {
  console.log("state route:", state.route)
  if (state.route == "/")
    state.route = path.join(lib.getBaseRoute(), "buttons")
  console.log("after state.route:", state.route)
  return html`<div>${articles[state.route].render(state,emit)}`
}
function view (state, emit) {
  return html`
    <body>
      <div class="container">
      ${header(state,emit)}
      ${articleView(state,emit)}
      </div>
    </body>
  `
}
function buttonsView (state, emit) {
  return html`
    <body>
      <div class="container">
      ${header(state,emit)}
      ${articleView(state,emit)}
      </div>
    </body>
  `
}
function inputView (state, emit) {
  return html`
    <body>
      <div class="container">
      ${header(state,emit)}
      ${articleView(state,emit)}
      </div>
    </body>
  `
}
function submitView(state, emit) {
  return html`
    <body>
      <div class="container">
      ${header(state,emit)}
      ${articleView(state,emit)}
      </div>
    </body>
  `
}
