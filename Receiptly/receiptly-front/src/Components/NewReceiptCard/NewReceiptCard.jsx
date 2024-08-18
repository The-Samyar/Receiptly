import { useState } from 'react';
import './NewReceitCard.css'

const NewReceiptCard = ({ setActiveCard , Receipt }) => {

    const CardCallback = (value) => {
        setActiveCard(value);
    }

    /* console.log(Receipt) */

    const [Products, setProducts] = useState(Receipt?.products);

    const handleOnClick = (id , action) => {
        console.log(id , action);
        if(action === 'add'){
            console.log('enter')
            setProducts((prevItems) => (
                prevItems.map(item => (
                    item.id === id ? {...item , count: item.count + 1} : item
                ))
            ))
        }else{
            console.log('enter delete')
            setProducts((prevItems) => (
                prevItems.map(item => (
                    item.id === id && item.count > 0 ? {...item , count: item.count - 1} : item
                )).filter(item => item.count > 0)
            ))
        }
    }

    function getSum(total , newValue){
        return total + (newValue.count * newValue.cost_per_unit)
    }

    const getEffort = (total , newValue) => {
        return total + newValue.effort
    }

    var totalCount = Products.reduce(getSum, 0);
    var totalEffort = Products.reduce(getEffort , 0);

    return (
        <div className="addCard">
            <div className="addCardHeader">
                <div className="addCardTitle">
                    <h3>Add New Receipt</h3>
                </div>
                <div className="addCardClose" onClick={() => CardCallback(false)}>
                    close
                </div>
            </div>

            <div className="addCardContent">
                <form className="inputSection">
                    <div className="inputContainer">
                        <label htmlFor="Title" className="inputLabel">Title</label>
                        <input type="text" defaultValue={Receipt.title} placeholder="Type receipt title" name="Title" className="inputText" id="Title" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="CustomerName" className="inputLabel">Customer Name</label>
                        <input type="text" defaultValue={Receipt.customer_name} placeholder="Type customer's full name" name="CustomerName" className="inputText" id="CustomerName" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="Address" className="inputLabel">Address</label>
                        <input type="text" defaultValue={Receipt.address} placeholder="Type customer's address" name="Address" className="inputText" id="Address" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="phoneNumber" className="inputLabel">Phone Number</label>
                        <input type="text" defaultValue={Receipt.number} placeholder="Type customer's phone number" name="phoneNumber" className="inputText" id="phoneNumber" />
                    </div>

                    <div className="dabbleInputContainer">
                        <div className="inputContainer">
                            <label htmlFor="DateOfOrder" className="inputLabel">Date Of Order</label>
                            <input type="date" defaultValue={Receipt.order_date} className='inputText' name="DateOfOrder" id="DateOfOrder" />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="Deadline" className="inputLabel">Deadline</label>
                            <input type="date" defaultValue={Receipt.deadline_date} className='inputText' name="Deadline" id="Deadline" />
                        </div>
                    </div>

                    <div className="checkBox">
                        <label htmlFor="paid" className="inputLabel">Have they paid?</label>
                        <input type="checkbox" name="paid" defaultChecked={Receipt.has_paid} id="paid" className='checkBoxInput' />
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
                                                    <p onClick={() => handleOnClick(product.id , 'delete')}>Minus</p>
                                                    <input type="text" value={product.count} name="" id="" className="inputTable" />
                                                    <p onClick={() => handleOnClick(product.id , 'add')}>Add</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
                <div className="ProductsSection">
                    <div className="productsContainer">
                        <div className="productsDetail">
                            <h3 className="productsTitle">Products</h3>
                            <div className="productsInfo">
                                {Products.map((item) => (
                                    <p>{item.count} * {item.title} : ${item.cost_per_unit} (About {item.effort * item.count} hours)</p>
                                ))}
                                {/* <p>2 * Admin Panel : $400 (About 4 hours)</p> */}
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