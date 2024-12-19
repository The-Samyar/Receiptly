import { IoClose } from 'react-icons/io5'
import styles from './ProductForm.module.css'
import { useState } from 'react'
import {CREATE_PRODUCT} from '../../GraphQL/Product'
import { useMutation } from '@apollo/client'
export const ProductForm = ({close}) => {

  const [Product, setProduct] = useState({title: '', costPerUnit: 0, effort: 0, productType: 'GOOD', unit: ''})

  const handleEvent = (e) => {
    setProduct(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  const [newProduct, {data, error}] = useMutation(CREATE_PRODUCT)

  const sendData = async() => {
    const result = await newProduct({variables: {
      title: Product.title,
      costPerUnit: parseInt(Product.costPerUnit),
      effort: parseInt(Product.effort),
      unit: Product.unit,
      productType: Product.productType
    }})

    console.log(result)

  } 

  return (
    <div className={styles.addCard}>
      <div className={styles.addCardHeader}>
        <div className={styles.addCardTitle}>
          <h3>New Product</h3>
        </div>
        <div className={styles.addCardClose}>
          <IoClose className={styles.closeIcon} onClick={() => close(false)} />
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.inputLabel}>Title</label>
          <input className={styles.inputText} name="title" id="title" onChange={(e) => handleEvent(e)}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Effort" className={styles.inputLabel}>Effort</label>
          <input className={styles.inputText} name="effort" id="Effort" onChange={(e) => handleEvent(e)}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="costPerUnit" className={styles.inputLabel}>Cost (per unit)</label>
          <input className={styles.inputText} name="costPerUnit" id="costPerUnit" onChange={(e) => handleEvent(e)}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="unit" className={styles.inputLabel}>Unit</label>
          <input className={styles.inputText} name="unit" id="unit" onChange={(e) => handleEvent(e)}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="productType" className={styles.inputLabel}>productType</label>
          <select name="productType" id="productType" className={styles.select} onChange={(e) => handleEvent(e)}>
            <option value="GOOD">Good</option>
            <option value="SERVICE">Service</option>
          </select>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
          <button className={styles.buttonForm} onClick={() => sendData()}>Send</button>
      </div>

    </div>
  )
}
