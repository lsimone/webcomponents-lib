import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { LitElement, html } from 'lit-element'

console.log('hello mr lit-element')

class Component extends LitElement {

  createRenderRoot() {
    return this
  }

  render() {
    console.log('render invoked', this)
    return html`<h1>LIT-ELEMENT WORKS</h1>`
  }
}

customElements.define('lit-element-component', Component)
