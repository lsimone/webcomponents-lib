import { html } from 'lit-element'
import style from './lit-element-colors.scss'

export const banner = (text: string, theme: 'dark'|'light' = 'dark') => {
    const background = style[theme === 'dark' ? 'bgDark' : 'bgLight']
    const color = style[theme === 'dark' ? 'clLight' : 'clDark']
    return html`
            <h1 class="${color} ${background}">${text}</h1>
    `
}

