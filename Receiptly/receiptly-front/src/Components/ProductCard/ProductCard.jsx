import React, { useState } from 'react'
import IMG from '../../Images/test.jpg'
import Placeholder from '../../Images/placeholder-image.jpg'
import styles from './ProductCard.module.css'
import { ProductForm } from '../ProductForm/ProductForm'

const ProductCard = ({ product, add }) => {

    const [overlay, setOverlay] = useState(false)

    const addOverlay = () => {
        add && setOverlay(true)
    }

    const closeModal = () => {
        setOverlay(false)
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
                {!add && <button className={styles.editButton}>Edit</button>}
                {!add && <button className={styles.deleteButton}>Delete</button>}
            </div>

            { overlay && <div className="bodyOverlay">
                <ProductForm close={closeModal} />
            </div>}
        </div>
    )
}

export default ProductCard