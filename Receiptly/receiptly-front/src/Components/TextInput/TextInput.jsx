import styles from './TextInput.module.css'

export const TextInput = ({ title, name, handler, placeholder, type = "text" }) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={`${name}`} className={styles.label}>
                {title}
            </label>
            <input
                type={type === "text" ? "text" : "password"}
                className={styles.input}
                name={`${name}`}
                id={`${name}`}
                onChange={handler}
                placeholder={`${placeholder}`}
                />
        </div>
    )
}
