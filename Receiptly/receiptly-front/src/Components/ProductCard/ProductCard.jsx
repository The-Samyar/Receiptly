import React from 'react'
import IMG from '../../Images/test.jpg'
import './ProductCard.css'

const ProductCard = () => {
    return (
        <div className="cardContainer">
            <div className="cardHeader">
                <div className="cardHeaderItem">
                    <h3 className="cardTitle">Shirt</h3>
                </div>
                <div className="cardHeaderItem">
                    <span className="cardItemTitle">Price:</span>
                    <span className="cardItemValue">$200 / number</span>
                </div>
                <div className="cardHeaderItem">
                    <span className="cardItemTitle">Labor:</span>
                    <span className="cardItemValue">14.0 hours</span>
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