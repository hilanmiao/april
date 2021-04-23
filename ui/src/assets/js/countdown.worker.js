self.onmessage = function (event) {
  const unit = event.data.unit || 1000
  var frequency = event.data.frequency;

  var T = setInterval(function () {

    if (frequency <= 0) {
      clearInterval(T);
      self.close();
      console.log('worker closed')
    }

    self.postMessage({ frequencyLeft: --frequency });

  }, unit);
}
