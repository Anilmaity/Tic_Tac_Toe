import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
//
//
// export const client = new ApolloClient({
//   uri: "https://jegnus.com/graphql",
//   headers: {
//     authorization: "JWT " + await asyncStorage.getItem("userToken") || "",
//   },
//   cache: new InMemoryCache(),
// });

import {  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    // uri: "https://jegnus.com/graphql",
    uri: "https://tictactoe-z3ih4o4xwq-el.a.run.app/graphql",

});

const authLink = setContext ( (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const userToken =  localStorage.getItem("token");
    //console.log("client",userToken);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: userToken ? `JWT ${userToken}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


