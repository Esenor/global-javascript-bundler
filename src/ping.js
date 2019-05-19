module.exports = {
  ping: () => {
    console.log('ping')
    setTimeout(() => {
      console.log('pong')
    }, 500)
  }
}
