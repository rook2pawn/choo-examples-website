const getBase = function() {
  const isGithub = (window.location.host.indexOf('github') != -1)
  return isGithub ? "choo-examples" : "/"
}
const getBaseRoute = function() {
  const isGithub = (window.location.host.indexOf('github') != -1)
  return isGithub ? "choo-examples" : ""
}

exports.getBase = getBase;
exports.getBaseRoute = getBaseRoute;
