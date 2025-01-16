import { useState } from 'react';
import { Button } from '../../Button/Button';
import { TextInput } from '../../TextInput/TextInput';
import styles from '../Sign.module.css';
const SignUp = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: ''
    });

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
                    <h2 className={styles.cardTitle}>Sign Up</h2>
                </div>

                <div className={styles.cardContent}>
                    <TextInput
                        title="First Name"
                        name="firstName"
                        placeholder="Enter your first name here"
                        handler={inputOnChange}
                    />
                    <TextInput
                        title="Last Name"
                        name="lastName"
                        placeholder="Enter your last name here"
                        handler={inputOnChange}
                    />
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
                    <TextInput
                        title="Confirmation Password"
                        type="password"
                        name="confirmedPassword"
                        placeholder="Enter your password here again"
                        handler={inputOnChange}
                    />

                    <Button number={1} titleOne="Sign Up" handlerOne={submitForm} />
                </div>
            </div>
        </div>

    )
}

export default SignUp