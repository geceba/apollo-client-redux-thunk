import ApolloClient from 'apollo-boost'


const apolloClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
});


export default apolloClient