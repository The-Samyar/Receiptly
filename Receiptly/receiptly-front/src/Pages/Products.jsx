import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/ProductCard/ProductCard'

const Products = () => {
  return (
    <>
      <Navbar />
      <div className="Body">
        <div className="categoryTitle">
          <span className="title">Goods</span>
          <hr/>
        </div>

        <div className="ProductsContainers">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  )
}

export default Products