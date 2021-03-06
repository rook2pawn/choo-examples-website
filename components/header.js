var html = require('choo/html')

const header = function(state, emit) {
  return html`
  <div>
  <nav>
    <div class="nav-wrapper header">
    <div class="center brand-logo">Choo examples</div>
      <a href="https://github.com/rook2pawn/choo-examples" class="brand-logo right"><img src="assets/img/github.png"></a>
    </div>
    <div>
      <ul style="background-color:#71a2cc;" class="left">
        <li class='${state.route == 'submit' ? 'active' : ''}'> <a href="#submit">Submit Confirm</a></li>
        <li class='${state.route == 'buttons' ? 'active' : ''}'> <a href="#buttons">Nanocomponent Buttons</a></li>
        <li class='${state.route == 'input' ? 'active' : ''}'> <a href="#input">input</a></li>
        <li class='${state.route == 'input-with-nanocomponent' ? 'active' : ''}'> <a href="#input-with-nanocomponent">input-with-nanocomponent</a></li>
        <li class='${state.route == 'view-markdown' ? 'active' : ''}'> <a href="#view-markdown">how to view markdown</a></li>
      </ul>
    </div>
  </nav>
    <div class="clear"></div>

  </div>
  `
}

module.exports = exports = header;
