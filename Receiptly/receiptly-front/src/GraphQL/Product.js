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