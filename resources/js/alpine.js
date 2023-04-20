import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.store('sidebar', {
  isOpen: false,
  close() {
    this.isOpen = false
  },
})
