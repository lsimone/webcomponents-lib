import { LitElement, html, customElement, property } from 'lit-element'
import style from './lit-element.scss'

@customElement('lit-element-counter')
export class Counter extends LitElement {
    @property({ type: Boolean }) edit = false
    @property({ type: Number }) count = false

    createRenderRoot() {
        return this
    }

    toggleInput () {
        this.edit = !this.edit
    }
    

    render() {
        return html`
            <div class="${style.count}" style="text-align:center" @click=${this.toggleInput}>
                ${this.edit ? html`<input value=${this.count} type="text">` : this.count }
            </div>
        `
    }
}
