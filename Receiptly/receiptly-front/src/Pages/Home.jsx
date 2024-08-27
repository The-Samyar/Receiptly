import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import NewReceiptCard from '../Components/NewReceiptCard/NewReceiptCard.jsx';
import { getReceipt } from '../Api/api.js';

const Home = () => {

  const [activeCard, setActiveCard] = useState(false);
  const [Receipts, setReceipts] = useState(null);

  useEffect(() => {
    const getData = async() => {
      const {data} = await getReceipt();
      /* console.log(data) */

      setReceipts(data);
    }

    getData();
  } , [])

/*   console.log(Receipts) */

  const CardCallback = (value) => {
    setActiveCard(value);
  }

  const relevantCard = (id) => {
    console.log(activeCard)
    var result = Receipts.find(receipt => receipt.id === id);
    return result;
  }

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="CardsContainers">
          {Receipts && Receipts.map(Receipt => (
            <ReceiptCard CardCallBack={CardCallback} Receipt={Receipt}/>
          ))}

          {activeCard &&
            <div className='bodyOverlay'>
              <NewReceiptCard Receipt={relevantCard(activeCard)} setActiveCard={setActiveCard} />
            </div>}
        </div>
      </div>
    </>
  )
}

export default Home