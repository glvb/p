var editor
$(document).ready(function () {
  editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    mode: 'javascript',
    autofocus: true,
    indentUnit: 4,
    indentWithTabs: true
  })
  var params = window.location.search.substring(1)
  if (params !== '') {
    var decompressed = LZString.decompressFromEncodedURIComponent(params)
    editor.getDoc().setValue(decompressed)
  }
  editor.on("changes", function() {
    $('#share-link:visible').hide()
  })
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
  var currValue = editor.getValue()
  var basePath = window.location.href.split('?')[0]
  if (currValue === '') {
    $('#share-link').val(basePath)
    return
  }
  $('#share-link').val(basePath + '?' + LZString.compressToEncodedURIComponent(currValue))
  $('#share-link').show()
  $('#share-link').select()
}
function wrapError(err) {
  return "<span class=\"error\">" + err + "</span>"
}