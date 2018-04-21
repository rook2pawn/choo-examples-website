const Nanocomponent = require('nanocomponent')
const html = require('choo/html')
const format = require("../format");
const fs = require("fs")
const snippet = fs.readFileSync("./docs/submit.md", "utf8")
const lib = require("../lib");
const path = require("path")

function confirmStore(state, emitter) {
  state.confirm = {
    button: "waiting"
  };
  emitter.on("maybe", function() {
    state.confirm.button = "confirm";
    emitter.emit("render");
  });

  emitter.on("cancel", function() {
    state.confirm.button = "waiting";
    state.submit.field = "";
    emitter.emit("render");
  });

  emitter.on("confirm", function() {
    state.confirm.button = "waiting";
    state.submit = {
      field: "",
      submitted: state.submit.field
    };
    emitter.emit("render");
  });
}

function submitStore(state, emitter) {
  state.submit = {
    field: "",
    submitted: ""
  };
  emitter.on("setField", function(value) {
    state.submit.field = value;
    emitter.emit("render");
  });
}
const Confirm = (state, emit) => {
  let isWaiting = (state.confirm.button === "waiting");
  if (isWaiting) {
    const isDisabled = state.submit.field == "";
    return html`
      <button onclick=${() => { emit("maybe") }} disabled=${isDisabled}>Submit</button>`;
  } else {
    return html`
      <span>
        <button onclick=${() => {
          emit("cancel");
        }}>Cancel</button>
        <button onclick=${() => {
          emit("confirm");
        }}>Confirm</button>
      </span>
    `;
  }
};
const Submission = (state, emit) => {
  const onChange = e => {
    emit("setField", e.target.value);
  };
  return html`
  <div>
    <input value="${state.submit.field}" oninput=${onChange}/>
    ${Confirm(state, emit)}
    <p>Submitted value: ${state.submit.submitted}</p>
  </div>
  `;
};


class SubmitView extends Nanocomponent {
  constructor() {
    super()

  }
  createElement(state,emit) {
    return html`<div>
      <div class="experiment">${Submission(state,emit)}</div>
      <div>${format(snippet)}</div>
    </div>`
  }
  update(state) {
    let doUpdate = (state.route == (path.join(lib.getBaseRoute(),"submit")))
    return doUpdate
  }
}

const handler = function(app) {
  app.use(submitStore)
  app.use(confirmStore)
  return new SubmitView
}
module.exports = exports = handler
