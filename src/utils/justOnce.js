export const justOnce = (() => {
  let done = false
  return (fn) => {
    if (done) return
    fn()
    done = true
  }
})()
