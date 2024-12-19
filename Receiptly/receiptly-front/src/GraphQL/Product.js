import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`

    query get_products{
        products{
            id,
            title,
            costPerUnit,
            effort
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