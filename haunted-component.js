import { html, component } from 'haunted'

console.log('hello mr haunted')

const Component = () => {
  return html`<h1>HAUNTED WORKS</h1>`
}

customElements.define(
  'haunted-component',
  component(Component, { useShadowDOM: false })
)

