import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'

const Home = () => {

  const [activeCard, setActiveCard] = useState(false);

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
                  <div className="inputSection"></div>
                  <div className="ProductsSection"></div>
                </div>
              </div>

            </div>}
        </div>
      </div>
    </>
  )
}

export default Home