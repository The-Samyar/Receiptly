import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ReceiptCard from '../Components/ReceiptCard/ReceiptCard'
import NewReceiptCard from '../Components/NewReceiptCard/NewReceiptCard.jsx';
import { gql, useMutation, useQuery } from '@apollo/client'
import { Form } from '../Components/Form/Form.jsx';
import { FormProvider } from '../context/FormContext.js';

const Home = () => {

  const possibleFilters = ["ALL", "CANCELLED", "DONE"]

  const [activeCard, setActiveCard] = useState(false);
  const [filter, setFilter] = useState("ALL");
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
      productId
      costPerUnit
      count
      effort
      title
    }
  }
}`

  /* const ADD_PRODUCT = gql`
    mutation add_product(
      $costPerUnit: Int!,
      $productType: ProductTypeChoices!,
      $effort: Float!,
      $title: String!,
      $unit: String!
    ) {
      newProduct(
        product: { costPerUnit: $costPerUnit, productType: $productType, effort: $effort, title: $title, unit: $unit }
      ) {
        title
      }
    }
  `; */

  /* const product = {
    costPerUnit: 1,
    productType: "SERVICE",  // Must match the enum value exactly
    effort: 1000,
    title: "Ramin",
    unit: "50"
  }; */

  /* const [add_product, { data, error }] = useMutation(ADD_PRODUCT);
  console.log(`error`)
  
    useEffect(() => {
      add_product({
        variables: {
          costPerUnit: product.costPerUnit,
          productType: product.productType,  // Enum value
          effort: product.effort,
          title: product.title,
          unit: product.unit
        }
      });
    }, [add_product]); */

  const { loading, error, data } = useQuery(dog)
  console.log(data)

  useEffect(() => {
    if (data) {
      console.log(data)
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

    if (isFound) {
      setFilter(filter)
    }
  }

  useEffect(() => {

    const filterPosts = (filter) => {
      if (filter === "DONE") {
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "DONE"));
      } else if (filter === "CANCELLED") {
        setFilteredPosts(Receipts.filter(receipt => receipt?.state === "CANCELLED"));
      }
    }

    filterPosts(filter)

  }, [filter, Receipts])

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
              <FormProvider>
                <Form Receipt={relevantCard(activeCard)} setActiveCard={setActiveCard} />
              </FormProvider>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Home