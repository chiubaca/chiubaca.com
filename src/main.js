// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import "@/assets/styles/main.scss"
import "prismjs/themes/prism-tomorrow.css"

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.script.push(
    { src: "//gc.zgo.at/count.js", "data-goatcounter": `https://chiubaca.goatcounter.com/count`, async: true, defer: true }
  )

}
