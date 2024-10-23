import './ReceiptCard.css'
import { useMemo } from 'react';
import { CgDanger } from "react-icons/cg";

function limitProducts(products) {
  const newProducts = products.slice(0, 5);
  let remainingProducts = products.length - newProducts.length
  return [newProducts, remainingProducts]
}

const isWithinDeadline = (Receipt) => {
  
  if(Receipt?.deadlineNotice && Receipt.state === "ACTIVE" ){
    const deadlineNotice = new Date(Receipt?.deadlineNotice);
    const currentDate = new Date();
    const deadlineDate = new Date(Receipt?.deadlineDate);

    if(currentDate < deadlineDate && currentDate >= deadlineNotice){
      return true;
    }else{
      return false
    }
  }
  return false;
}

const ReceiptCard = ({ CardCallBack, Receipt }) => {

  const handleClick = () => {
    CardCallBack(Receipt.id)
  }

  const [newProducts, remainingProducts] = useMemo(() => limitProducts(Receipt?.products) , [Receipt?.products])

  return (
    <div className="ReceiptCardContainer">
      <div className={Receipt?.state === "DONE" ? "ReceiptCardStateDone" : Receipt.state === "CANCELLED" ? "ReceiptCardStateCancelled" : "ReceiptCardStateActive"} />
      <div className="ReceiptCardHeader">
        <div className="ReceiptCardTitle">
          <h2 className="ReceiptCardHeader">{Receipt.title}</h2>
          <span className="ReceiptCardDetail">
            Deadline: {Receipt.deadlineDate}
            { isWithinDeadline(Receipt) && <CgDanger className='DangerIcon' />}
          </span>
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
            <div key={product?.id} className="ReceiptCardTag">{product?.title}</div>
          ))
          : null
        }
        {remainingProducts > 0 ? <div className="ReceiptCardTag">{remainingProducts} More</div> : null}
      </div>
    </div>
  )
}

export default ReceiptCard