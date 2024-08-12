import './NewReceitCard.css'

const NewReceiptCard = ({ setActiveCard }) => {

    const CardCallback = (value) => {
        setActiveCard(value);
    }

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
                                            <input type="text" name="" id="" className="inputTable" />
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
                                            <input type="text" name="" id="" className="inputTable" />
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
                                            <input type="text" name="" id="" className="inputTable" />
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
                                            <input type="text" name="" id="" className="inputTable" />
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
                                            <input type="text" name="" id="" className="inputTable" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <div className="ProductsSection"></div>
            </div>
        </div>
    )
}

export default NewReceiptCard