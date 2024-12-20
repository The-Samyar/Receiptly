import React, { useState } from 'react'
import IMG from '../../Images/test.jpg'
import Placeholder from '../../Images/placeholder-image.jpg'
import styles from './ProductCard.module.css'
import { ProductForm } from '../ProductForm/ProductForm'
import { useMutation } from '@apollo/client'
import { DELETE_PRODUCT } from '../../GraphQL/Product'

const ProductCard = ({ product, add, onDelete }) => {

    const [overlay, setOverlay] = useState(false)
    const [deleteProduct, {loading, error}] = useMutation(DELETE_PRODUCT)

    const addOverlay = () => {
        add && setOverlay(true)
    }

    const closeModal = () => {
        setOverlay(false)
    }

    const deleteProductByID = async() => {
        try {
            const result = await deleteProduct({variables: {id: product?.id}})
            if(result?.data){
                console.log(result)
                onDelete(product?.id)
                alert("Successfully deleted the product")
            }

        } catch (error) {
           console.log("Error on deleting the product ", error.message) 
        }
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderItem}>
                    <h3 className={styles.cardTitle} onClick={() => addOverlay()}>
                        {!add && product?.title}
                        {add && "Add New Product"}
                    </h3>
                </div>
                <div className={styles.cardHeaderItem}>
                    <span className={styles.cardItemTitle}>{!add && "Price:"}</span>
                    <span className={styles.cardItemValue}>{!add && `$${product?.costPerUnit}  / number`}</span>
                </div>
                <div className={styles.cardHeaderItem}>
                    <span className={styles.cardItemTitle}>{!add && "Labor:"}</span>
                    <span className={styles.cardItemValue}>{!add && `${product?.effort} hours`}</span>
                </div>
            </div>

            <div className={styles.cardImg}>
                <img src={add ? Placeholder : IMG} alt="image" />
            </div>

            <div className={styles.cardActions}>
                {!add && <button className={styles.editButton} onClick={() => setOverlay(true)}>Edit</button>}
                {!add && <button className={styles.deleteButton} onClick={() => deleteProductByID()}>Delete</button>}
            </div>

            { overlay && <div className="bodyOverlay">
                <ProductForm close={closeModal} product={!add ? product : null} />
            </div>}
        </div>
    )
}

export default ProductCard