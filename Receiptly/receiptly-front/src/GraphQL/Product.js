import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`

    query get_products{
        products{
            id,
            title,
            costPerUnit,
            effort,
            unit
        }
    }

`

export const CREATE_PRODUCT = gql`

    mutation newProduct($title: String, $unit: String, $costPerUnit: Int, $productType: ProductTypeChoices!,
                        $effort: Float){
                            newProduct(product:{title: $title, unit: $unit, costPerUnit: $costPerUnit, productType: $productType,effort: $effort}){
                                title
                            }
                        }
`

export const UPDATE_PRODUCT = gql`

    mutation editProduct($id: ID!, $title: String, $unit: String, $costPerUnit: Int, $productType: ProductTypeChoices, $effort: Float){
        editProduct(editedProduct: {id: $id, title: $title, unit: $unit, costPerUnit: $costPerUnit, productType: $productType, effort: $effort}){
            title
        }
    }

`

export const DELETE_PRODUCT = gql`

    mutation deleteProduct($id: ID!){
        deleteProduct(deletedProduct:{id: $id})
    }
`