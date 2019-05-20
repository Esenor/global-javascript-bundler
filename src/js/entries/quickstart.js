const { Counter } = require('../counter')
const { onLoad } = require('../documentLoader')
//
onLoad(() => {
  //
  const foo = document.getElementById('foo')
  const button = document.getElementById('button')
  const resetButton = document.getElementById('reset-button')
  //
  const counter = new Counter()
  //
  const updateCounterText = () => {
    foo.innerText = `Counter value = ${counter.getValue()}`
  }
  //
  button.addEventListener('click', (event) => {
    counter.addOne()
    updateCounterText()
  })
  resetButton.addEventListener('click', (event) => {
    counter.reset()
    updateCounterText()
  })
  //
  updateCounterText()
})
