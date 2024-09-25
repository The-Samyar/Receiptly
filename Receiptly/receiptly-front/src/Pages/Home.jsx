import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import NewReceiptCard from '../Components/NewReceiptCard/NewReceiptCard.jsx';
import { gql, useQuery } from '@apollo/client'

const Home = () => {

  const possibleFilters = ["All" , "Cancelled" , "Done"]

  const [activeCard, setActiveCard] = useState(false);
  const [filter , setFilter] = useState("All");
  const [Receipts, setReceipts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);

  const dog = gql`
    query {
  receipts {
    customerName
    deadlineDate
    title
    address
    hasPaid
    orderDate
    id
    number
    deadlineNotice
    products: orderinfoSet {
      costPerUnit
      effort
      id
      productCount
      title
    }
    state
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
      if(filter === "Done"){
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "Done"));
      }else if( filter === "Cancelled"){
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "Cancelled"));
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
          <div className={filter === "All" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("All")} >All</div>
          <div className={filter === "Done" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("Done")} >Done</div>
          <div className={filter === "Cancelled" ? "activeFilter" : "filterOption"} onClick={() => changeFilter("Cancelled")} >Cancelled</div>
        </div>
        <div className="CardsContainers">
          {/* {Receipts && Receipts.map(Receipt => (
            <ReceiptCard CardCallBack={CardCallback} Receipt={Receipt} />
          ))} */}

          {
            filter === "All" ? Receipts?.map(Receipt => (
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