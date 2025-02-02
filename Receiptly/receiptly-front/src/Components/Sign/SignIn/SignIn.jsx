import { useState } from 'react';
import { Button } from '../../Button/Button';
import { TextInput } from '../../TextInput/TextInput';
import styles from '../Sign.module.css';
import {LOGIN} from '../../../GraphQL/Auth'
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const [user, setUser] = useState({ username: '', password: '' });
    const [tokenAuth, {loading, data, error}] = useMutation(LOGIN);

    const inputOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate()

    const submitForm = async() => {
        console.log(user)
        
        try {

            const result = await tokenAuth({
                variables: {
                    username: user.username,
                    password: user.password
                }
            })

            const data = result.data.tokenAuth

            if(data.success){
                const {token} = data.token
                localStorage.setItem('Access', token);
                alert("Successfully logged in")
                navigate("/")
            }
            
        } catch (error) {
            console.log("An error has occurred ", error.message)
        }
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