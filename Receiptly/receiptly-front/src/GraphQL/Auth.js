import { gql } from '@apollo/client'

export const LOGIN = gql`

    mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password){
            success,
            token{
                token
            }
            errors
        }
    }

`

export const Register = gql`

    mutation register($username: String!,
        $password: String!,
        $password2: String!,
        $firstName: String!, 
        $lastName: String!){
            register(username: $username, password: $password, password2: $password2, firstName: $firstName, lastName: $lastName){
                success,
                errors
            }
        }

`