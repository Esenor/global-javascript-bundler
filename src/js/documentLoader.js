export function onLoad (fn) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('script loaded')
    fn()
  })
}
