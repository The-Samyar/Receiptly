import { FaMinus, FaPlus } from 'react-icons/fa'
import styles from './FormStepTwo.module.css'
import { useState } from 'react';
import { FaCircleArrowLeft } from "react-icons/fa6";



export const FormStepTwo = ({ Receipt }) => {

  const [Products, setProducts] = useState(Receipt?.products);
  const [productsChanged, setProductsChanged] = useState(false);

  const handleOnClick = (id, action) => {

    if (productsChanged === false) {
      setProductsChanged(true);
    }

    if (action === 'add') {
      setProducts((prevItems) => (
        prevItems.map(item => (
          item.productId === id ? { ...item, count: item.count + 1 } : item
        ))
      ))
    } else {
      setProducts((prevItems) => (
        prevItems.map(item => (
          item.productId === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
        ))
      ))
    }
  }

  return (
    <div className={styles.StepTwoContainer}>
      <FaCircleArrowLeft className={styles.AddIcon} />
      <div className={styles.receiptProductsList}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <th>Product Name</th>
              <th>Labor</th>
              <th>Price</th>
              <th>Add product</th>
            </thead>

            <tbody>
              {
                Products.map((product) => (
                  product.count !== 0 ?
                    <tr>
                      <td>
                        <div className={styles.tdContent}>
                          {product.title}
                        </div>
                      </td>
                      <td>
                        <div className={styles.tdContent}>
                          {product.effort} hours
                        </div>
                      </td>
                      <td>
                        <div className={styles.tdContent}>
                          ${product.costPerUnit}
                        </div>
                      </td>
                      <td>
                        <div className={styles.tdContent}>
                          <FaMinus className={styles.tdContentIcon} onClick={() => handleOnClick(product.productId, 'delete')} />
                          <input type="text" /* readOnly={!edit} */ value={product.count} name="" id="" className="inputTable" />
                          <FaPlus className={styles.tdContentIcon} onClick={() => handleOnClick(product.productId, 'add')} />
                        </div>
                      </td>
                    </tr> : null
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.availableProductsList}>
        <div className={styles.receiptProductsList}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <th>Product Name</th>
                <th>Labor</th>
                <th>Price</th>
                <th>Add product</th>
              </thead>

              <tbody>
                {
                  Products.map((product) => (
                    product.count !== 0 ?
                      <tr>
                        <td>
                          <div className={styles.tdContent}>
                            {product.title}
                          </div>
                        </td>
                        <td>
                          <div className={styles.tdContent}>
                            {product.effort} hours
                          </div>
                        </td>
                        <td>
                          <div className={styles.tdContent}>
                            ${product.costPerUnit}
                          </div>
                        </td>
                        <td>
                          <div className={styles.tdContent}>
                            <FaMinus className={styles.tdContentIcon} onClick={() => handleOnClick(product.productId, 'delete')} />
                            <input type="text" /* readOnly={!edit} */ value={product.count} name="" id="" className="inputTable" />
                            <FaPlus className={styles.tdContentIcon} onClick={() => handleOnClick(product.productId, 'add')} />
                          </div>
                        </td>
                      </tr> : null
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
