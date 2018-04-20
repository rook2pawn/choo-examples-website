var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/dist')

var server = http.createServer(ecstatic)

server.listen(5250, function () {
  console.log('listening on port 5250')
})
