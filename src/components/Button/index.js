import styles from "./Button.module.css";

export default function Button({ id, colorStyle, type, children, onClick=((event) => {}), ...dataAttr }) {
    
    return (
        <button id={id} className={`btn btn-${colorStyle} ${styles["btn"]}`} type={type} onClick={
            (event) => onClick(event) 
        } {...dataAttr}>{children}</button>
    );
}