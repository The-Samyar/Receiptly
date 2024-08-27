import './ReceiptCard.css'

const ReceiptCard = ({CardCallBack , Receipt}) => {

  const handleClick = () => {
    CardCallBack(Receipt.id)
  }

  /* console.log(Receipt) */

  return (
    <div className="ReceiptCardContainer">
        <div className="ReceiptCardHeader">
            <div className="ReceiptCardTitle">
                <h2 className="ReceiptCardHeader">{Receipt.title}</h2>
                <span className="ReceiptCardDetail">Deadline: {Receipt.deadline_date}</span> 
                <br />
                <span className="ReceiptCardDetail">Customer: {Receipt.customer_name}</span>
            </div>

            <div className="ReceiptCardAction">
                <button className="ReceiptCardActionButton" onClick={handleClick}>View and Edit</button>
            </div>
        </div>

        <div className="ReceiptCardTags">
          {/* <div className="ReceiptCardTag">Dashboard</div>
          <div className="ReceiptCardTag">Payment Panel</div>
          <div className="ReceiptCardTag">Admin Panel</div> */}

          {Receipt.products[0] !== null && Receipt?.products.map(product => (
            <div className="ReceiptCardTag">{product?.title}</div>
          ))}
        </div>
    </div>
  )
}

export default ReceiptCard