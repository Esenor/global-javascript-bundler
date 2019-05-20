export class Counter {
  constructor () {
    this.value = 0
  }

  addOne () {
    this.value++
  }

  getValue () {
    return this.value
  }

  reset () {
    this.value = 0
  }
}
