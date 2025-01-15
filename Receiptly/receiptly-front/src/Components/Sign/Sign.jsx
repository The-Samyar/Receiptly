import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import styles from './Sign.module.css';
const Sign = ({ login }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.signCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{login ? "Sign In" : "Sign Up"}</h2>
                </div>

                <div className={styles.cardContent}>
                    {!login && <TextInput
                        title="First Name"
                        name="firstName"
                        placeholder="Enter your first name here" />}
                    {!login && <TextInput
                        title="Last Name"
                        name="lastName"
                        placeholder="Enter your last name here" />}
                    <TextInput
                        title="Username"
                        name="username"
                        placeholder="Enter your username here" />
                    <TextInput
                        title="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password here" />
                    {!login && <TextInput
                        title="Confirmation Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password here again" />}

                    <Button number={1} titleOne={login ? "Sign In" : "Sign Up"} />
                </div>
            </div>
        </div>

    )
}

export default Sign