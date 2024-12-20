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
        unit
      }
    }

  `

  const { loading, error, data } = useQuery(Get_Products_Query);

  useEffect(() => {

    if (data?.products) {
      setProducts(data?.products)
    }

  }, [data])

  const onDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="categoryTitle">
          <span className="title">Goods</span>
          <hr />
        </div>

        <div className="ProductsContainers">
          <ProductCard add/>
          {
            products && products.map(product => (
              product?.productType === "GOOD" ? <ProductCard product={product} onDelete={onDelete} /> : null
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Products