import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="CardsContainers">
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
          <ReceiptCard />
        </div>
      </div>
    </>
  )
}

export default Home