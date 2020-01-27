import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { LitElement, html, customElement, property } from 'lit-element'
import './lit-element.global.scss'
import bootstrap from 'bootstrap/scss/bootstrap.scss'
import './lit-element-sub'
import { banner } from './lit-element.view'

console.log('hello mr lit-element!')

@customElement('lit-element-component')
export class Component extends LitElement {
    @property({ type: Number }) end = 5
    @property({ type: Number }) __count = 0
    @property({ type: Number }) __changes = 0
    @property({ type: Number }) start = 0
    @property({ type: String }) heading = 'Inside the component'

    createRenderRoot() {
        return this
    }

    connectedCallback() {
        super.connectedCallback()
        this.__count = this.start || this.__count
    }

    add() {
        this.__count++
        this.__changes++
        if (this.__count === this.end) {
            this.dispatchEvent(
                new CustomEvent('end', { detail: this.__changes })
            )
        }
    }

    subtract() {
        this.__count--
        this.__changes++
    }

    render() {
        console.log('render invoked', this.start)

        return html`
            <style>
                /* avoid to use this. Better use sass modules */
                button {
                    line-height: 20px;
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin: 30px 5px 5px 5px;
                    width: 35px;
                    font-size: 20px;
                }
            </style>
            <div @click=${() => (this.heading += '!')}>
                ${banner(
                    this.heading,
                    this.heading.length % 2 ? 'dark' : 'light'
                )}
            </div>
            <div
                style="border:1px solid #ccc;width:100px;padding:20px;font-size:20px;"
            >
                <lit-element-counter
                    count=${this.__count}
                ></lit-element-counter>
                <button
                    type="button"
                    class="${bootstrap.btn}"
                    @click=${this.subtract}
                >
                    &minus;
                </button>
                <button
                    type="button"
                    class="${bootstrap.btn}"
                    @click=${this.add}
                >
                    &plus;
                </button>
            </div>
        `
    }
}

// customElements.define('lit-element-component', Component)
