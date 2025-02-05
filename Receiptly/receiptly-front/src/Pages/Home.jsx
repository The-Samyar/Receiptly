import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import { useQuery } from '@apollo/client'
import { Form } from '../Components/Form/Form.jsx';
import { FormProvider } from '../context/FormContext.js';
import { GET_RECEIPTS } from '../GraphQL/Receipt.js'
import { Filter } from '../Components/Filter/Filter.jsx'
const Home = () => {

  const possibleFilters = ["ALL", "CANCELLED", "DONE"]

  const [activeCard, setActiveCard] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [receipts, setReceipts] = useState([]);

  const { loading, error, data } = useQuery(GET_RECEIPTS)

  const filteredPosts = useMemo(() => {
    return filter === "ALL" ? receipts : receipts.filter(receipt => receipt.state === filter)
  }, [receipts, filter]) 

/*   console.log(activeCard) */

  useEffect(() => {
    if (data) {
      setReceipts(data.receipts);
    }
  }, [data])

  const CardCallback = (value) => {
    setActiveCard(value);
  }

  const relevantReceipt = useMemo(() => {
    return receipts.find(receipt => receipt?.id === activeCard);
  }, [receipts, activeCard]);

  const changeFilter = (filter) => setFilter(filter)

  if (loading) return (<div>Loading...</div>)
  if (error) return (<div>An error has occurred</div>)

  return (
    <>
      <Navbar />
      <div className="Body">
        <Filter options={possibleFilters} activeFilter={filter}
          title="Receipts" changeFilter={changeFilter} />

        <div className="CardsContainers">
          {
            filteredPosts.map(post => (
              <ReceiptCard CardCallBack={CardCallback} Receipt={post} />
            ))
          }

          {activeCard &&
            <div className='bodyOverlay'>
              <FormProvider>
                <Form Receipt={relevantReceipt} setActiveCard={CardCallback} />
              </FormProvider>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Home