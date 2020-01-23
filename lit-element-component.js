import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { LitElement, html } from 'lit-element'

console.log('hello mr lit-element')

class Component extends LitElement {
  static get properties() {
    return {
      start: { type: Number },
      end: { type: Number },
      __count: { type: Number }
    }
  }

  createRenderRoot() {
    return this
  }

  constructor() {
    super()
    this.end = 5
    console.warn(this, this.attributes.start, +this.getAttribute('start') || 0)
    this.__count = 0
    this.__changes = 0
  }

  connectedCallback() {
    super.connectedCallback()
    this.__count = this.start || this.__count
  }

  add () {
    this.__count++
    this.__changes++
    if (this.__count === this.end) {
      this.dispatchEvent(new CustomEvent('end', { detail: this.__changes}))
    }
  }

  subtract () {
    this.__count--
    this.__changes++
  }

  render() {
    console.log('render invoked', this.start)

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
        <div id="count" style="text-align:center">${this.__count}</div>
        <button type="button"  @click=${this.subtract}>&minus;</button>
        <button type="button"  @click=${this.add}>&plus;</button>
      </div>
    `
  }
}

customElements.define('lit-element-component', Component)
