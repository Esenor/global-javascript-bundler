class Foo {
  constructor () {
    console.log('constructed')
  }

  sayHello (name) {
    let b = () => { return 'hello' }
    console.log(`Hey ${b()}`, name)
  }
}

let a = new Foo()
a.sayHello('lorem ipsum')
