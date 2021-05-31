import { App } from "vue"
import '@vant/touch-emulator'
import { Swipe, SwipeItem } from 'vant'

const components = [ Swipe, SwipeItem ]

export default {
  install: function(app: App) {
    components.forEach((comp) => {
      app.component(comp.name, comp)
    })
  }
}
