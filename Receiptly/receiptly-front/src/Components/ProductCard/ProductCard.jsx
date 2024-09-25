import React from 'react'
import IMG from '../../Images/test.jpg'
import './ProductCard.css'

const ProductCard = ({product}) => {
    return (
        <div className="cardContainer">
            <div className="cardHeader">
                <div className="cardHeaderItem">
                    <h3 className="cardTitle">{product?.title}</h3>
                </div>
                <div className="cardHeaderItem">
                    <span className="cardItemTitle">Price:</span>
                    <span className="cardItemValue">${product?.costPerUnit} / number</span>
                </div>
                <div className="cardHeaderItem">
                    <span className="cardItemTitle">Labor:</span>
                    <span className="cardItemValue">{product?.effort} hours</span>
                </div>
            </div>

            <div className="cardImg">
                <img src={IMG} alt="image" />
            </div>

            <div className="cardActions">
                <button className="editButton">Edit</button>
                <button className="deleteButton">Delete</button>
            </div>
        </div>
    )
}

export default ProductCard