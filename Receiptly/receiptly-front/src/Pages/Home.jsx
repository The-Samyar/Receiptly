import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import {getReceipt} from '../Api/api.js';

const Home = () => {

  const [activeCard, setActiveCard] = useState(false);
  const [data, setdata] = useState(null);

  useEffect(() => {
    const getData = async() => {
      const data = await getReceipt();
      console.log(data)
    }

    getData();
  } , [])

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