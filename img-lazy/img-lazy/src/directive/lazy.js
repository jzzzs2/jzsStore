export default {
  mounted(el) {
    console.log("触发了")
    let src = el.src
    el.src = ""
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      // console.log(entries,"entries")
      if (isIntersecting) {
        el.src = src
        observer.unobserve(el)
      }
    })
    observer.observe(el)
  }
}