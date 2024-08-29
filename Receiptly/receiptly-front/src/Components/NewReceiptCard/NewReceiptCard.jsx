import { useState } from 'react';
import './NewReceitCard.css'
import { editSingleReceipt } from '../../Api/api';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const NewReceiptCard = ({ setActiveCard, Receipt }) => {

    const CardCallback = (value) => {
        setActiveCard(value);
    }

    const [Products, setProducts] = useState(Receipt?.products);
    const [editReceipt, setEditReceipt] = useState({ id: Receipt?.id });
    const [edit, setEdit] = useState(false);
    const [productsChanged, setProductsChanged] = useState(false);

    const handleOnClick = (id, action) => {
        
        if(productsChanged === false){
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

    function getSum(total, newValue) {
        return total + (newValue.count * newValue.cost_per_unit)
    }

    const getEffort = (total, newValue) => {
        return total + newValue.effort
    }

    const handleChange = (e) => {
        setEditReceipt({ ...editReceipt, [e.target.name]: e.target.value })
    }

    const editData = async (e) => {
        e.preventDefault();

        if(productsChanged === true)
            console.log({ ...editReceipt, products: Products })
        else
            console.log({ ...editReceipt })
        /* const data = await editSingleReceipt({...editReceipt , products: Products}); */
    }


    var totalCount = Products.reduce(getSum, 0);
    var totalEffort = Products.reduce(getEffort, 0);

    return (
        <div className="addCard">
            <div className="addCardHeader">
                <div className="addCardTitle">
                    <h3>Your Receipt</h3>
                </div>
                <div className="addCardClose" onClick={() => CardCallback(false)}>
                    <IoClose className="closeIcon"/>
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
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.customer_name} placeholder="Type customer's full name" name="customer_name" className="inputText" id="customer_name" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="address" className="inputLabel">Address</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.address} placeholder="Type customer's address" name="address" className="inputText" id="address" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="number" className="inputLabel">Phone Number</label>
                        <input readOnly={!edit} type="text" onChange={(e) => handleChange(e)} defaultValue={Receipt.number} placeholder="Type customer's phone number" name="number" className="inputText" id="number" />
                    </div>

                    <div className="dabbleInputContainer">
                        <div className="inputContainer">
                            <label htmlFor="order_date" className="inputLabel">Date Of Order</label>
                            <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} defaultValue={Receipt.order_date} className='inputText' name="order_date" id="order_date" />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="deadline_date" className="inputLabel">Deadline</label>
                            <input readOnly={!edit} type="date" onChange={(e) => handleChange(e)} defaultValue={Receipt.deadline_date} className='inputText' name="deadline_date" id="deadline_date" />
                        </div>
                    </div>

                    <div className="checkBox">
                        <label htmlFor="paid" className="inputLabel">Have they paid?</label>
                        <input type="checkbox" onChange={(e) => edit && e.target.checked === true ? setEditReceipt({ ...editReceipt, paid: true }) : setEditReceipt({ ...editReceipt, paid: false })} name="paid" defaultChecked={Receipt.has_paid} id="paid" className='checkBoxInput' />
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
                                                        ${product.cost_per_unit}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tdContent">
                                                        <FaMinus className="tdContentIcon" onClick={() => edit && handleOnClick(product.id, 'delete')}/>
                                                        <input type="text" readOnly={!edit} value={product.count} name="" id="" className="inputTable" />
                                                        <FaPlus className="tdContentIcon" onClick={() => edit && handleOnClick(product.id, 'add')} />
                                                    </div>
                                                </td>
                                            </tr> : null
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="buttonsContainer">
                        <button className="formButton" onClick={(e) => {e.preventDefault(); setEdit(true)}}>Edit</button>
                        <button className="formButton" style={!edit === true ? {backgroundColor: "rgb(138, 166, 233)"} : null} disabled={!edit} onClick={(e) => editData(e)}>Save</button>
                    </div>
                </form>
                <div className="ProductsSection">
                    <div className="productsContainer">
                        <div className="productsDetail">
                            <h3 className="productsTitle">Products</h3>
                            <div className="productsInfo">
                                {Products.map((item) => (
                                    item.count !== 0 ?
                                        <p>{item.count} * {item.title} : ${item.cost_per_unit} (About {item.effort * item.count} hours)</p>
                                        : null
                                ))}
                            </div>
                        </div>

                        <div className="productsSummary">
                            <p>Total cost: ${totalCount}</p>
                            <p>Total Effort: {totalEffort} hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReceiptCard