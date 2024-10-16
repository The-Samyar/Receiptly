import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import NewReceiptCard from '../Components/NewReceiptCard/NewReceiptCard.jsx';
import { gql, useQuery } from '@apollo/client'

const Home = () => {

  const possibleFilters = ["ALL" , "CANCELLED" , "DONE"]

  const [activeCard, setActiveCard] = useState(false);
  const [filter , setFilter] = useState("ALL");
  const [Receipts, setReceipts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);

  const dog = gql`
    query {
  receipts {
    id
    title
    state
    customerName
    customerNumber
    deadlineDate
    deadlineNotice
    hasPaid
    orderDate
    products {
      costPerUnit
      count
      effort
      title
    }
  }
}
  
`

  const { loading, error, data } = useQuery(dog)
  /* console.log(data) */

  useEffect(() => {
    if (data) {
      /* console.log(data) */
      setReceipts(data.receipts);
    }
  }, [data])

    console.log(Receipts)
    console.log(filteredPosts)

  const CardCallback = (value) => {
    document.body.style.overflow = 'hidden';
    setActiveCard(value);
  }

  const relevantCard = (id) => {
    console.log(activeCard)
    var result = Receipts?.find(receipt => receipt?.id === id);
    return result;
  }

  const changeFilter = (filter) => {
    const isFound = possibleFilters.find(possibleFilter => possibleFilter === filter)

    if(isFound) {
      setFilter(filter)
    }
  }

  useEffect(() => {

    const filterPosts = (filter) => {
      if(filter === "DONE"){
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "DONE"));
      }else if( filter === "CANCELLED"){
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "CANCELLED"));
      }
    }

    filterPosts(filter)

  } , [filter , Receipts])

  console.log(filter)

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="filter">
          <span className="filterTitle">Receipts: </span>
          <div className={filter === "ALL" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("ALL")} >All</div>
          <div className={filter === "DONE" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("DONE")} >Done</div>
          <div className={filter === "CANCELLED" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("CANCELLED")} >Cancelled</div>
        </div>
        <div className="CardsContainers">
          {/* {Receipts && Receipts.map(Receipt => (
            <ReceiptCard CardCallBack={CardCallback} Receipt={Receipt} />
          ))} */}

          {
            filter === "ALL" ? Receipts?.map(Receipt => (
              <ReceiptCard CardCallBack={CardCallback} Receipt={Receipt} />
            )) : 
            
            filteredPosts?.map(Receipt => (
              <ReceiptCard CardCallBack={CardCallback} Receipt={Receipt} />
            ))

          }

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