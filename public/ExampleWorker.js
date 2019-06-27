self.onmessage = function (e) {
  let capitalString = ''
  for (c in e.data) {
    capitalString += e.data[c].toUpperCase()
  }

  postMessage(capitalString)
}
