var editor
$(document).ready(function () {
  editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    mode: 'javascript',
    autofocus: true
  })
  editor.getDoc().setValue(atob(decodeURI(window.location.search.substring(1))))
})
function run() {
  console.logOrig = console.log
  console.log = function (value) {
    $('#output').append(value + '\n')
  }
  $('#output').html('')
  try {
    eval(editor.getValue())
  } catch (err) {
    console.log(wrapError(err))
  }
  console.log = console.logOrig
}
function share() {
  var basePath = 'https://glvb.github.io/p/'
  var currValue = editor.getValue()
  if (currValue === '') {
    $('#share-link').val(basePath)
    return
  }
  $('#share-link').val(basePath + '?' + encodeURI(btoa(currValue)))
  $('#share-link').show()
  $('#share-link').select()
}
function wrapError(err) {
  return "<span class=\"error\">" + err + "</span>"
}