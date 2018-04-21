var html = require('choo/html')

const footer = function(state, emit) {
  return html`

<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">Choo Examples by rook2pawn</h5>
        <p class="grey-text text-lighten-4">Get quick examples.</p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="white-text">Other useful resources</h5>
        <ul>
          <li><a class="grey-text text-lighten-3" href="https://handbook.choo.io/">Choo Handbook</a></li>
          <li><a class="grey-text text-lighten-3" href="https://choo.io/docs">Choo Docs</a></li>
          <li><a class="grey-text text-lighten-3" href="https://github.com/choojs/nanocomponent">nanocomponent</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
    MIT LICENSE
    <a class="grey-text text-lighten-4 right" href="https://github.com/rook2pawn/choo-examples">Repository</a>
    </div>
  </div>
</footer>
  `
}

module.exports = exports = footer;
