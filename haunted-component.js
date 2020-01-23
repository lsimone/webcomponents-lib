// FULL FEATURED COMPONENT: STATE, PROPERTIES, EVENTS, UPDATES!

import '@babel/polyfill'
// import "@webcomponents/webcomponentsjs/webcomponents-bundle";
// import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { html, component, useState } from 'haunted'

console.log('hello mr haunted')

function Component({start, end}) {
  start = parseInt(start)
  end = parseInt(end)
  const [count, setCount] = useState(start)
  const [changes, setChanges] = useState(0)

  const add = () => {
    setCount(count + 1)
    setChanges(changes + 1)
    if (count + 1 === end) {
      this.dispatchEvent(new CustomEvent('end', {bubbles: true, composed: true, detail: {changes: changes + 1}}))
    }
  }

  const subtract = () => {
    setCount(count - 1)
    setChanges(changes + 1)
  }

  console.warn('start & end', start, end)


  return html`
    <style>
      button{
        line-height:20px;
        border:1px solid #ddd;
        padding:10px;
        margin:30px 5px 5px 5px;
        width:35px;
        font-size:20px;
      }
    </style>
    <div style="border:1px solid #ccc;width:100px;padding:20px;font-size:20px;">
      <div id="count" style="text-align:center">${count}</div>
      <button type="button"  @click=${subtract}>&minus;</button>
      <button type="button"  @click=${add}>&plus;</button>
    </div>
  `
}


const loadShim = () => new Promise((resolve, reject) => {
  let docHead = document.getElementsByTagName('head')[0]
  let script = document.createElement('script')
  script.type = 'text/javascript'
  // script.src = 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js'
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.1/custom-elements-es5-adapter.js'
  script.onload = resolve
  docHead.appendChild(script)
})

loadShim().then(() => {
  console.warn('Shim loaded', customElements)
  // require('lib/userProfile.js')
  
  customElements.define(
    'haunted-component',
    component(Component, { 
      useShadowDOM: false,
      observedAttributes: ['start', 'end']
    })
  )
})

// customElements.define(
//   'haunted-component',
//   component(Component, { 
//     useShadowDOM: false,
//     observedAttributes: ['start', 'end']
//   })
// )