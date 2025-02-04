import { gql } from '@apollo/client'

export const LOGIN = gql`

    mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password){
            success,
            token{
                token
            }
            errors
            refreshToken{
                token
            }
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

export const REFRESH_TOKEN = gql`

        mutation refreshToken($refreshToken: String!, $revokeRefreshToken: Boolean!){
            refreshToken(refreshToken: $refreshToken, revokeRefreshToken: $revokeRefreshToken){
                success
                errors
                token{
                    token
                }
            }
        }
`