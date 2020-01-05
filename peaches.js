$(document).ready(function() {
  $('#code').linedtextarea();
  $('#code').val(decodeURI(window.location.search.substring(1)))
})
console.logOrig = console.log
console.log = function(value) {
  var currValue = $('#output').text()
  $('#output').text(currValue + value + '\n')
}
function run() {
  $('#output').text('')
  try {
    eval($('#code').val())
  } catch(err) {
    console.log(err)
  }
}
function share() {
  alert(encodeURI(document.getElementById('code').value))
}