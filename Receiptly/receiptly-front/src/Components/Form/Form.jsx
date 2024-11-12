import { IoClose } from "react-icons/io5"
import { useState } from "react";
import styles from './Form.module.css'
import { FaCheck, FaWpforms } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import {FormStepOne} from './FormStepOne/FormStepOne'
import {FormStepTwo} from './FormStepTwo/FormStepTwo'
import {FormStepThree} from './FormStepThree/FormStepThree'


export const Form = ({ setActiveCard, Receipt }) => {
    const CardCallback = (value) => {
        setActiveCard(value);
    }

    const changeStep = (value) => {
        setStep(value)
    }

    const [Step, setStep] = useState(0)

    return (
        <div className={styles.addCard}>
            <div className={styles.addCardHeader}>
                <div className={styles.addCardTitle}>
                    <h3>Your Receipt</h3>
                </div>
                <div className={styles.addCardClose} onClick={() => CardCallback(false)}>
                    <IoClose className={styles.closeIcon} />
                </div>
            </div>

            <div className={styles.addCardContent}>
                <div className={styles.stepsIconsContainer}>
                    <div className={styles.stepProgressBar}>

                        <div className={`${styles.stepPack} ${styles.step1}`}>
                            <div className={`${styles.stepContainer}`} onClick={() => changeStep(0)}>
                                <FaWpforms className={`${styles.stepIcon}`} />
                            </div>
                            <div className={styles.stepTitle}>Step one</div>
                        </div>

                        <div className={`${styles.stepPack} ${styles.step2}`} >
                            <div className={`${styles.stepContainer}`} onClick={() => changeStep(1)}>
                                <FaListCheck className={`${styles.stepIcon}`} />
                            </div>
                            <div className={styles.stepTitle}>Step Two</div>
                        </div>

                        <div className={`${styles.stepPack} ${styles.step3}`}>
                            <div className={`${styles.stepContainer}`} onClick={() => changeStep(2)}>
                                <FaCheck className={`${styles.stepIcon}`} />
                            </div>
                            <div className={styles.stepTitle}>Step Three</div>
                        </div>
                    </div>
                </div>

                <div className={styles.CardContent}>
                    {
                        Step === 0 && <FormStepOne /> 
                    }
                    {
                        Step === 1 && <FormStepTwo /> 
                    }
                    {
                        Step === 2 && <FormStepThree /> 
                    }
                </div>
            </div>
        </div>
    )
}
