/* global describe, it */

const { Counter } = require('../../src/js/counter')
const expect = require('chai').expect

describe('Counter class test:', () => {
  for (let i = 0; i < 20; i++) {
    if (i === 0) {
      it('counter value should start at 0', () => {
        let counter = new Counter()
        expect(counter.getValue()).to.equal(0)
      })
    } else {
      it(`counter value should equal ${i} after ${i} "click"`, () => {
        let counter = new Counter()
        for (let j = 0; j < i; j++) {
          counter.addOne()
        }
        expect(counter.getValue()).to.equal(i)
      })
    }
  }
})
