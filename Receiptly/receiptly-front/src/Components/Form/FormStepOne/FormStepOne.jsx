import { useState } from 'react';
import styles from './FormStepOne.module.css';
import {useFormContext} from '../../../context/FormContext'

export const FormStepOne = ({Receipt}) => {
  const {Data , Step, updateData, goToStep, isEditing , setIsEditing} = useFormContext();

  console.log(Data)
  console.log(Step)

  let isNewReceipt = Receipt && !isEditing

  const handleChange = (e) => {
    updateData({...Data , [e.target.name]: e.target.value})
  }

  const handleCheckBox = (value) => {
    updateData({...Data , hasPaid: value})
  }

  return (
    <div className={styles.StepOneContainer}>
      <div className={styles.inputContainer}>
        <label htmlFor="title" className={styles.inputLabel}>Title</label>
        <input readOnly={isNewReceipt} type="text" onChange={(e) => handleChange(e)} value={(Data?.title || Receipt?.title)} placeholder="Type receipt title" name="title" className={styles.inputText} id="title" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="customer_name" className={styles.inputLabel}>Customer Name</label>
        <input readOnly={isNewReceipt} type="text" onChange={(e) => handleChange(e)} value={(Data?.customerName || Receipt?.customerName)} placeholder="Type customer's full name" name="customerName" className={styles.inputText} id="customer_name" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="address" className={styles.inputLabel}>Address</label>
        <input readOnly={isNewReceipt} type="text" onChange={(e) => handleChange(e)} value={(Data?.customerAddress || Receipt?.customerAddress)} placeholder="Type customer's address" name="customerAddress" className={styles.inputText} id="address" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="number" className={styles.inputLabel}>Phone Number</label>
        <input readOnly={isNewReceipt} type="text" onChange={(e) => handleChange(e)} value={(Data?.customerNumber || Receipt?.customerNumber)} placeholder="Type customer's phone number" name="customerNumber" className={styles.inputText} id="number" />
      </div>

      <div className={styles.dabbleInputContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="orderDate" className={styles.inputLabel}>Date Of Order</label>
          <input readOnly={isNewReceipt} type="date" onChange={(e) => handleChange(e)} value={(Data?.orderDate || Receipt?.orderDate)} className={styles.inputText} name="orderDate" id="orderDate" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="deadlineDate" className={styles.inputLabel}>Deadline</label>
          <input readOnly={isNewReceipt} type="date" onChange={(e) => handleChange(e)} value={(Data?.deadlineDate || Receipt?.deadlineDate)} className={styles.inputText} name="deadlineDate" id="deadlineDate" />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="notice" className={styles.inputLabel}>Deadline notice</label>
        <input readOnly={isNewReceipt} type="date" onChange={(e) => handleChange(e)} value={(Data?.deadlineNotice || Receipt?.deadlineNotice)} name="deadlineNotice" className={styles.inputText} id="notice" />
      </div>

      <div className={styles.checkBox}>
        <label htmlFor="paid" className={styles.inputLabel}>Have they paid?</label>
        <input type="checkbox" onChange={(e) => !isNewReceipt && handleCheckBox(e.target.checked)} name="hasPaid" defaultChecked={Receipt?.hasPaid} id="paid" className={styles.checkBoxInput} />
      </div>

      <div className={styles.buttonsContainer}>
        {Receipt && <button className={styles.formButton} onClick={(e) => { e.preventDefault(); setIsEditing(true) }}> Edit </button>}
        <button className={styles.formButton} style={(Receipt && !isEditing) ? { backgroundColor: "rgb(138, 166, 233)" } : null} disabled={(Receipt && !isEditing)} onClick={(e) => goToStep(1)}>Next</button>
      </div>
    </div>
  )
}
