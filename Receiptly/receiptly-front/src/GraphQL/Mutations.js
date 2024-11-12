import { gql } from "@apollo/client";

export const EDIT_RECEIPT = gql`
  mutation edit_receipt(
    $id: ID!
    $products: [OrderProductsInfoInputType!]
    $title: String
    $customerName: String
    $customerAddress: String
    $customerNumber: String
    $hasPaid: Boolean
    $orderDate: Date
    $deadlineDate: Date
    $deadlineNotice: Date
    $state: StatusChoices
  ) {
    editReceipt(
        editedReceipt: { id: $id, products: $products , title: $title,
                        customerName: $customerName, customerAddress: $customerAddress,
                        customerNumber: $customerNumber, hasPaid: $hasPaid,
                        orderDate: $orderDate, deadlineDate: $deadlineDate,
                        deadlineNotice: $deadlineNotice, state: $state
                    }
    ){
        title
    }
  }
`;