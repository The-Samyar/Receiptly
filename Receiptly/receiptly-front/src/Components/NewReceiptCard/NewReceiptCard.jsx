import { useState } from 'react';
import './NewReceitCard.css'

const NewReceiptCard = ({ setActiveCard }) => {

    const CardCallback = (value) => {
        setActiveCard(value);
    }

    const [Products, setProducts] = useState([
        { id: 1, name: 'Admin Panel', count: 1, effort: 2, cost: 200 },
        { id: 2, name: 'Dashboard', count: 1, effort: 4, cost: 200 },
        { id: 3, name: 'Payment Panel', count: 1, effort: 3, cost: 200 },
    ]);

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

    console.log(Products)

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
                        <input type="text" placeholder="Type receipt title" name="Title" className="inputText" id="Title" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="CustomerName" className="inputLabel">Customer Name</label>
                        <input type="text" placeholder="Type customer's full name" name="CustomerName" className="inputText" id="CustomerName" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="Address" className="inputLabel">Address</label>
                        <input type="text" placeholder="Type customer's address" name="Address" className="inputText" id="Address" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="phoneNumber" className="inputLabel">Phone Number</label>
                        <input type="text" placeholder="Type customer's phone number" name="phoneNumber" className="inputText" id="phoneNumber" />
                    </div>

                    <div className="dabbleInputContainer">
                        <div className="inputContainer">
                            <label htmlFor="DateOfOrder" className="inputLabel">Date Of Order</label>
                            <input type="date" className='inputText' name="DateOfOrder" id="DateOfOrder" />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="Deadline" className="inputLabel">Deadline</label>
                            <input type="date" className='inputText' name="Deadline" id="Deadline" />
                        </div>
                    </div>

                    <div className="checkBox">
                        <label htmlFor="paid" className="inputLabel">Have they paid?</label>
                        <input type="checkbox" name="paid" id="paid" className='checkBoxInput' />
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
                                                    {product.name}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tdContent">
                                                    {product.effort} hours
                                                </div>
                                            </td>
                                            <td>
                                                <div className="tdContent">
                                                    ${product.cost}
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

                                {/* <tr>
                                    <td>
                                        <div className="tdContent">
                                            Dashboard
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            4 hours
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            $100
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            <p>Minus</p>
                                            <input type="text" name="" id="" className="inputTable" />
                                            <p>Add</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="tdContent">
                                            Dashboard
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            4 hours
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            $100
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            <p>Minus</p>
                                            <input type="text" name="" id="" className="inputTable" />
                                            <p>Add</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="tdContent">
                                            Dashboard
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            4 hours
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            $100
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            <p>Minus</p>
                                            <input type="text" name="" id="" className="inputTable" />
                                            <p>Add</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="tdContent">
                                            Dashboard
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            4 hours
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            $100
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tdContent">
                                            <p>Minus</p>
                                            <input type="text" name="" id="" className="inputTable" />
                                            <p>Add</p>
                                        </div>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </form>
                <div className="ProductsSection">
                    <div className="productsContainer">
                        <div className="productsDetail">
                            <h3 className="productsTitle">Products</h3>
                            <div className="productsInfo">
                                <p>2 * Dashboard : $200 (About 8 hours)</p>
                                <p>2 * Admin Panel : $400 (About 4 hours)</p>
                            </div>
                        </div>

                        <div className="productsSummary">
                            <p>Total Cost: $600</p>
                            <p>Total Effort: 12 hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReceiptCard