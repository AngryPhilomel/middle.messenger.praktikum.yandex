import styles from "./button.module.css";
// language=hbs

const buttonTmpl = () => `
    <button class="${styles["button"]}" type="{{type}}">{{text}}</button>
`;

export default buttonTmpl;
