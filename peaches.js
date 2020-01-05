$(document).ready(function() {
  $('#code').linedtextarea()
  $('#code').val(decodeURI(window.location.search.substring(1)))
})
console.logOrig = console.log
console.log = function(value) {
  $('#output').append(value)
  $('#output').append('\n')
}
function run() {
  $('#output').html('')
  try {
    eval($('#code').val())
  } catch(err) {
    console.log(wrapError(err))
  }
}
function share() {
  var path = window.location.href.split('?')[0]
  $('#share-link').val(path + '?' + encodeURI(document.getElementById('code').value))
  $('#share-link').show()
  $('#share-link').select()
}
function wrapError(err) {
  return "<span class=\"error\">" + err + "</span>"
}