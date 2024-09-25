import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/ProductCard/ProductCard'
import { gql, useQuery } from '@apollo/client'


const Products = () => {

  const [products, setProducts] = useState();

  const Get_Products_Query = gql`
    query {
      products {
        id
        title
        effort
        costPerUnit
        productType
      }
    }

  `

  const {loading , error , data} = useQuery(Get_Products_Query);

  useEffect(() => {

    if(data?.products){
      setProducts(data?.products)
    }

  }, [data])

  console.log(products)

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="categoryTitle">
          <span className="title">Goods</span>
          <hr/>
        </div>

        <div className="ProductsContainers">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}

          {
            products && products.map(product => (
              product?.productType === "G" ? <ProductCard product={product} /> : null
            ))
          }
          
        </div>
      </div>
    </>
  )
}

export default Products