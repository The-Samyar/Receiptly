import { useContext } from 'react';
import { Button } from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';
import styles from '../Sign.module.css';
import { LOGIN } from '../../../GraphQL/Auth'
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


const SignIn = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const [tokenAuth, { loading, data, error }] = useMutation(LOGIN);
    const { setRefreshToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const submitForm = async (data) => {
        console.log(data)

        try {

            const result = await tokenAuth({
                variables: {
                    username: data.username,
                    password: data.password
                }
            })

            const responseData = result?.data?.tokenAuth

            if (responseData?.success) {
                const { token } = responseData?.token
                const { token: refreshToken } = responseData.refreshToken

                localStorage.setItem('Access', token);
                setRefreshToken(refreshToken)
                alert("Successfully logged in")
                navigate("/")
            }else{
                console.error(responseData?.errors || "Unknown error")
            }

        } catch (error) {
            console.log("An error has occurred ", error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className={styles.cardContainer}>
                <div className={styles.signCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Sign In</h2>
                    </div>

                    <div className={styles.cardContent}>
                        <div>
                            <TextInput
                                title="Username"
                                name="username"
                                placeholder="Enter your username here"
                                {...register("username")}
                            />
                            {errors.username && <div>{errors.username.message}</div>}
                        </div>
                        <div>
                            <TextInput
                                title="Password"
                                type="password"
                                name="password"
                                placeholder="Enter your password here"
                                {...register("password")}
                            />
                            {errors.password && <div>{errors.password.message}</div>}
                        </div>

                        <Button number={1} titleOne="Sign In" type="submit" disabled={loading} />
                    </div>
                </div>
            </div>
        </form>

    )
}

export default SignIn