import styles from './button.module.css'
//language=hbs
export default `
    <button class="${styles['button']}" type="{{type}}">{{text}}</button>
`