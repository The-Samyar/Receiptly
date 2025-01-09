import { IoClose } from "react-icons/io5";
import { FaCheck, FaWpforms } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FormStepOne } from './FormStepOne/FormStepOne';
import { FormStepTwo } from './FormStepTwo/FormStepTwo';
import { FormStepThree } from './FormStepThree/FormStepThree';
import { useFormContext } from "../../context/FormContext";
import styles from './Form.module.css';
import { useEffect } from "react";

export const Form = ({ setActiveCard, Receipt }) => {
    const { Step, goToStep, updateData, Data } = useFormContext();

    // Initialize data if not already set
    useEffect(() => {
        if (!Data.id && Receipt?.id) {
            updateData({ id: Receipt.id });
        }
    }, [Receipt, Data, updateData]);

    // Step change handler
    const changeStep = (value) => {
        goToStep(value);
    };

    // Close form callback
    const handleClose = () => {
        setActiveCard(false);
    };

    return (
        <div className={styles.addCard}>
            {/* Header Section */}
            <div className={styles.addCardHeader}>
                <div className={styles.addCardTitle}>
                    <h3>Your Receipt</h3>
                </div>
                <div className={styles.addCardClose} onClick={handleClose}>
                    <IoClose className={styles.closeIcon} />
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.addCardContent}>
                {/* Step Icons and Progress Bar */}
                <div className={styles.stepsIconsContainer}>
                    <div className={styles.stepProgressBar}>
                        <div className={`${styles.stepPack} ${styles.step1}`} onClick={() => changeStep(0)}>
                            <div className={styles.stepContainer}>
                                <FaWpforms className={styles.stepIcon} />
                            </div>
                            <div className={styles.stepTitle}>Receipt Detail</div>
                        </div>

                        <div className={`${styles.stepPack} ${styles.step2}`} onClick={() => changeStep(1)}>
                            <div className={styles.stepContainer}>
                                <FaListCheck className={styles.stepIcon} />
                            </div>
                            <div className={styles.stepTitle}>Products</div>
                        </div>

                        <div className={`${styles.stepPack} ${styles.step3}`} onClick={() => changeStep(2)}>
                            <div className={styles.stepContainer}>
                                <FaCheck className={styles.stepIcon} />
                            </div>
                            <div className={styles.stepTitle}>Receipt Summary</div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Step Content */}
                <div className={styles.CardContent}>
                    {Step === 0 && <FormStepOne Receipt={Receipt} />}
                    {Step === 1 && <FormStepTwo Receipt={Receipt} />}
                    {Step === 2 && <FormStepThree Receipt={Receipt} />}
                </div>
            </div>
        </div>
    );
};
