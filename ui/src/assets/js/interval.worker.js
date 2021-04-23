self.onmessage = function (event) {
  const unit = event.data.unit || 1000

  var T = setInterval(function () {
    self.postMessage({date: new Date()});
  }, unit);
}
