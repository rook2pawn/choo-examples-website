var html = require('choo/html')

const header = function(state, emit) {
  return html`
  <nav>
    <div class="nav-wrapper header">
    <div class="center brand-logo">Choo examples</div>
      <a href="#" class="brand-logo right"><img src="/assets/img/github.png"></a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="/nanocomponent">Nanocomponent</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
  `
}

module.exports = exports = header;
