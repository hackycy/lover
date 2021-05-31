import { App } from "vue"
import '@vant/touch-emulator'
import { Swipe, SwipeItem, Toast, Lazyload } from 'vant'

const components = [ Swipe, SwipeItem, Toast ]

export default {
  install: function(app: App) {
    // component
    components.forEach((comp) => {
      app.component(comp.name, comp)
    })
    app.use(Lazyload)
  }
}
