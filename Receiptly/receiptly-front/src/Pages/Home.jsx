import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import NewReceiptCard from '../Components/NewReceiptCard/NewReceiptCard.jsx';

const Home = () => {

  const [activeCard, setActiveCard] = useState(false);

/*   useEffect(() => {
    const getData = async() => {
      const data = await getReceipt();
      console.log(data)
    }

    getData();
  } , []) */

  const CardCallback = (value) => {
    setActiveCard(value);
  }

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="CardsContainers">
          <ReceiptCard CardCallBack={CardCallback} />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />

          {activeCard &&
            <div className='bodyOverlay'>
              <NewReceiptCard setActiveCard={setActiveCard} />
            </div>}
        </div>
      </div>
    </>
  )
}

export default Home