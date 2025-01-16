import styles from './Button.module.css'

export const Button = ({ number, titleOne, titleTwo, handlerOne, handlerTwo }) => {
  return (
    <div className={number === 1 ? styles.singleButtonContainer : styles.ButtonContainer}>
      <button className={styles.formButton} onClick={handlerOne}>
        {titleOne}
      </button>
      
      {number === 2 && <button className={styles.formButton}>{titleTwo}</button>}
    </div>
  )
}
