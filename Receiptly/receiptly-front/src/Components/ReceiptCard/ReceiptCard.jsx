import './ReceiptCard.css'

const ReceiptCard = ({ CardCallBack, Receipt }) => {


  function limitProducts(products) {

    const newProducts = products.slice(0, 5);
    console.log(newProducts)
    let remainingProducts = products.length - newProducts.length
    console.log(remainingProducts)
    return [newProducts, remainingProducts]

  }

  const handleClick = () => {
    CardCallBack(Receipt.id)
  }

  const [newProducts, remainingProducts] = limitProducts(Receipt?.products)
  console.log(newProducts, remainingProducts)

  /* console.log(Receipt) */

  return (
    <div className="ReceiptCardContainer">
      <div className="ReceiptCardHeader">
        <div className="ReceiptCardTitle">
          <h2 className="ReceiptCardHeader">{Receipt.title}</h2>
          <span className="ReceiptCardDetail">Deadline: {Receipt.deadlineDate}</span>
          <br />
          <span className="ReceiptCardDetail">Customer: {Receipt.customerName}</span>
        </div>

        <div className="ReceiptCardAction">
          <button className="ReceiptCardActionButton" onClick={handleClick}>View and Edit</button>
        </div>
      </div>

      <div className="ReceiptCardTags">
        {Receipt.products[0] !== null ?
          newProducts.map(product => (
            <div className="ReceiptCardTag">{product?.title}</div>
          ))
          : null
        }
        {remainingProducts > 0 ? <div className="ReceiptCardTag">{remainingProducts} More</div> : null}
      </div>
    </div>
  )
}

export default ReceiptCard