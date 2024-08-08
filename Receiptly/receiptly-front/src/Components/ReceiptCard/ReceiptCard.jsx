import './ReceiptCard.css'

const ReceiptCard = ({CardCallBack}) => {

  const handleClick = () => {
    CardCallBack(true)
  }

  return (
    <div className="ReceiptCardContainer">
        <div className="ReceiptCardHeader">
            <div className="ReceiptCardTitle">
                <h2 className="ReceiptCardHeader">Sam Steel</h2>
                <span className="ReceiptCardDetail">Deadline: June 2, 2024</span> 
                <br />
                <span className="ReceiptCardDetail">Customer: Mamad</span>
            </div>

            <div className="ReceiptCardAction">
                <button className="ReceiptCardActionButton" onClick={handleClick}>View and Edit</button>
            </div>
        </div>

        <div className="ReceiptCardTags">
          <div className="ReceiptCardTag">Dashboard</div>
          <div className="ReceiptCardTag">Payment Panel</div>
          <div className="ReceiptCardTag">Admin Panel</div>
        </div>
    </div>
  )
}

export default ReceiptCard