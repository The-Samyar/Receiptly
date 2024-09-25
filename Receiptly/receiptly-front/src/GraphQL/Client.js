import {InMemoryCache , ApolloClient , HttpLink} from '@apollo/client'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8000/api/graphiq'
    }),

    cache: new InMemoryCache()
})

export default client