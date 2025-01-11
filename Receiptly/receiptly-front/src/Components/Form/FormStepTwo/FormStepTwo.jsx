import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../GraphQL/Product.js';
import { FaMinus, FaPlus } from 'react-icons/fa'
import styles from './FormStepTwo.module.css'
import { useState, useContext, useEffect } from 'react';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useFormContext } from '../../../context/FormContext';

const getNoTypeAndIdChanged = (products) => {
  return products?.map(({__typename,productId, ...rest}) => ({id: productId,...rest}))
}

export const FormStepTwo = ({ Receipt }) => {

  const [Products, setProducts] = useState(getNoTypeAndIdChanged(Receipt?.products) || []);
  const [productsChanged, setProductsChanged] = useState(false);
  const [AvailableProducts, setAvailableProducts] = useState([]);
  const [SelectedProducts, setSelectedProducts] = useState([]);

  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const {Data, goToStep, updateData} = useFormContext();

  useEffect(() => {
    if(data?.products){
      const dataWithoutType = getNoTypeAndIdChanged(data?.products)
      setAvailableProducts(dataWithoutType)
    }
  }, [data])

  useEffect(() => {
    if(Data.products){
      setProducts(Data.products)
    }
  }, [Data])

  const isProductExists = (product) => {
    const existingProductIds = Products?.map((product) => product.productId || product.id);
    const result = existingProductIds?.find(singleProduct => singleProduct === product.id)
    return result;
  }

  const changeStep = (step) => {
    updateData({products: Products})
    goToStep(step)
  }

  const handleOnClick = (id, action) => {

    if (productsChanged === false) {
      setProductsChanged(true);
    }

    if (action === 'add') {
      setProducts((prevItems) => (
        prevItems.map(item => (
          item.id === id ? { ...item, count: item.count + 1 } : item
        ))
      ))
    } else {
      setProducts((prevItems) => (
        prevItems.map(item => (
          item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
        ))
      ))
    }
  }

  const addProductsToReceipt = () => {
    const existingProductIds = Products.map((product) => product.productId || product.id);

    // Filter SelectedProducts to only include new products not in Products
    const filteredProducts = SelectedProducts.filter(
      (product) => !existingProductIds.includes(product.id)
    );

    const newProducts = filteredProducts.map(product => ({ ...product, count: 1 }))

    // Add new products to Products and clear SelectedProducts
    setProducts((prev) => [...prev, ...newProducts]);
    setSelectedProducts([]); // Clear selected products
  };



  const selectProduct = (e) => {
    const productId = e.target.id;

    if (e.target.checked) {
      // Add product to SelectedProducts
      const product = AvailableProducts.find((AvProduct) => productId === AvProduct.id);
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      // Remove product from SelectedProducts
      setSelectedProducts((prev) => prev.filter((prod) => prod.id !== productId));
    }
  }

  const deleteProduct = (e) => {
    const productId = e.currentTarget.id; // Always reliable

    const newProducts = Products.filter(
      (product) => product.id !== productId
    );
    setProducts(newProducts);
  };


  return (
    <>
      <div className={styles.StepTwoContainer}>
        <FaCircleArrowLeft className={styles.AddIcon} onClick={() => addProductsToReceipt()} />
        <div className={styles.receiptProductsList}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <th>Action</th>
                <th>Product Name</th>
                <th>Labor</th>
                <th>Price</th>
                <th>Add product</th>
              </thead>

              <tbody>
                {
                  Products?.map((product) => (
                    product.count !== 0 ?
                      <tr>
                        <td>
                          <div className={styles.td}>
                            <IoCloseCircleSharp onClick={deleteProduct} id={product.id} style={{ color: 'red', cursor: 'pointer', width: '20px', height: '20px' }} />
                          </div>
                        </td>
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
                            <FaMinus className={styles.tdContentIcon} onClick={() => handleOnClick(product?.id, 'delete')} />
                            <input type="text" /* readOnly={!edit} */ value={product.count} name="" id="" className={styles.inputTable} />
                            <FaPlus className={styles.tdContentIcon} onClick={() => handleOnClick(product.id, 'add')} />
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
                  <th width="10%">Action</th>
                  <th>Product Name</th>
                  <th>Labor</th>
                  <th>Price</th>
                </thead>

                <tbody>
                  {
                    AvailableProducts && AvailableProducts.map((product) => (
                      product.count !== 0 ?
                        <tr>
                          <td>
                            <div className={styles.td}>
                              <input checked={SelectedProducts.some((selected) => selected.id === product.id)} onClick={(e) => selectProduct(e)} className={styles.selectCheckBox} disabled={isProductExists(product)} type="checkbox" id={product.id} />
                            </div>
                          </td>
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

                        </tr> : null
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.formButton} onClick={() => changeStep(0)}>
          Prev
        </button>
        <button className={styles.formButton} onClick={() => changeStep(2)}>
          Next
        </button>
      </div>
    </>
  )
}
