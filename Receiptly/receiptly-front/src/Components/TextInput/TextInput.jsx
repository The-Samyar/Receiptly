import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ title, name, handler, placeholder, type = "text", ...rest }, ref) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name} className={styles.label}>
                {title}
            </label>
            <input
                type={type === "text" ? "text" : "password"}
                className={styles.input}
                ref={ref} // This allows react-hook-form to control the input
                name={name}
                id={name}
                onChange={handler}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}

export default React.forwardRef(TextInput);