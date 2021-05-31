import { App } from "vue"
import '@vant/touch-emulator'
import { Swipe, SwipeItem, Toast, Lazyload } from 'vant'

import 'vant/es/swipe/style';
import 'vant/es/swipe-item/style'
import 'vant/es/toast/style'
import 'vant/es/lazyload/style'

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
