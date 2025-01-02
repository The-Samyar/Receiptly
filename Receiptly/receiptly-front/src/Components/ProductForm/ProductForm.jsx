import { IoClose } from 'react-icons/io5'
import styles from './ProductForm.module.css'
import { useState } from 'react'
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../GraphQL/Product'
import { useMutation } from '@apollo/client'
export const ProductForm = ({ close, product }) => {

  const productSchema = { title: '', costPerUnit: 0, effort: 0, productType: 'GOOD', unit: '' };
  const [Product, setProduct] = useState(!product ? productSchema : { id: product.id })

  console.log(Product)

  const handleEvent = (e) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [newProduct, { loading: creating, error: createError }] = useMutation(CREATE_PRODUCT)
  const [editProduct, { loading: updating, error: updateError }] = useMutation(UPDATE_PRODUCT)

  const sendData = async () => {
    try {
      const result = await newProduct({
        variables: {
          title: Product.title,
          costPerUnit: parseInt(Product.costPerUnit),
          effort: parseInt(Product.effort),
          unit: Product.unit,
          productType: Product.productType
        }
      })

      if(result?.data){
        alert("Successfully Added")
      }
    } catch (error) {
      alert("Error")
      console.log("Error: ", error.message)
    }
  }

  const editData = async () => {
    try {
      const result = await editProduct({
        variables: {
          id: Product?.id,
          title: Product?.title,
          costPerUnit: Product?.costPerUnit && parseInt(Product?.costPerUnit),
          effort: Product?.effort && parseInt(Product?.effort),
          unit: Product?.unit,
          productType: Product?.productType
        }
      })

      if (result?.data) {
        console.log(result)
        alert("successfully updated")
      }

    } catch (error) {
      console.log("Error updating:", error.message)
    }
  }

  return (
    <div className={styles.addCard}>
      <div className={styles.addCardHeader}>
        <div className={styles.addCardTitle}>
          <h3>{`${product ? "View" : "New"} Product`}</h3>
        </div>
        <div className={styles.addCardClose}>
          <IoClose className={styles.closeIcon} onClick={() => close(false)} />
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.inputLabel}>Title</label>
          <input className={styles.inputText} name="title" id="title" onChange={(e) => handleEvent(e)} defaultValue={product && product?.title} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Effort" className={styles.inputLabel}>Effort</label>
          <input className={styles.inputText} name="effort" id="Effort" onChange={(e) => handleEvent(e)} defaultValue={product && product?.effort} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="costPerUnit" className={styles.inputLabel}>Cost (per unit)</label>
          <input className={styles.inputText} name="costPerUnit" id="costPerUnit" onChange={(e) => handleEvent(e)} defaultValue={product && product?.costPerUnit} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="unit" className={styles.inputLabel}>Unit</label>
          <input className={styles.inputText} name="unit" id="unit" onChange={(e) => handleEvent(e)} defaultValue={product && product?.unit} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="productType" className={styles.inputLabel}>productType</label>
          <select name="productType" id="productType" className={styles.select} onChange={(e) => handleEvent(e)} defaultValue={product && product?.productType}>
            <option value="GOOD">Good</option>
            <option value="SERVICE">Service</option>
          </select>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonForm} onClick={() => { product ? editData() : sendData() }}>{`${product ? "Update" : "Send"}`}</button>
      </div>

    </div>
  )
}
