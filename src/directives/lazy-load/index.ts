import type { Directive } from 'vue'

const lazyLoad: Directive = {
  mounted (el, binding) {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return
    
      el.src = binding.value
      intersectionObserver.unobserve(el)
    })

    intersectionObserver.observe(el)
  }
}

export default lazyLoad