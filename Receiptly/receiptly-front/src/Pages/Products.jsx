import { useEffect, useState, useMemo } from 'react';
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/ProductCard/ProductCard'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../GraphQL/Product';
import { Filter } from '../Components/Filter/Filter';


const Products = () => {
  const possibleFilters = ["ALL", "GOOD", "SERVICE"]
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const filteredProducts = useMemo(() => {
    return filter === "ALL" ? products : products.filter(product => product.productType === filter)
  }, [products, filter])
  
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  useEffect(() => {

    if (data?.products) {
      setProducts(data?.products)
    }

  }, [data])

  const onDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const changeFilter = (filter) => setFilter(filter)

  if(loading) return(<div>Loading...</div>)
  if(error) return(<div>An error has occurred</div>)

  return (
    <>
      <Navbar />
      <div className="Body">
        <Filter options={possibleFilters} activeFilter={filter} changeFilter={changeFilter} title="Products" />
        <div className="ProductsContainers">
          <ProductCard add />
          {
            filteredProducts.map(product => (
              <ProductCard product={product} onDelete={onDelete} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Products