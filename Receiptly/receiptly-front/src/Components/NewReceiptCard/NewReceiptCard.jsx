import { useEffect, useState } from 'react';
import './NewReceitCard.css'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useMutation } from '@apollo/client';
import { EDIT_RECEIPT } from '../../GraphQL/Mutations';


const NewReceiptCard = ({ setActiveCard, Receipt }) => {

    const CardCallback = (value) => {
        setActiveCard(value);
    }

    const [Products, setProducts] = useState(Receipt?.products);
    const [editReceipt, setEditReceipt] = useState({ id: Receipt?.id });
    const [edit, setEdit] = useState(false);
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

    const handleChange = (e) => {
        setEditReceipt({ ...editReceipt, [e.target.name]: e.target.value })
    }

    const editData = async (e) => {
        e.preventDefault();

       /*  if (productsChanged === true)
            console.log({ id: editReceipt.id, products: Products })
        console.log({ ...editReceipt, products: Products }) */
        /* const data = await editSingleReceipt({...editReceipt , products: Products}); */

        const variable = {
            id: editReceipt.id,
            products: Products.map(product => ({id: product.productId , count: product.count})) ,
            ...( editReceipt?.title && {title: editReceipt.title}),
            ...( editReceipt?.customerName && {customerName: editReceipt.customerName}),
            ...( editReceipt?.customerNumber && {customerNumber: editReceipt.customerNumber}),
            ...( editReceipt?.customerAddress && {customerAddress: editReceipt.customerAddress}),
            ...( editReceipt?.hasPaid && {hasPaid: editReceipt.hasPaid}),
            ...( editReceipt?.orderDate && {orderDate: editReceipt.orderDate}),
            ...( editReceipt?.deadlineDate && {deadlineDate: editReceipt.deadlineDate}),
            ...( editReceipt?.deadlineNotice && {deadlineNotice: editReceipt.deadlineNotice}),
            ...( editReceipt?.state && {state: editReceipt.state}),
        }

        console.log(variable)
        try {
            await edit_receipt({
                variables: variable
              })
              alert('product added successfully')
        } catch (error) {
            console.log(error)
        }
    }

    

    const [edit_receipt, { data, error }] = useMutation(EDIT_RECEIPT);

    console.log(data)
    console.log(error)
  /* useEffect(() => {
    
    );
  }, [edit_receipt]); */

    return (
        <div className="addCard">
            <div className="addCardHeader">
                <div className="addCardTitle">
                    <h3>Your Receipt</h3>
                </div>
                <div className="addCardClose" onClick={() => CardCallback(false)}>
                    <IoClose className="closeIcon" />
                </div>
            </div>

            <div className="addCardContent">
                <form className="inputSection">
                    <div className="inputContainer">
                        <label htmlFor="title" className="inputLabel">Title</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.title} placeholder="Type receipt title" name="title" className="inputText" id="title" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="customer_name" className="inputLabel">Customer Name</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.customerName} placeholder="Type customer's full name" name="customerName" className="inputText" id="customer_name" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="address" className="inputLabel">Address</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.customerAddress} placeholder="Type customer's address" name="customerAddress" className="inputText" id="address" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="number" className="inputLabel">Phone Number</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.customerNumber} placeholder="Type customer's phone number" name="customerNumber" className="inputText" id="number" />
                    </div>

                    <div className="dabbleInputContainer">
                        <div className="inputContainer">
                            <label htmlFor="order_date" className="inputLabel">Date Of Order</label>
                            <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} defaultValue={Receipt.orderDate} className='inputText' name="order_date" id="order_date" />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="deadline_date" className="inputLabel">Deadline</label>
                            <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} defaultValue={Receipt.deadlineDate} className='inputText' name="deadline_date" id="deadline_date" />
                        </div>
                    </div>

                    <div className="checkBox">
                        <label htmlFor="paid" className="inputLabel">Have they paid?</label>
                        <input type="checkbox" onChange={(e) => edit && e.target.checked === true ? setEditReceipt({ ...editReceipt, paid: true }) : setEditReceipt({ ...editReceipt, paid: false })} name="hasPaid" defaultChecked={Receipt.hasPaid} id="paid" className='checkBoxInput' />
                    </div>

                    <div className="tableContainer">
                        <table className="table">
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
                                                    <div className="tdContent">
                                                        {product.title}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tdContent">
                                                        {product.effort} hours
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tdContent">
                                                        ${product.costPerUnit}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tdContent">
                                                        <FaMinus className="tdContentIcon" onClick={() => edit && handleOnClick(product.productId, 'delete')} />
                                                        <input type="text" readOnly={!edit} value={product.count} name="" id="" className="inputTable" />
                                                        <FaPlus className="tdContentIcon" onClick={() => edit && handleOnClick(product.productId, 'add')} />
                                                    </div>
                                                </td>
                                            </tr> : null
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="buttonsContainer">
                        <button className="formButton" onClick={(e) => { e.preventDefault(); setEdit(true) }}>Edit</button>
                        <button className="formButton" style={!edit === true ? { backgroundColor: "rgb(138, 166, 233)" } : null} disabled={!edit} onClick={(e) => editData(e)}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewReceiptCard