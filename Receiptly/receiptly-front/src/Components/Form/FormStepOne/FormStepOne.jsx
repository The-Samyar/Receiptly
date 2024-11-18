import { useState } from 'react';
import styles from './FormStepOne.module.css';
import {useFormContext} from '../../../context/FormContext'

export const FormStepOne = ({Receipt}) => {
  const [edit, setEdit] = useState(false)
  const {Data , updateData} = useFormContext();

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
        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} value={edit && (Data?.title || Receipt.title)} placeholder="Type receipt title" name="title" className={styles.inputText} id="title" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="customer_name" className={styles.inputLabel}>Customer Name</label>
        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} value={edit && (Data?.customerName || Receipt.customerName)} placeholder="Type customer's full name" name="customerName" className={styles.inputText} id="customer_name" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="address" className={styles.inputLabel}>Address</label>
        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} value={edit && (Data?.customerAddress || Receipt.customerAddress)} placeholder="Type customer's address" name="customerAddress" className={styles.inputText} id="address" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="number" className={styles.inputLabel}>Phone Number</label>
        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} value={edit && (Data?.customerNumber || Receipt.customerNumber)} placeholder="Type customer's phone number" name="customerNumber" className={styles.inputText} id="number" />
      </div>

      <div className={styles.dabbleInputContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="orderDate" className={styles.inputLabel}>Date Of Order</label>
          <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} value={edit && (Data?.orderDate || Receipt.orderDate)} className={styles.inputText} name="orderDate" id="orderDate" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="deadlineDate" className={styles.inputLabel}>Deadline</label>
          <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} value={edit && (Data?.deadlineDate || Receipt.deadlineDate)} className={styles.inputText} name="deadlineDate" id="deadlineDate" />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="notice" className={styles.inputLabel}>Deadline notice</label>
        <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} value={edit && (Data?.deadlineNotice || Receipt.deadlineNotice)} name="deadlineNotice" className={styles.inputText} id="notice" />
      </div>

      <div className={styles.checkBox}>
        <label htmlFor="paid" className={styles.inputLabel}>Have they paid?</label>
        <input type="checkbox" onChange={(e) => edit && handleCheckBox(e.target.checked)} name="hasPaid" defaultChecked={Receipt.hasPaid} id="paid" className={styles.checkBoxInput} />
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.formButton} onClick={(e) => { e.preventDefault(); setEdit(true) }}>Edit</button>
        <button className={styles.formButton} style={!edit ? { backgroundColor: "rgb(138, 166, 233)" } : null} disabled={!edit}>Save</button>
      </div>
    </div>
  )
}
