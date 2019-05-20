import { Counter } from '../counter'
import { onLoad } from '../documentLoader'
//
const foo = document.getElementById('foo')
const button = document.getElementById('button')
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
//
onLoad(() => {
  updateCounterText()
})
