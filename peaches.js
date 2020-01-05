$(document).ready(function() {
  $('#code').linedtextarea();
  $('#code').val(decodeURI(window.location.search.substring(1)))
})
console.logOrig = console.log
console.log = function(value) {
  var currVal = $('#output').val()
  $('#output').val(currVal + value + '\n')
}
function run() {
  $('#output').val('')
  eval($('#code').val())
}
function share() {
  alert(encodeURI(document.getElementById('code').value))
}
