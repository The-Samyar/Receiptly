import { gql } from '@apollo/client';

export const GET_RECEIPTS = gql`
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

export const CHANGE_RECEIPT = gql`
    mutation editReceipt(
        $id: ID!,
        $products: [OrderProductsInfoInputType!]!,
        $title: String,
        $customerName: String,
        $customerAddress: String,
        $customerNumber: String,
        $hasPaid: Boolean,
        $orderDate: Date,
        $deadlineDate: Date,
        $deadlineNotice: Date,
        $state: StatusChoices
    ) {
        editReceipt(
            editedReceipt: {
                id: $id,
                products: $products,
                title: $title,
                customerName: $customerName,
                customerAddress: $customerAddress,
                customerNumber: $customerNumber,
                hasPaid: $hasPaid,
                orderDate: $orderDate,
                deadlineDate: $deadlineDate,
                deadlineNotice: $deadlineNotice,
                state: $state
            }
        ) {
            title
        }
    }
`;

export const ADD_RECEIPT = gql`

    mutation newReceipt($products: [OrderProductsInfoInputType!]!,
        $title: String,
        $customerName: String,
        $customerAddress: String,
        $customerNumber: String,
        $hasPaid: Boolean,
        $orderDate: Date,
        $deadlineDate: Date,
        $deadlineNotice: Date,
        $state: StatusChoices){
            newReceipt(receiptInput: {products: $products, title: $title, customerName: $customerName,
                                    customerAddress: $customerAddress, customerNumber: $customerNumber,
                                    hasPaid: $hasPaid, orderDate: $orderDate, deadlineDate: $deadlineDate,
                                    deadlineNotice: $deadlineNotice, state: $state}){
            id
        }
    }
`
