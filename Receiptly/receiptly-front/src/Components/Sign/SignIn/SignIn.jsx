import { useState } from 'react';
import { Button } from '../../Button/Button';
import { TextInput } from '../../TextInput/TextInput';
import styles from '../Sign.module.css';


const SignIn = () => {

    const [user, setUser] = useState({ username: '', password: '' });

    const inputOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submitForm = () => {
        console.log(user)
        /* setUser({username: '', password: ''}) */
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.signCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Sign In</h2>
                </div>

                <div className={styles.cardContent}>
                    <TextInput
                        title="Username"
                        name="username"
                        placeholder="Enter your username here"
                        handler={inputOnChange}
                    />
                    <TextInput
                        title="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password here"
                        handler={inputOnChange}
                    />

                    <Button number={1} titleOne="Sign In" handlerOne={submitForm} />
                </div>
            </div>
        </div>

    )
}

export default SignIn